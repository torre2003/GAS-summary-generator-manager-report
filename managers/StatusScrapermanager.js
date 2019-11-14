function StatusScraperManager() {

    this.document = null;

    this.sheet_name = {
        main: "Main",
        toctoc: "TocToc",
        portal_inmobiliario: "PortalInmobiliario",
        goplaceit: "GoPlaceIt",
        mercadolibre: "MercadoLibre",
        all_data: "AllData"
    }

    this.data_sheet = {
        main: null,
        toctoc: null,
        portal_inmobiliario: null,
        goplaceit: null,
        mercadolibre: null,
        all_data: null
    }

    this.fields = {
        last_update: "C2",
        home_without_appraisal: "C5",
        last_create_appraisal: "C6",
        send_mail: "C10",
        mail_to: "C11",
        days_for_alert: "C12",
        check_all_communes: "C13",
        important_communes: {
            toctoc: "C16",
            portal: "C17",
            goplaceit: "C18",
            mercadolibre: "C19"
        }
    }

    this.scraper_merge = null;

}

StatusScraperManager.prototype.initialize = function () {

    this.document = SpreadsheetApp.getActiveSpreadsheet();

    this.data_sheet.main = this.document.getSheetByName(this.sheet_name.main);

    this.data_sheet.toctoc = this.document.getSheetByName(this.sheet_name.toctoc);

    this.data_sheet.portal_inmobiliario = this.document.getSheetByName(this.sheet_name.portal_inmobiliario);

    this.data_sheet.goplaceit = this.document.getSheetByName(this.sheet_name.goplaceit);

    this.data_sheet.mercadolibre = this.document.getSheetByName(this.sheet_name.mercadolibre);

    this.data_sheet.all_data = this.document.getSheetByName(this.sheet_name.all_data);

    this.scraper_merge = new ScraperMerge();

    this.scraper_merge.initialize();

}

StatusScraperManager.prototype.cleanOutputData = function () {

    this.data_sheet.main.getRange(
        'C2:C6'
    ).setValue("")

    this.data_sheet.toctoc.getRange(
        'A1:Z'
    ).setValue("")

    this.data_sheet.portal_inmobiliario.getRange(
        'A1:Z'
    ).setValue("")

    this.data_sheet.goplaceit.getRange(
        'A1:Z'
    ).setValue("")

    this.data_sheet.mercadolibre.getRange(
        'A1:Z'
    ).setValue("")

    this.data_sheet.all_data.getRange(
        'A1:Z'
    ).setValue("")

}

/**
 * Obtiene los datos y retorna los mensajes de alerta según las configuraciones
 * de la SpreadShett
 */
StatusScraperManager.prototype.getWarningMessages = function (all_communes) {

    if (all_communes == undefined) {

        all_communes = false

    }

    var date_utils = new DateUtils()

    var data = this.scraper_merge.consultStatusScraperMerge();

    days_for_alert = this.getValue(
        field = this.fields.days_for_alert,
        data_sheet = undefined
    )

    var alert_line = new Date();

    alert_line.setHours(alert_line.getHours() - 24 * days_for_alert);
    //alert_line = date_utils.getDayForString(alert_line.toISOString())

    filter_communes = {
        "toctoc": this.getValue(
            field = this.fields.important_communes.toctoc,
            data_sheet = undefined
        ).split(','),
        "portal_inmobiliario": this.getValue(
            field = this.fields.important_communes.portal,
            data_sheet = undefined
        ).split(','),
        "mercadolibre": this.getValue(
            field = this.fields.important_communes.mercadolibre,
            data_sheet = undefined
        ).split(','),
        "goplaceit": this.getValue(
            field = this.fields.important_communes.goplaceit,
            data_sheet = undefined
        ).split(','),
    }

    var scraper_alerts = []

    for (var i = 0; i < data.entries.length; i++) {

        var summary = data.entries[i]

        if (summary.last_publish_date != null) {

            var last_update_at = date_utils.getDayForString(summary.last_update_at)

            if (last_update_at < alert_line) {

                var flag = all_communes

                if (!all_communes && summary.web_site_name == 'Toctoc' && filter_communes.toctoc.indexOf(summary.commune) !== -1) {
                    flag = true
                }
                else
                    if (!all_communes && summary.web_site_name == 'Portal Inmobiliario' && filter_communes.portal_inmobiliario.indexOf(summary.commune) !== -1) {
                        flag = true
                    }
                    else
                        if (!all_communes && summary.web_site_name == 'Mercado Libre' && filter_communes.mercadolibre.indexOf(summary.commune) !== -1) {
                            flag = true
                        }
                        else
                            if (!all_communes && summary.web_site_name == 'GoPlaceIt' && filter_communes.goplaceit.indexOf(summary.commune) !== -1) {
                                flag = true
                            }

                if (flag == true) {
                    scraper_alerts.push({
                        site: summary.web_site_name,
                        commune: summary.commune,
                        last_publish_date: summary.last_publish_date,
                        last_created: summary.last_update_at,
                        count_homes: summary.count_homes,
                        count_entries: summary.count_entries,
                    })
                }

            }

        }

    }

    return {
        alerts: scraper_alerts,
        all_data: data
    }

}

/**
 * Funcion que envai un correo con las alertas especificadas en la variable
 */
StatusScraperManager.prototype.sendEmailAlert = function () {

    all_communes = this.getValue(this.fields.check_all_communes)

    var scraper_alerts = this.getWarningMessages(all_communes).alerts;

    if (scraper_alerts.length == 0) {

        return;

    }

    days_for_alert = this.getValue(
        field = this.fields.days_for_alert,
        data_sheet = undefined
    )

    var now = new Date();

    var to = "jorgecampos@doorlistapp.com"

    var subject = "Alertas scraper - " + now.toString()

    var plain_body = "plain " + now.toString()

    var body = '<p>Se han detectado las siguientes comunas con un tiempo mayor a {{days_for_alert}} dias desde su última fecha de publicación</p><table>{{headers}}{{body}}</table>'

    var headers = '<tr><th>Sitio</th><th>Communa</th><th>Última fecha de publicación</th><th>Última creación</th></tr>'

    var table_body = ''

    for (var i = 0; i < scraper_alerts.length; i++) {

        table_body += '<tr><td>' + scraper_alerts[i].site + '</td><td>' + scraper_alerts[i].commune + '</td><td>' + scraper_alerts[i].last_publish_date + '</td><td>' + scraper_alerts[i].last_created + '</td></tr>'
    }

    body = body.replace('{{days_for_alert}}', days_for_alert)

    body = body.replace('{{headers}}', headers)
    body = body.replace('{{body}}', table_body)

    var options = {
        htmlBody: body
    }

    GmailApp.sendEmail(recipient = to, subject = subject, body = plain_body, options = options)

}




/**
 * Recupera el status de scraper merge y lo muestra en la Spreadsheet
 */
StatusScraperManager.prototype.showScraperStatusData = function () {

    var data = this.scraper_merge.consultStatusScraperMerge();

    var all_entries = data.entries;

    var today = new Date();

    this.showValue(
        field = this.fields.last_update,
        value = today,
        data_sheet = undefined
    )

    this.showValue(
        field = this.fields.home_without_appraisal,
        value = data.appraisals[0].home_left,
        data_sheet = undefined
    )

    this.showValue(
        field = this.fields.last_create_appraisal,
        value = data.appraisals[0].last_update,
        data_sheet = undefined
    )


    separate_entries_data = {
        "toctoc": [],
        "portal_inmobiliario": [],
        "mercadolibre": [],
        "goplaceit": [],
    }

    for (var i = 0; i < data.entries.length; i++) {

        var summary = data.entries[i]

        switch (summary.web_site_name) {
            case 'Toctoc':

                separate_entries_data.toctoc.push(summary)

                break;
            case 'Portal Inmobiliario':

                separate_entries_data.portal_inmobiliario.push(summary)

                break;
            case 'Mercado Libre':

                separate_entries_data.mercadolibre.push(summary)

                break;
            case 'GoPlaceIt':

                separate_entries_data.goplaceit.push(summary)

                break;
        }

    }

    headers = ['Commune', "last_home_id", "last_publish_date", "last_create_at", "last_update_at", "count_homes", "count_entries"]
    keys = ["commune", "last_home_id", "last_publish_date", "last_create_at", "last_update_at", "count_homes", "count_entries"]

    this.showData(
        headers = headers,
        keys = keys,
        data = separate_entries_data.toctoc,
        sheet = this.data_sheet.toctoc
    )

    this.showData(
        headers = headers,
        keys = keys,
        data = separate_entries_data.mercadolibre,
        sheet = this.data_sheet.mercadolibre
    )

    this.showData(
        headers = headers,
        keys = keys,
        data = separate_entries_data.goplaceit,
        sheet = this.data_sheet.goplaceit
    )

    headers.push("Web Site")

    keys.push("web_site_name")

    this.showData(
        headers = headers,
        keys = keys,
        data = all_entries,
        sheet = this.data_sheet.all_data
    )

}

/**
 * Funcion que muestra los datos en la hoja especificada
 * :param headers: array con los nombres de los headers
 * :param keys: Key del diccionario de data a extraer
 * :param data: datos a trabajar
 * :param sheet: Hoja a mostrar los datos
 */
StatusScraperManager.prototype.showData = function (headers, keys, data, sheet) {

    var transform_data = []

    transform_data.push(headers)

    for (var i = 0; i < data.length; i++) {

        array_data = []

        for (var j = 0; j < keys.length; j++) {

            array_data.push(data[i][keys[j]])

        }

        transform_data.push(array_data)
    }

    var range = sheet.getRange(1, 1, transform_data.length, keys.length)

    range.setValues(transform_data)

}


/**
 * Obtiene el valor del campo
 */
StatusScraperManager.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
StatusScraperManager.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}
