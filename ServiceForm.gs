function didCreateNewService(s) {
  Logger.log("Values = " + s.values);
  var serviceDate = s.values[1];
  var serviceLanguage = mapLanguage(s.values[2]);
  var wakePostalCode = s.values[3];
  
  Logger.log("Service date = %s", serviceDate);
  Logger.log("Language = %s", serviceLanguage);
  Logger.log("Wake postal code = %s", wakePostalCode);
  
  var service = new Service(serviceDate, serviceLanguage, wakePostalCode);
  getBeavers(service);
}

function mapLanguage(lang) {
  if (lang == "English") { return "e" }
  else if (lang == "Chinese") { return "m" }
  else if (lang == "Cantonese") { return "c" }
  else if (lang == "Hokkien") { return "h" }
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Assignment").addItem("Confirm Assignment", 'handleAssign').addToUi()
}

function handleAssign() {
  showAlert("Are you sure?")
}
