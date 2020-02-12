function checkNewDataCalendly() {

    manager_calendly = new ManagerCalendly()

    manager_calendly.initialize()

    api_megatron = new ApiMegatron()

    api_megatron.initialize()

    manager_dooris = new ManagerDooris()

    manager_dooris.initialize()

    new_rows = manager_calendly.getNewRows()

    for (let i = 0; i < new_rows.length; i++) {

        const row = new_rows[i];

        let response = api_megatron.uploadCommentData(
            home_id = row.home_id,
            schedule_date = row.date_calendly
        )

        if (response.status === 'ok') {

            dooris_row = manager_dooris.createNewHome(
                house_id = "M" + row.home_id,
                address = response.home_data.address,
                description = null,
                image = null,
                lat_long = response.home_data.latitude + ', ' + response.home_data.longitude,
                check_in = null,
                time = row.date_calendly,
                created_by = row.email_home_advisor
            )

            if (dooris_row == null) {

                manager_dooris.UpdateHome(
                    house_id = "M" + row.home_id,
                    address = response.home_data.address,
                    description = null,
                    image = null,
                    lat_long = response.home_data.latitude + ', ' + response.home_data.longitude,
                    check_in = null,
                    time = row.date_calendly,
                    created_by = row.email_home_advisor
                )
            }

            manager_calendly.setCalendlyRow(
                row_id = row.row,
                upload_megatron = true,
                upload_dooris = true,
                home_id = null,
                date_calendly = null,
                email_home_advisor = null,
                address = response.home_data.address,
                lat_long = response.home_data.latitude + ', ' + response.home_data.longitude
            )



        } else {
            // En caso de error
            manager_calendly.setCalendlyRow(
                row_id = row.row,
                upload_megatron = false,
                upload_dooris = false,
                home_id = null,
                date_calendly = null,
                email_home_advisor = null,
                address = response.message,
                lat_long = response.exception
            )
        }

        //Enviamos información a megatron

        //checqueamos si la propiedad no existe se ingresa, sino 
        // se actualiza el parametro timestamp de la primera hoja


    }

}