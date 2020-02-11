function ApiMegatron() {

  this.access_token = PropertiesService.getScriptProperties().getProperty("access_token");;

  this.url_megatron = PropertiesService.getScriptProperties().getProperty("url_megatron");

  this.urls = {
    insert_schedule_visit: this.url_megatron + '/propiedades/api/ingresar-calendarizacion-visita',
  }

}

ApiMegatron.prototype.initialize = function () {

}

/**
 * Agenda una visita para una propiedad
 * home_id: Propiedad a agendar la visita
 * schedule_date: fecha a agendar en formato 21-12-2001 12:12:12
 */
ApiMegatron.prototype.uploadCommentData = function (home_id, schedule_date) {

  data = {
    home_id: home_id,
    date_calendly: schedule_date
  }

  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(data)
  }

  var url = this.urls.insert_schedule_visit + '?access_token=' + this.access_token

  var response = UrlFetchApp.fetch(url, options).getContentText();

  response = JSON.parse(response)

  return response

}