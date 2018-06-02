function getAssignedBeavers() {
    var assignColumn = 7
    var idColumn = 0
    
    var document = SpreadsheetApp.openById(documentId);
    var sheet = document.getSheetByName("Recommendation");
    if (sheet != null) {
      
      // write data to sheet
      sheet.appendRow(MyColumnHeader)
      
      var data = sheet.getDataRange().getValues();
      var selectedBeaverIds = [];
      for (var row = 1; row < data.length; row++) {
        var isSelected = yes.test(data[row][assignColumn]);
        if (isSelected == true) {
          selectedBeaverIds.push(data[row][idColumn])
        }
      }
    Logger.log("Selected = " + selectedBeaverIds)
      
    } else {
      showAlert("Cannot find sheet name Recommendation");
    }
  }
  