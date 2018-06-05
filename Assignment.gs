function getAssignedBeavers() {
  var assignColumn = 6 // ID = 0 in array
  var nameColumn = 1
  var idColumn = 0
  var startAtRow = 9
  
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Recommendation");
  if (sheet != null) {    
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
    Logger.log("Selected = " + selectedBeaverIds)
    var confirmationMessage = "Assign " + names + " for service date on " + formattedDate + " ?"
    
    var ui = SpreadsheetApp.getUi()
    var alert = ui.alert("Confirm Assignment", confirmationMessage, ui.ButtonSet.YES_NO)
    
    if (alert == ui.Button.YES) {
      confirmAssignment(selectedBeaverIds, serviceDate)
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
  showAlert("Master list updated")
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
