function checkNewDataCalendly() {

    manager_calendly = new ManagerCalendly()

    manager_calendly.initialize()

    new_rows = calendly_manager.getNewRows()

    for (let i = 0; i < new_rows.length; i++) {

        const row = new_rows[i];

        if (row.upload_megatron !== true) {
            //Enviamos información a megatron
        }

        if (row.upload_dooris !== true) {
            //checqueamos si la propiedad no existe se ingresa, sino 
            // se actualiza el parametro timestamp de la primera hoja
        }

    }

}