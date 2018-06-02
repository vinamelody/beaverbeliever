function didCreateNewService(s) {
  Logger.log("Values = " + s.values);
  var serviceDate = s.values[1];
  var serviceLanguage = mapLanguage(s.values[2]);
  var wakePostalCode = s.values[3];
  
  Logger.log("Service date = %s", serviceDate);
  Logger.log("Language = %s", serviceLanguage);
  Logger.log("Wake postal code = %s", wakePostalCode);
  
  var service = Service(serviceDate, serviceLanguage, wakePostalCode);
  getBeavers(service);
}

function mapLanguage(lang) {
  if (lang == "English") { return "e" }
  else if (lang == "Chinese") { return "m" }
  else if (lang == "Cantonese") { return "c" }
  else if (lang == "Hokkien") { return "h" }
}


function testDidCreateNewService() {
  var testService = new Service("6/22/2018", "e", "98765");
  getBeavers(testService);
}