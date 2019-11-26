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
            comuna: "C8",
            nombre_cliente: "B10",
            email: "B11",
            telefono: "B12",
            precio_esperado_uf: "B24",
            precio_esperado: "C24",
            precio_publicacion: "B26",
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
                    fecha_inicial: "N4",
                    fecha_final: "O4",
                    dias: "P4",
                    dias_acumulado_estimado: "R4",
                    dias_acumulado_real: "S4",
                    dias_acumulado_delta: "T4",
                },
                alzamiento: {
                    fecha_inicial: "N5",
                    fecha_final: "O5",
                    dias: "P5",
                    dias_acumulado_estimado: "R5",
                    dias_acumulado_real: "S5",
                    dias_acumulado_delta: "T5",
                },
                compra_e_inscripcion: {
                    fecha_inicial: "N6",
                    fecha_final: "O6",
                    dias: "P6",
                    dias_acumulado_estimado: "R6",
                    dias_acumulado_real: "S6",
                    dias_acumulado_delta: "T6",
                },
                proyecto_remodelacion: {
                    fecha_inicial: "N7",
                    fecha_final: "O7",
                    dias: "P7",
                    dias_acumulado_estimado: "R7",
                    dias_acumulado_real: "S7",
                    dias_acumulado_delta: "T7",
                },
                tiempo_de_venta: {
                    fecha_inicial: "N8",
                    fecha_final: "O8",
                    dias: "P8",
                    dias_acumulado_estimado: "R8",
                    dias_acumulado_real: "S8",
                    dias_acumulado_delta: "T8",
                },
                inscripcion: {
                    fecha_inicial: "N9",
                    fecha_final: "O9",
                    dias: "P9",
                    dias_acumulado_estimado: "R9",
                    dias_acumulado_real: "S9",
                    dias_acumulado_delta: "T9",
                },
                total: "P10"
            },
            resumen_dias: {
                utilizado: "M14",
                presupuestado: "M16",
                total: "M18",
            },
            resumen_presupuesto: {
                utilizado: "M23",
                presupuestado: "M25",
                total: "M27",
            },
            resumen_financiero: {
                interes_diario: "M31",
                interes_acumulado: "M33"
            },
            margen_empresa: {
                estimado: "M37",
                real: "M39"
            },
            precio_final_venta: "M42",
            precio_esperado_venta: "M45",
            costo_financiero_final: "M48",
            factura_final: {
                valor_propiedad: "M52",
                iva: "M54",
                total: "M56"
            },
            iva: {
                credito: "M60",
                debito: "M62",
                total: "M64",
                porcentaje_precio_venta: "M66",
            },
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
