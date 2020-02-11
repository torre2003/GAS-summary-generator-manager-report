function ManagerDooris() {

    this.document_id = PropertiesService.getScriptProperties().getProperty("dooris_document_id");

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

    this.ranges_data = {
        houses: "A[row_a]:H[row_b]",
        inspectors: "A[row_a]:F[row_b]",
        inspections: "A[row_a]:S[row_b]",
        money_questions: "A[row_a]:N[row_b]",
        inspection_areas: "A[row_a]:B[row_b]",
        onboarding: "A[row_a]:D[row_b]",
    }

    this.details_range = {
        houses: [
            {
                "column_letter": "A",
                "column": "house_id",
                "name": "House ID",
            },
            {
                "column_letter": "B",
                "column": "address",
                "name": "Address",
            },
            {
                "column_letter": "C",
                "column": "description",
                "name": "Description",
            },
            {
                "column_letter": "D",
                "column": "image",
                "name": "Image",
            },
            {
                "column_letter": "E",
                "column": "lat_long",
                "name": "LatLong",
            },
            {
                "column_letter": "F",
                "column": "check_in",
                "name": "Checkin",
            },
            {
                "column_letter": "G",
                "column": "time",
                "name": "Timestamp",
            },
            {
                "column_letter": "H",
                "column": "created_by",
                "name": "Created by",
            },
        ],
        inspectors: [
            {
                "column_letter": "A",
                "column": "inspector_id",
                "name": "UNIQUE ID",
            },
            {
                "column_letter": "B",
                "column": "email",
                "name": "Email",
            },
            {
                "column_letter": "C",
                "column": "name",
                "name": "Name",
            },
            {
                "column_letter": "D",
                "column": "role",
                "name": "Role",
            },
            {
                "column_letter": "E",
                "column": "image",
                "name": "Image",
            },
            {
                "column_letter": "F",
                "column": "phone",
                "name": "Phone Number",
            },
        ],
        inspections: [
            {
                "column_letter": "A",
                "column": "inspection_id",
                "name": "Unique ID",
            },
            {
                "column_letter": "B",
                "column": "datetime",
                "name": "Date Time",
            },
            {
                "column_letter": "C",
                "column": "inspector_id",
                "name": "Inspector ID",
            },
            {
                "column_letter": "D",
                "column": "inspector_email",
                "name": "Inspector Email",
            },
            {
                "column_letter": "E",
                "column": "house_id",
                "name": "House ID",
            },
            {
                "column_letter": "F",
                "column": "room",
                "name": "Room",
            },
            {
                "column_letter": "G",
                "column": "area_inspected",
                "name": "Areas Inspected",
            },
            {
                "column_letter": "H",
                "column": "status_code",
                "name": "Status Code",
            },
            {
                "column_letter": "I",
                "column": "photo",
                "name": "Photo",
            },
            {
                "column_letter": "J",
                "column": "detail_photo_1",
                "name": "Detail Photo 1",
            },
            {
                "column_letter": "K",
                "column": "detail_photo_2",
                "name": "Detail Photo 2",
            },
            {
                "column_letter": "L",
                "column": "detail_photo_3",
                "name": "Detail Photo 3",
            },
            {
                "column_letter": "M",
                "column": "observations",
                "name": "Observations",
            },
            {
                "column_letter": "N",
                "column": "sqmt-a",
                "name": "Sqmt-A",
            },
            {
                "column_letter": "O",
                "column": "sqmt-b",
                "name": "Sqmt-B",
            },
            {
                "column_letter": "P",
                "column": "recheck_needed",
                "name": "Recheck Needed?",
            },
            {
                "column_letter": "Q",
                "column": "signaure",
                "name": "Signaure",
            },
            {
                "column_letter": "R",
                "column": "issues_rectified",
                "name": "Issues Rectified",
            },
            {
                "column_letter": "S",
                "column": "lat_long",
                "name": "LatLong",
            },
        ],
        money_questions: [
            {
                "column_letter": "A",
                "column": "money_question_id",
                "name": "Unique ID",
            },
            {
                "column_letter": "B",
                "column": "datetime",
                "name": "Date Time",
            },
            {
                "column_letter": "C",
                "column": "inspector_id",
                "name": "Inspector ID",
            },
            {
                "column_letter": "D",
                "column": "inspector_email",
                "name": "Inspector Email",
            },
            {
                "column_letter": "E",
                "column": "house_id",
                "name": "House ID",
            },
            {
                "column_letter": "F",
                "column": "inhabited",
                "name": "¿Hay ocupantes en la propiedad?",
            },
            {
                "column_letter": "G",
                "column": "inhabited_type",
                "name": "Si existen ocupantes, ¿qué son?",
            },
            {
                "column_letter": "H",
                "column": "is_property_broker",
                "name": "¿La propiedad está siendo vendida a través de un corredor de propiedades?",
            },
            {
                "column_letter": "I",
                "column": "broker_fee_type",
                "name": "Trabajan con factura o boleta? Si es boleta, la comisión debe incluir el impuesto",
            },
            {
                "column_letter": "J",
                "column": "common_expenses",
                "name": "Ingresa el valor de los gastos comunes asociados a la propiedad que estás visitando.",
            },
            {
                "column_letter": "K",
                "column": "common_expenses_photo",
                "name": "Foto de comprobante GC",
            },
            {
                "column_letter": "L",
                "column": "contributions",
                "name": "Valor de las contribuciones",
            },
            {
                "column_letter": "M",
                "column": "contributions_photo",
                "name": "Foto comprobante contrib",
            },
            {
                "column_letter": "N",
                "column": "construction_year",
                "name": "Confirma el año de la propiedad con los dueños",
            },
        ],
        inspection_areas: [
            {
                "column_letter": "A",
                "column": "inspection_area_id",
                "name": "UNIQUE ID",
            },
            {
                "column_letter": "B",
                "column": "inspection_area_name",
                "name": "Areas Inspected",
            },
        ],
        onboarding: [
            {
                "column_letter": "A",
                "column": "inspection_area_id",
                "name": "UNIQUE ID",
            },
            {
                "column_letter": "B",
                "column": "title",
                "name": "Title",
            },
            {
                "column_letter": "C",
                "column": "content",
                "name": "Content",
            },
            {
                "column_letter": "D",
                "column": "image",
                "name": "Image",
            },
        ],
    }

    this.fields = {}

}

ManagerDooris.prototype.initialize = function () {

    this.document = SpreadsheetApp.openById(this.document_id);

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
ManagerDooris.prototype.getValue = function (field, data_sheet) {

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
ManagerDooris.prototype.showValue = function (field, value, data_sheet) {

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}

/**
* Establece los valores de la fila correspondiente
* row_id: id de la fila a modificar
* data_sheet_var_name: nombre interno de la hoja a modificar
* value: valores a ingresar, debe coincidir el número de columnas con el arreglo
*/
ManagerDooris.prototype.setRowValue = function (row_id, data_sheet_var_name, value) {

    let data_sheet = this.data_sheet[data_sheet_var_name]

    let string_range = this.ranges_data[data_sheet_var_name].replace("[row_a]", row_id).replace("[row_b]", row_id)

    let range = data_sheet.getRange(string_range);

    range.setValues([
        value
    ])

}


/**
 * obtiene los valores de una fila y los devuelve como diccionario
 * según la sheet que se esté consultando
 * row_id: id de la row a extraer
 * data_sheet_var_name: nombre de la data sheet en arreglo 
 *      houses, inspectors, inspections, money_questions, 
 *      inspection_areas, onboarding
 * how_dictionary: establece si la respuesta es como arreglo o diccionario
 */
ManagerDooris.prototype.getSheetRow = function (row_id, data_sheet_var_name, how_dictionary = true) {

    let data_sheet = this.data_sheet[data_sheet_var_name]

    let string_range = this.ranges_data[data_sheet_var_name].replace("[row_a]", row_id).replace("[row_b]", row_id)

    let details_range = this.details_range[data_sheet_var_name]

    range = data_sheet.getRange(string_range);

    values = range.getValues()[0];

    if (!how_dictionary) {

        return values;

    }

    dictionary = {}

    for (let i = 0; i < details_range.length; i++) {

        const detail = details_range[i];

        dictionary[detail.column] = values[i]

    }

    return dictionary

}


/**
 * Función exclusiva para details_range
 */
Array.prototype.findColumn = function (column) {
    for (i = 0; i < this.length; i++) {
        if (this[i].column === column)
            return this[i];
    }
};


/**
 * Función para encontrar un valor en la columna seleccionada
 * column: nombre de la columna según column_details
 */
ManagerDooris.prototype.findValueInColumn = function (column, data_sheet_var_name, value) {

    let first_row = 2;

    let data_sheet = this.data_sheet[data_sheet_var_name]

    let column_letter = this.details_range[data_sheet_var_name].findColumn(column = column).column_letter;

    range = data_sheet.getRange(`${column_letter}${first_row}:${column_letter}`);

    values = range.getValues();

    rows = [];

    for (var i = 0; i < values.length; i++) {

        if (values[i][0] === value) {

            rows.push(i + first_row);

        }

    }

    return rows;

}

/**
 * Extrae todos los datos ingresados respecto a una vivienda
 * param houes_id: id de la propiedad trabajada
 */
ManagerDooris.prototype.extractAllDataHome = function (house_id) {

    let house_data = {
        house: null,
        inspections: [],
        money_questions: null,
    }

    // extraccion de dados desde house
    let rows = this.findValueInColumn(
        column = "house_id", data_sheet_var_name = "houses", value = house_id
    )

    if (rows.length == 0) {

        return null

    }

    house_data.house = this.getSheetRow(row_id = rows[0], data_sheet_var_name = "houses")

    // Extracción de datos desde Inspections
    rows = this.findValueInColumn(
        column = "house_id", data_sheet_var_name = "inspections", value = house_id
    )

    for (let i = 0; i < rows.length; i++) {
        const element = rows[i];
        house_data.inspections.push(
            this.getSheetRow(row_id = rows[i], data_sheet_var_name = "inspections")
        )
    }

    // Money questions
    rows = this.findValueInColumn(
        column = "house_id", data_sheet_var_name = "money_questions", value = house_id
    )

    if (rows.length > 0) {

        house_data.money_questions = this.getSheetRow(
            row_id = rows[0], data_sheet_var_name = "money_questions"
        )

    }

    return house_data

}

/**
 * Crea un nuevo registro en Dooris
 * param house_id: id unica de la propiedad
 * param address: Dirección de la propiedad
 * param description: Descripción de la propiedad
 * param image: Imagén de portada de la propiedad
 * param lat_long: coordenadas geograficas
 * param check_in: Fecha de llegada?
 * param time: Timestamp fecha de visita?
 * param created_by: email del usuario creador de la propiedad
 */
ManagerDooris.prototype.createNewHome = function (
    house_id,
    address = null,
    description = null,
    image = null,
    lat_long = null,
    check_in = null,
    time = null,
    created_by = null
) {
    let rows = this.findValueInColumn(
        column = "house_id", data_sheet_var_name = "houses", value = house_id
    )

    if (rows.length > 0) {

        return null

    }

    let data_sheet = this.data_sheet["houses"]

    new_house = [
        house_id,
        address,
        description,
        image,
        lat_long,
        check_in,
        time,
        created_by
    ]

    data_sheet.appendRow(new_house);

    return new_house
}

/**
 * Actualiza un registro de la tabal House en Dooris
 * param house_id: id unica de la propiedad
 * param address: Dirección de la propiedad
 * param description: Descripción de la propiedad
 * param image: Imagén de portada de la propiedad
 * param lat_long: coordenadas geograficas
 * param check_in: Fecha de llegada?
 * param time: Timestamp fecha de visita?
 * param created_by: email del usuario creador de la propiedad
 */
ManagerDooris.prototype.UpdateHome = function (
    house_id,
    address = null,
    description = null,
    image = null,
    lat_long = null,
    check_in = null,
    time = null,
    created_by = null
) {
    let rows = this.findValueInColumn(
        column = "house_id", data_sheet_var_name = "houses", value = house_id
    )

    if (rows.length == 0) {

        return null

    }

    house_row = rows[0]

    house = this.getSheetRow(
        row_id = house_row, data_sheet_var_name = "houses",
        how_dictionary = false
    )

    house[1] = address == null ? house[1] : address

    house[2] = description == null ? house[2] : description

    house[3] = image == null ? house[3] : image

    house[4] = lat_long == null ? house[4] : lat_long

    house[5] = check_in == null ? house[5] : check_in

    house[6] = time == null ? house[6] : time

    house[7] = created_by == null ? house[7] : created_by


    this.setRowValue(
        row_id = house_row,
        data_sheet_var_name = "houses",
        value = house
    )

}



function test_manager_dooris() {

    manager_dooris = new ManagerDooris()

    manager_dooris.initialize()

    manager_test = new ManagerTest()

    manager_test.initialize()

    row_data = manager_dooris.getSheetRow(
        row_id = 3,
        data_sheet_var_name = "houses"
    )

    rows = manager_dooris.findValueInColumn(
        column = "house_id",
        data_sheet_var_name = "houses",
        values = "64a2ca5e"
    )

    Logger.log(
        rows
    )

    house_data = manager_dooris.extractAllDataHome(house_id = "58eb39fq")

    manager_test.showValue(
        field = "B2",
        value = JSON.stringify(house_data)
    )

    new_data = manager_dooris.createNewHome(
        house_id = "aa1",
        address = "null1",
        description = "n2ull",
        image = "null3",
        lat_long = "nul2l",
        check_in = "nu1ll",
        time = "null3",
        created_by = "nul2l"
    )

    if (new_data == null) {
        manager_dooris.UpdateHome(home_id = "aa1", created_by = "EvilLink")
    }
}