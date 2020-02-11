function doGet(request) {
    manager_test = new ManagerTest()

    manager_test.initialize()

    var access_token = request.parameters.access_token

    var home_id = "M" + request.parameters.home_id

    endpoint_access_token = PropertiesService.getScriptProperties().getProperty("endpoint_access_token");

    if (access_token == endpoint_access_token) {

        manager_dooris = new ManagerDooris()

        manager_dooris.initialize()

        house_data = manager_dooris.extractAllDataHome(house_id = home_id)

        if (house_data == null) {

            return ContentService.createTextOutput(JSON.stringify({ error: "Home not exists" }));

        }

        return ContentService.createTextOutput(JSON.stringify(house_data));

    }

    return ContentService.createTextOutput(JSON.stringify({ error: "Invalid access token" }));

}




