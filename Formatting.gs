function beautifyRecommendationTable(arrayColors) {
    var document = SpreadsheetApp.openById(documentId);
    var sheet = document.getSheetByName("Recommendation");
    
    sheet.setFrozenRows(1)
    sheet.setRowHeight(1, 60) // Set row 1 height
    
    var textRange = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn())
    textRange.setFontSize(15);
    
    for (var i = 2, j=0; j < arrayColors.length; i++, j++) {
      Logger.log("Row " + i + "-->" + arrayColors[j])
      var cell = sheet.getRange(i, 5)
      //cell.setValue(item.text)
      cell.setBackground(arrayColors[j])
    }
    
    var headerRange = sheet.getRange("A1:G1");
    headerRange.setBackground("Black");
    headerRange.setFontColor("White");
    headerRange.setFontSize(17);
    headerRange.setVerticalAlignment(DocumentApp.VerticalAlignment.TOP)
    headerRange.setWrap(true)
  }
  
  function testDidCreateNewService() {
    var testService = new Service("6/22/2018", "e", "345678");
    getBeavers(testService);
  }
  
  function mapRatingFormat(isLanguageMatching, isAvailable, score) {
    if (isLanguageMatching == 0) {
      return {color: "Gray", text: "Language Mismatch"}
    }
    if (isAvailable == 0) {
      return {color: "Gray", text: "Block-out Period"}
    }
    if (score < 30) { return {color: "Plum", text: "Last Resort" } }
    else if (score < 50) { return {color: "Purple", text: "Not Preferred" } }
    else if (score < 70) { return {color: "Yellow", text: "OK-ish" } }
    else if (score < 85) { return {color: "Blue", text: "Preferred" } }
    else { return {color: "Green", text: "Pick-ME!" } }
  }