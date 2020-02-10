function ManagerTest() {

    this.document = null;

    this.sheet_name = {
        test: "Tests",
    }

    this.data_sheet = {
        test: null
    }

    this.fields = {}

}

ManagerTest.prototype.initialize = function () {

    this.document = SpreadsheetApp.getActiveSpreadsheet();

    this.data_sheet.test = this.document.getSheetByName(
        this.sheet_name.test
    );

}

/**
 * Obtiene el valor del campo
 */
ManagerTest.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.test

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
ManagerTest.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.test

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}
