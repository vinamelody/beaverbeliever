function beautifyRecommendationTable(arrayColors) {
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Recommendation");
  
  sheet.setFrozenRows(8)
  sheet.setRowHeight(8, 60) // Set row 8 height
  
  var textRange = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
  textRange.setFontSize(15);
  
  for (var i = 9, j=0; j < arrayColors.length; i++, j++) {
    Logger.log("Row " + i + "-->" + arrayColors[j])
    var cell = sheet.getRange(i, 6)
    cell.setBackground(arrayColors[j])
  }
  
  var headerRange = sheet.getRange("A8:H8");
  headerRange.setBackground("Black");
  headerRange.setFontColor("White");
  headerRange.setFontSize(17);
  headerRange.setVerticalAlignment(DocumentApp.VerticalAlignment.TOP)
  headerRange.setWrap(true)
  
  var idRange = sheet.getRange(9,1, sheet.getLastRow(), 1)
  idRange.setHorizontalAlignment(DocumentApp.HorizontalAlignment.LEFT)
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