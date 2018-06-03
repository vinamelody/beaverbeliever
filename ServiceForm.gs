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

// Generate Edit Url link to form
// Sheet
var sheetName = 'Service';
var columnName = 'Edit Url';

// Responses starting row
var startRow = 2;

// This is to generate all edit urls
function getEditResponseUrls(){
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues(); 
  var columnIndex = headers[0].indexOf(columnName);
  var form = FormApp.openById(formId);
  var data = sheet.getDataRange().getValues();  

  for(var i = startRow-1; i < data.length; i++) {
      if(data[i][0] && !data[i][columnIndex]) {

          var timestamp = data[i][0];
          var formSubmitted = form.getResponses(timestamp);
          if(formSubmitted.length < 1) continue;

          var editResponseUrl = formSubmitted[0].getEditResponseUrl();
          sheet.getRange(i+1, columnIndex+1).setValue(editResponseUrl);
      }
  }
}

// This is to generate only the newly submitted response
function getNewEditResponseUrls() {
    var document = SpreadsheetApp.openById(getDocumentId());
    var sheet = document.getSheetByName(sheetName);
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues(); 
    var columnIndex = headers[0].indexOf(columnName);
    var form = FormApp.openById(formId);
    
    var timestamp = sheet.getRange(sheet.getLastRow(), 1).getValue()
    Logger.log(timestamp)
    
    var formSubmitted = form.getResponses(timestamp)
    Logger.log(formSubmitted)
  
    var editResponseUrl = formSubmitted[0].getEditResponseUrl();
    Logger.log(editResponseUrl)
    
    var editUrlCell = sheet.getRange(sheet.getLastRow(), sheet.getLastColumn())
    editUrlCell.setValue(editResponseUrl)
    
  }
  