function writeToLog(service, servingBeavers) {
    var startRow = 1 // top most row
    var writeToColumn = 4 // default to D == 4
    
    var sequenceToWrite = 1 // default to 1 but will find the last count
    
    var nameOfDeceased = service.deceasedName
    var pastorName = service.pastor
    var serviceLanguage = service.language
    var serviceDate = service.serviceDate
    
    Logger.log(serviceLanguage)
    Logger.log(pastorName)
    Logger.log(nameOfDeceased)
    Logger.log(serviceDate)
    Logger.log(servingBeavers)
    
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
      
      var nameOfDeceasedCell = sheet.getRange(++startRow, writeToColumn)
      nameOfDeceasedCell.setValue(nameOfDeceased)
      
      var pastorNameCell = sheet.getRange(++startRow, writeToColumn)
      pastorNameCell.setValue(pastorName)
      
      var serviceLanguageCell = sheet.getRange(++startRow, writeToColumn)
      serviceLanguageCell.setValue(serviceLanguage)
      
      var serviceDateCell = sheet.getRange(++startRow, writeToColumn)
      serviceDateCell.setValue(serviceDate)
      
      var beaversRange = sheet.getRange(beaverStartRow, 1, sheet.getLastRow())
      var beaverIds = beaversRange.getValues()
      
      for (var i=0; i < servingBeavers.length; i++) {
        var servingBeaverIdInt = parseInt(servingBeavers[i])
        var rowNumber = startRow + servingBeaverIdInt
        
        Logger.log(rowNumber)
        var frequencyCell = sheet.getRange(rowNumber, frequencyColumn)
        var frequencyData = parseInt(frequencyCell.getValue()) || 0
        frequencyCell.setValue(++frequencyData)        
        
        var markingCell = sheet.getRange(rowNumber, writeToColumn)
        markingCell.setValue(serviceLanguage)
      }
      
    } else {
      showAlert("Cannot find sheet name Servers Log");
    }
  }
  