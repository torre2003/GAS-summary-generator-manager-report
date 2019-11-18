function SummaryReportManger() {

    this.document = null;

    this.report_folder_id = PropertiesService.getScriptProperties().getProperty("report_folder_id");

    this.sheet_name = {
        main: "Principal",
        details: "Detalle de archivos"
    }

    this.data_sheet = {
        main: null,
        details: null
    }

    this.report_files = []

    this.fields = {
        // last_update: "C2",
        // home_without_appraisal: "C5",
        // last_create_appraisal: "C6",
        // send_mail: "C10",
        // mail_to: "C11",
        // days_for_alert: "C12",
        // check_all_communes: "C13",
        // important_communes: {
        //     toctoc: "C16",
        //     portal: "C17",
        //     goplaceit: "C18",
        //     mercadolibre: "C19"
        // }
    }

}

SummaryReportManger.prototype.initialize = function () {

    this.document = SpreadsheetApp.getActiveSpreadsheet();

    this.data_sheet.main = this.document.getSheetByName(this.sheet_name.main);

    this.data_sheet.details = this.document.getSheetByName(this.sheet_name.details);

}


/**
 * Función que limpia los datos de todas las hojas
 */
SummaryReportManger.prototype.cleanOutputData = function () {

    this.data_sheet.details.getRange(
        'A1:Z'
    ).setValue("")

}


/**
 * Funcion que muestra los datos en la hoja especificada
 * :param headers: array con los nombres de los headers
 * :param keys: Key del diccionario de data a extraer
 * :param data: datos a trabajar
 * :param sheet: Hoja a mostrar los datos
 */
SummaryReportManger.prototype.showData = function (headers, keys, data, sheet) {

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
SummaryReportManger.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
SummaryReportManger.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}

/**
 * Obtiene la lista de spreadsheet desde la carpeta de reportes
 */
SummaryReportManger.prototype.listFiles = function () {

    var report_folder = DriveApp.getFolderById(this.report_folder_id)

    var report_files = report_folder.getFilesByType('application/vnd.google-apps.spreadsheet')

    while (report_files.hasNext()) {

        var report_file = report_files.next();

        this.report_files.push({
            "id": report_file.getId(),
            "name": report_file.getName()
        })

    }

    return this.report_files

}

/**
 * Extrae los datos correspondientes desde los reportes 
 * listados en report_files
 */
SummaryReportManger.prototype.getValuesFromFiles = function () {

    data = []

    for (file in this.report_files) {

        report_manager = new ReportManager()

        report_manager.initialize(
            file_id = this.report_files[file].id
        )

        tiempos_proceso = [
            {
                estado: "INICIO",
                fecha_inicial: report_manager.getValue(
                    field = report_manager.fields.costs.time.fecha_inicio_processo.fecha_inicial,
                    data_sheet = report_manager.data_sheet.costs
                ),
                fecha_final: report_manager.getValue(
                    field = report_manager.fields.costs.time.fecha_inicio_processo.fecha_final,
                    data_sheet = report_manager.data_sheet.costs
                ),
            },
            {
                estado: "ALZAMIENTO",
                fecha_inicial: report_manager.getValue(
                    field = report_manager.fields.costs.time.alzamiento.fecha_inicial,
                    data_sheet = report_manager.data_sheet.costs
                ),
                fecha_final: report_manager.getValue(
                    field = report_manager.fields.costs.time.alzamiento.fecha_final,
                    data_sheet = report_manager.data_sheet.costs
                ),
            },
            {
                estado: "COMPRA E INSCRIPCIÖN",
                fecha_inicial: report_manager.getValue(
                    field = report_manager.fields.costs.time.compra_e_inscripcion.fecha_inicial,
                    data_sheet = report_manager.data_sheet.costs
                ),
                fecha_final: report_manager.getValue(
                    field = report_manager.fields.costs.time.compra_e_inscripcion.fecha_final,
                    data_sheet = report_manager.data_sheet.costs
                ),
            },
            {
                estado: "REMODELACIÖN",
                fecha_inicial: report_manager.getValue(
                    field = report_manager.fields.costs.time.proyecto_remodelacion.fecha_inicial,
                    data_sheet = report_manager.data_sheet.costs
                ),
                fecha_final: report_manager.getValue(
                    field = report_manager.fields.costs.time.proyecto_remodelacion.fecha_final,
                    data_sheet = report_manager.data_sheet.costs
                ),
            },
            {
                estado: "VENTA",
                fecha_inicial: report_manager.getValue(
                    field = report_manager.fields.costs.time.tiempo_de_venta.fecha_inicial,
                    data_sheet = report_manager.data_sheet.costs
                ),
                fecha_final: report_manager.getValue(
                    field = report_manager.fields.costs.time.tiempo_de_venta.fecha_final,
                    data_sheet = report_manager.data_sheet.costs
                ),
            },
            {
                estado: "INSCRIPCIÓN",
                fecha_inicial: report_manager.getValue(
                    field = report_manager.fields.costs.time.inscripcion.fecha_inicial,
                    data_sheet = report_manager.data_sheet.costs
                ),
                fecha_final: report_manager.getValue(
                    field = report_manager.fields.costs.time.inscripcion.fecha_final,
                    data_sheet = report_manager.data_sheet.costs
                ),
            },
        ]

        estado_actual = tiempos_proceso[0].fecha_inicial == "" ? "EN ESPERA" : "FINALIZADO"

        for (var i = 0, flag = false; i < tiempos_proceso.length && !flag; i++) {

            if (
                tiempos_proceso[i].fecha_inicial != "" &&
                tiempos_proceso[i].fecha_final == ""
            ) {

                flag = true;

                estado_actual = tiempos_proceso[i].estado
            }

        }



        report_data = {
            direccion: report_manager.getValue(
                field = report_manager.fields.details.direccion,
                data_sheet = report_manager.data_sheet.details
            ),
            depto: report_manager.getValue(
                field = report_manager.fields.details.depto,
                data_sheet = report_manager.data_sheet.details
            ),
            precio_publicado: "N/A",
            precio_minimo: report_manager.getValue(
                field = report_manager.fields.margin.precio_de_venta.presupuestado,
                data_sheet = report_manager.data_sheet.margin
            ),
            precio_final: report_manager.getValue(
                field = report_manager.fields.costs.resumen_finales.precio_final_venta,
                data_sheet = report_manager.data_sheet.costs
            ),
            estado_propiedad: estado_actual,
            dias_transcurridos: report_manager.getValue(
                field = report_manager.fields.costs.resumen_dias.utilizado,
                data_sheet = report_manager.data_sheet.costs
            ),
            dias_presupuestados: report_manager.getValue(
                field = report_manager.fields.costs.resumen_dias.presupuestado,
                data_sheet = report_manager.data_sheet.costs
            ),
            porcentaje_dias_disponibles: "N/A",
            presupuesto_total: report_manager.getValue(
                field = report_manager.fields.costs.resumen_presupuesto.presupuestado,
                data_sheet = report_manager.data_sheet.costs
            ),
            presupuesto_gastado: report_manager.getValue(
                field = report_manager.fields.costs.resumen_presupuesto.utilizado,
                data_sheet = report_manager.data_sheet.costs
            ),
            porcentaje_presupuesto_disponible: "N/A",
            interes_acumulado: report_manager.getValue(
                field = report_manager.fields.margin.gasto_financiero.real,
                data_sheet = report_manager.data_sheet.margin
            ),
            margen_esperado: report_manager.getValue(
                field = report_manager.fields.margin.margen_empresa.presupuestado,
                data_sheet = report_manager.data_sheet.margin
            ),
            margen_real: report_manager.getValue(
                field = report_manager.fields.margin.margen_empresa.real,
                data_sheet = report_manager.data_sheet.margin
            ),
        }

        report_data.porcentaje_dias_disponibles = (report_data.dias_presupuestados - report_data.dias_transcurridos) / report_data.dias_presupuestados

        report_data.porcentaje_presupuesto_disponible = (report_data.presupuesto_total - report_data.presupuesto_gastado) / report_data.presupuesto_total


        report_data.file_id = this.report_files[file].id;

        report_data.file_name = this.report_files[file].name;

        report_data.file_url = "https://docs.google.com/spreadsheets/d/" + this.report_files[file].id;

        data.push(report_data)

    }

    return data
}

/**
 * Muestra en la hoja details el resumen de los reportes
 */
SummaryReportManger.prototype.showSummary = function () {
    headers = [
        "Dirección",
        "N° departamento",
        "Precio publicado",
        "Precio mínimo",
        "Precio de venta final",
        "Estado propiedad",
        "Días transcurridos",
        "Días presupuestados",
        "% días disponibles",
        "Presupuesto total",
        "Presupuesto gastado",
        "% presupuesto disponible",
        "Interés acumulado",
        "Margen esperado",
        "Margen real - Según egresos a la fecha",
        "URL XLS",

    ]

    keys = [
        "direccion",
        "depto",
        "precio_publicado",
        "precio_minimo",
        "precio_final",
        "estado_propiedad",
        "dias_transcurridos",
        "dias_presupuestados",
        "porcentaje_dias_disponibles",
        "presupuesto_total",
        "presupuesto_gastado",
        "porcentaje_presupuesto_disponible",
        "interes_acumulado",
        "margen_esperado",
        "margen_real",
        "file_url"
    ]

    summary_data = this.getValuesFromFiles();

    this.cleanOutputData()

    this.showData(
        headers = headers,
        keys = keys,
        data = summary_data,
        sheet = this.data_sheet.details
    )

}

