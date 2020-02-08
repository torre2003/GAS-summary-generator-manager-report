function DoorisManager() {

    this.document_id = null;

    this.document = null;

    this.sheet_name = {
        houses: "Houses",
        inspectors: "Inspectors",
        inspections: "Inspections",
        money_questions: "Money Questions",
        inspection_areas: "InspectionAreas",
        onboarding: "Onboarding"
    }

    this.data_sheet = {
        houses: null,
        inspectors: null,
        inspections: null,
        money_questions: null,
        inspection_areas: null,
        onboarding: null,
    }

    this.fields = {}

}

DoorisManager.prototype.initialize = function (document_id) {

    this.document_id = document_id

    this.document = SpreadsheetApp.openById(document_id);

    this.data_sheet.houses = this.document.getSheetByName(
        this.sheet_name.houses
    );

    this.data_sheet.inspectors = this.document.getSheetByName(
        this.sheet_name.inspectors
    );

    this.data_sheet.inspections = this.document.getSheetByName(
        this.sheet_name.inspections
    );

    this.data_sheet.money_questions = this.document.getSheetByName(
        this.sheet_name.money_questions
    );

    this.data_sheet.inspection_areas = this.document.getSheetByName(
        this.sheet_name.inspection_areas
    );

    this.data_sheet.onboarding = this.document.getSheetByName(
        this.sheet_name.onboarding
    );

}


/**
 * Obtiene el valor del campo
 */
DoorisManager.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.details

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
DoorisManager.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}
