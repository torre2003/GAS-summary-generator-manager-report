function ReportManager() {

    this.document_id = null;
    this.document = null;

    this.sheet_name = {
        details: "Detalle de reporte",
        budget: "Presupuesto",
        time: "Tiempo disponible",
        margin: "Margen empresa",
        costs: "Ingreso de gastos",
        report: "Reporte PDF",
        values: "Valores"
    }

    this.data_sheet = {
        details: null,
        budget: null,
        time_left: null,
        margin: null,
        costs: null,
        report: null,
        values: null,
    }

    this.fields = {
        details: {
            ejecutivo: "B3",
            uf_oferta: "B4",
            id_propiedad: "B6",
            direccion: "B7",
            depto: "B8",
            nombre_cliente: "B10",
            email: "B11",
            telefono: "B12",
            precio_esperado_uf: "B24",
            precio_esperado: "C24"
        },
        budget: {
            totales: {
                esperado: "C24",
                real: "D24",
                porcentaje: "E24",
            },
            tasa: "B28",
            porcentaje_financiamiento: "B29",
            costo_financiero: {
                esperado: "B32",
                real: "C32",
                porcentaje: "D32",
            },
        },
        time_left: {
            alzamiento: {
                dias_esperado: "B4",
                dias_real: "C4",
                porcentaje: "D4",
            },
            compra_e_inscripcion: {
                dias_esperado: "B5",
                dias_real: "C5",
                porcentaje: "D5",
            },
            proyecto_remodelacion: {
                dias_esperado: "B6",
                dias_real: "C6",
                porcentaje: "D6",
            },
            tiempo_de_venta: {
                dias_esperado: "B7",
                dias_real: "C7",
                porcentaje: "D7",
            },
            inscripcion: {
                dias_esperado: "B8",
                dias_real: "C8",
                porcentaje: "D8",
            },
            total: {
                dias_esperado: "B10",
                dias_real: "C10",
                porcentaje: "D10",
            },
        },
        margin: {
            precio_de_venta: {
                presupuestado: "B4",
                real: "C4",
                porcentaje: "D4",
            },
            propiedad: {
                presupuestado: "B5",
                real: "C5",
                porcentaje: "D5",
            },
            remodelacion_y_gastos: {
                presupuestado: "B6",
                real: "C6",
                porcentaje: "D6",
            },
            comision_corredor: {
                presupuestado: "B7",
                real: "C7",
                porcentaje: "D7",
            },
            gasto_financiero: {
                presupuestado: "B8",
                real: "C8",
                porcentaje: "D8",
            },
            margen_empresa: {
                presupuestado: "B9",
                real: "C9",
                porcentaje: "D9",
            },
        },
        costs: {
            time: {
                fecha_inicio_processo: {
                    fecha_inicial: "L4",
                    fecha_final: "M4",
                    dias: "N4",
                    dias_acumulado_estimado: "P4",
                    dias_acumulado_real: "Q4",
                    dias_acumulado_delta: "R4",
                },
                alzamiento: {
                    fecha_inicial: "L5",
                    fecha_final: "M5",
                    dias: "N5",
                    dias_acumulado_estimado: "P5",
                    dias_acumulado_real: "Q5",
                    dias_acumulado_delta: "R5",
                },
                compra_e_inscripcion: {
                    fecha_inicial: "L6",
                    fecha_final: "M6",
                    dias: "N6",
                    dias_acumulado_estimado: "P6",
                    dias_acumulado_real: "Q6",
                    dias_acumulado_delta: "R6",
                },
                proyecto_remodelacion: {
                    fecha_inicial: "L7",
                    fecha_final: "M7",
                    dias: "N7",
                    dias_acumulado_estimado: "P7",
                    dias_acumulado_real: "Q7",
                    dias_acumulado_delta: "R7",
                },
                tiempo_de_venta: {
                    fecha_inicial: "L8",
                    fecha_final: "M8",
                    dias: "N8",
                    dias_acumulado_estimado: "P8",
                    dias_acumulado_real: "Q8",
                    dias_acumulado_delta: "R8",
                },
                inscripcion: {
                    fecha_inicial: "L9",
                    fecha_final: "M9",
                    dias: "N9",
                    dias_acumulado_estimado: "P9",
                    dias_acumulado_real: "Q9",
                    dias_acumulado_delta: "R9",
                },
                total: "N10"
            },
            resumen_dias: {
                utilizado: "K14",
                presupuestado: "K16",
                total: "K18",
            },
            resumen_presupuesto: {
                utilizado: "K23",
                presupuestado: "K25",
                total: "K27",
            },
            resumen_financiero: {
                interes_diario: "K31",
                interes_acumulado: "K33"
            },
            resumen_finales: {
                precio_final_venta: "D2",
                precio_esperado_venta: "D4",
                costo_financiero_final: "D6"
            },
            link_carpeta_propiedad: "G2"
        },
        report: {

        },
        values: {

        },
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

ReportManager.prototype.initialize = function (file_id) {

    this.document = SpreadsheetApp.openById(file_id);

    this.data_sheet.details = this.document.getSheetByName(this.sheet_name.details);

    this.data_sheet.budget = this.document.getSheetByName(this.sheet_name.budget);

    this.data_sheet.time = this.document.getSheetByName(this.sheet_name.time);

    this.data_sheet.margin = this.document.getSheetByName(this.sheet_name.margin);

    this.data_sheet.costs = this.document.getSheetByName(this.sheet_name.costs);

    this.data_sheet.report = this.document.getSheetByName(this.sheet_name.report);

    this.data_sheet.values = this.document.getSheetByName(this.sheet_name.values);

}



/**
 * Obtiene el valor del campo
 */
ReportManager.prototype.getValue = function (field, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.details

    }

    return data_sheet.getRange(field + ":" + field).getCell(1, 1).getValue();

}

/**
* Muestra el valor de un campo en la Hoja
*/
ReportManager.prototype.showValue = function (field, value, data_sheet) {

    if (data_sheet === undefined) {

        data_sheet = this.data_sheet.main

    }

    data_sheet.getRange(field + ":" + field).getCell(1, 1).setValue(value);

}
