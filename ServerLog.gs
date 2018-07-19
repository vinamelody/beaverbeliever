function writeToLog() {
  var startRow = 1 // top most row
  var writeToColumn = 4 // default to D == 4
  
  var sequenceToWrite = 1
  var deceasedName = "Kim Jong Fun"
  var pastorName = "Ps Joash"
  var serviceLanguage = "E"
  var serviceDate = "2018-07-19"
  var servingBeaverId = '10' // need to be able to handle array of strings
  
  var frequencyColumn = 3 // column starts from 1
  var beaverStartRow = 7 // row starts from 0
  
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Servers Log");
  if (sheet != null) {

    var lastSequenceNumber = sheet.getRange(startRow, sheet.getLastColumn()).getValue()
//    Logger.log(lastSequenceNumber)
    if (lastSequenceNumber === '') {
      sequenceToWrite = 1
    } else {
      sequenceToWrite = ++lastSequenceNumber
      var lastColumn = sheet.getLastColumn()
      writeToColumn = ++lastColumn
    }
//    Logger.log(sequenceToWrite)
    
    var sequenceNumberCell = sheet.getRange(startRow, writeToColumn)
    sequenceNumberCell.setValue(sequenceToWrite)
    
    var deceasedNameCell = sheet.getRange(++startRow, writeToColumn)
    deceasedNameCell.setValue(deceasedName)
    
    var pastorNameCell = sheet.getRange(++startRow, writeToColumn)
    pastorNameCell.setValue(pastorName)
    
    var serviceLanguageCell = sheet.getRange(++startRow, writeToColumn)
    serviceLanguageCell.setValue(serviceLanguage)
    
    var serviceDateCell = sheet.getRange(++startRow, writeToColumn)
    serviceDateCell.setValue(serviceDate)
    
    var beaversRange = sheet.getRange(beaverStartRow, 1, sheet.getLastRow())
    var beaverIds = beaversRange.getValues()
    for (var i=0; i < beaverIds.length; i++) {
      var id = ''+beaverIds[i][0]
      if (id === servingBeaverId) {
        var beaverIdInt = parseInt(servingBeaverId)
        var rowNumber = startRow + beaverIdInt
        Logger.log(rowNumber)
        var frequencyCell = sheet.getRange(rowNumber, frequencyColumn)
        var frequencyData = parseInt(frequencyCell.getValue()) || 0
        frequencyCell.setValue(++frequencyData)        
        
        var markingCell = sheet.getRange(rowNumber, writeToColumn)
        markingCell.setValue(serviceLanguage)
      }
    }
  } else {
    showAlert("Cannot find sheet name Servers Log");
  }
}
