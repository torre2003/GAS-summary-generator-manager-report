function CalendlyManager() {

    this.document = null;

    this.sheet_name = {
        calendly: "calendly",
    }

    this.data_sheet = {
        calendly: null
    }

    this.fields = {}

}

CalendlyManager.prototype.initialize = function () {

    this.document = SpreadsheetApp.getActiveSpreadsheet();

    this.data_sheet.calendly = this.document.getSheetByName(
        this.sheet_name.calendly
    );

}

CalendlyManager.prototype.initialize_dooris = function () {

    this.document = SpreadsheetApp.openById(file_id);

}


/**
 * Obtiene el valor del campo
 */
CalendlyManager.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.details

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
CalendlyManager.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}

/**
 * Función que revisa si existen nuevos registros en la hoja calendly y retorna las filas correspondientes
 */
CalendlyManager.prototype.getNewRows = function () {

    var first_row = 2;

    range = this.data_sheet.calendly.getRange('A' + first_row + ':C');

    values = range.getValues();

    rows = [];

    for (var i = 0; i < values.length; i++) {

        if (values[i][0] === '' && values[i][1] === '' && values[i][2] !== '') {

            rows.push(i + first_row);

        }

    }

    return rows;

}


CalendlyManager.prototype.getCalendlyRow = function (row_id) {

    range = this.data_sheet.calendly.getRange('A' + row_id + ':J' + row_id);

    values = range.getValues()[0];

    return {
        upload_megatron: values[0],
        upload_dooris: values[1],
        home_id: values[2],
        date_calendly: values[3],
        email_home_advisor: values[4],
        address: values[5],
    }
}


function test_calendly() {

    calendly_manager = new CalendlyManager()

    calendly_manager.initialize()

    rows = calendly_manager.getNewRows()
    Logger.log(
        calendly_manager.getCalendlyRow(rows[0])
    )


}
