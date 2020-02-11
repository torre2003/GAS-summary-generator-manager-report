function ManagerCalendly() {

    this.document = null;

    this.sheet_name = {
        calendly: "calendly",
    }

    this.data_sheet = {
        calendly: null
    }

    this.fields = {}

    this.ranges_data = {
        calendly: "A[row_a]:J[row_b]",
    }
}

ManagerCalendly.prototype.initialize = function () {

    this.document = SpreadsheetApp.getActiveSpreadsheet();

    this.data_sheet.calendly = this.document.getSheetByName(
        this.sheet_name.calendly
    );

}

ManagerCalendly.prototype.initialize_dooris = function () {

    this.document = SpreadsheetApp.openById(file_id);

}


/**
 * Obtiene el valor del campo
 */
ManagerCalendly.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.calendly

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
ManagerCalendly.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.calendly

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}


/**
* Establece los valores de la fila correspondiente
* row_id: id de la fila a modificar
* data_sheet_var_name: nombre interno de la hoja a modificar
* value: valores a ingresar, debe coincidir el número de columnas con el arreglo
*/
ManagerCalendly.prototype.setRowValue = function (row_id, data_sheet_var_name, value) {

    let data_sheet = this.data_sheet[data_sheet_var_name]

    let string_range = this.ranges_data[data_sheet_var_name].replace("[row_a]", row_id).replace("[row_b]", row_id)

    let range = data_sheet.getRange(string_range);

    range.setValues([
        value
    ])

}


/**
 * Actualiza un registro de la tabla Calendly
 * param row_id: id unica de la propiedad
 * param upload_megatron: Establece si la propiedad a sido subida a megatron
 * param upload_dooris: Establece si la propiedad a sido subida a Dooris
 * param home_id: Id de al propiedad
 * param date_calendly: fecha de agendamiento
 * param email_home_advisor: Email del home advisor
 * param address: Dirección de la propiedad
 * param lat_long: Latitud y longitud de la propiedad
 */
ManagerCalendly.prototype.setCalendlyRow = function (
    row_id,
    upload_megatron = null,
    upload_dooris = null,
    home_id = null,
    date_calendly = null,
    email_home_advisor = null,
    address = null,
    lat_long = null
) {

    calendly_row = this.getCalendlyRow(row_id = row_id, how_dictionary = false)

    calendly_row[0] = upload_megatron == null ? calendly_row[0] : upload_megatron

    calendly_row[1] = upload_dooris == null ? calendly_row[1] : upload_dooris

    calendly_row[2] = home_id == null ? calendly_row[2] : home_id

    calendly_row[3] = date_calendly == null ? calendly_row[3] : date_calendly

    calendly_row[4] = email_home_advisor == null ? calendly_row[4] : email_home_advisor

    calendly_row[5] = address == null ? calendly_row[5] : address

    calendly_row[6] = lat_long == null ? calendly_row[6] : lat_long

    this.setRowValue(
        row_id = row_id,
        data_sheet_var_name = "calendly",
        value = calendly_row
    )

}



/**
 * Función que revisa si existen nuevos registros en la hoja calendly y retorna las filas correspondientes
 */
ManagerCalendly.prototype.getNewRows = function () {

    var first_row = 2;

    range = this.data_sheet.calendly.getRange('A' + first_row + ':E');

    values = range.getValues();

    rows = [];

    for (var i = 0; i < values.length; i++) {

        if ((values[i][0] === '' || values[i][1] === '') && values[i][2] !== '') {

            rows.push({
                'row': i + first_row,
                'upload_megatron': values[i][0],
                'upload_megatron': values[i][1],
                'home_id': values[i][2],
                'date_calendly': values[i][3],
                'email_home_advisor': values[i][4],
            });

        }

    }

    return rows;

}


ManagerCalendly.prototype.getCalendlyRow = function (row_id, how_dictionary = true) {

    range = this.data_sheet.calendly.getRange('A' + row_id + ':J' + row_id);

    values = range.getValues()[0];

    if (!how_dictionary) {
        return values
    }

    return {
        upload_megatron: values[0],
        upload_dooris: values[1],
        home_id: values[2],
        date_calendly: values[3],
        email_home_advisor: values[4],
        address: values[5],
        lat_long: values[6],
    }
}




function test_calendly() {

    calendly_manager = new ManagerCalendly()

    calendly_manager.initialize()

    rows = calendly_manager.getNewRows()
    Logger.log(
        calendly_manager.getCalendlyRow(rows[0])
    )


}
