function getAssignedBeavers() {
  var assignColumn = 6 // ID = 0 in array
  var nameColumn = 1
  var idColumn = 0
  var startAtRow = 9
  
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Recommendation");
  if (sheet != null) {
    // To confirmAssignment
    var serviceDateCell = sheet.getRange("c1");
    var serviceDate = serviceDateCell.getValue();
    var formattedDate = Utilities.formatDate(new Date(serviceDate), "GMT+8", "EEEEEE, dd MMMM YYYY");
    var data = sheet.getRange(startAtRow, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues()
    var selectedBeaverIds = [];
    var names = [];
    for (var row = 0; row < data.length; row++) {
      var isSelected = yes.test(data[row][assignColumn]);
      if (isSelected == true) {
        selectedBeaverIds.push(data[row][idColumn])
        names.push(data[row][nameColumn])
      }
    }
    var confirmationMessage = "Assign " + names + " for service date on " + formattedDate + " ?"
    
    // To writeToLog
    var serviceLanguage = sheet.getRange("c3").getValue().charAt(0)
    var pastorName = sheet.getRange("c4").getValue()
    var deceasedName = sheet.getRange("c5").getValue()
    var formattedDateForLog = Utilities.formatDate(new Date(serviceDate), "GMT+8", "YYYY-MM-dd");
    var service = new Service(formattedDateForLog, serviceLanguage, '', pastorName, deceasedName)
    
    var ui = SpreadsheetApp.getUi()
    var alert = ui.alert("Confirm Assignment", confirmationMessage, ui.ButtonSet.YES_NO)
    
    if (alert == ui.Button.YES) {
      confirmAssignment(selectedBeaverIds, serviceDate)
      writeToLog(service, selectedBeaverIds)
    }    
  } else {
    showAlert("Cannot find sheet name Recommendation");
  }
}
function confirmAssignment(selectedBeaverIds, serviceDate) {
  // for every id, update master list (id, serviceDate)
    for (var u = 0; u < selectedBeaverIds.length; u++) {
      updateMasterList(selectedBeaverIds[u], serviceDate)
    }
  showAlert("Master list and Server's log are updated.")
}

function updateMasterList(id, serviceDate) {
  var startRow = 2
  var id = ''+id
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Step 1 - Master List");
  if (sheet != null) {
    var range = sheet.getRange(startRow, 1, sheet.getLastRow())
    var values = range.getValues()
    for (var i=0; i < values.length; i++) {
      var str = '' + values[i][0]
      if (id === str) {
        var rowNumber = startRow+i
        
        var frequencyCell = sheet.getRange(rowNumber, 6)
        var frequencyData = parseInt(frequencyCell.getValue())
        Logger.log(str + " --row index--> " + rowNumber + " --current frequency--> " + frequencyData )
        frequencyCell.setValue(++frequencyData)
        
        var lastServiceCell = sheet.getRange(rowNumber, 5)
        Logger.log(str + " -row index-> " + rowNumber + " -current data-> " +  lastServiceCell.getValue())
        var newDate = new Date(serviceDate)
        Logger.log("Last service date = " + newDate)
        lastServiceCell.setValue(newDate)
      }  
    }
  } else {
    showAlert("Cannot find sheet");
  }
}

function testGettingInfo() {
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Recommendation");
  if (sheet != null) {
    var serviceLanguage = sheet.getRange("c3").getValue().charAt(0)
    var pastorName = sheet.getRange("c4").getValue()
    var nameOfDeceased = sheet.getRange("c5").getValue()
    
    Logger.log(serviceLanguage)
    Logger.log(pastorName)
    Logger.log(nameOfDeceased)
    
    var serviceDateCell = sheet.getRange("c1");
    var serviceDate = serviceDateCell.getValue();
    var formattedDateForLog = Utilities.formatDate(new Date(serviceDate), "GMT+8", "YYYY-MM-dd");
    
    Logger.log(formattedDateForLog)
    
  } else {
    showAlert("Cannot find sheet name Recommendation");
  }
}