// Constants
var emphasisOnDay = 0.45
var MyColumnHeader = ['Name', 'Days score', 'Availability', 'Language', 'Distance score', 'Rating', 'Assign?'];

function getRating(distanceScore, isLanguageMatching, dayScore, isAvailable) {
  return (isAvailable * isLanguageMatching * (emphasisOnDay * dayScore + (1 - emphasisOnDay) * distanceScore))
}

function mapRating(isLanguageMatching, isAvailable, score) {
  if (isLanguageMatching == 0) {
    return "Language Mismatch"
  }
  if (isAvailable == 0) {
    return "Block-out Period"
  }
  if (score < 30) { return "Last Resort" }
  else if (score < 50) { return "Not Preferred" }
  else if (score < 70) { return "OK-ish" }
  else if (score < 85) { return "Preferred" }
  else { return "Pick-ME!" }
  
}

function testGetRating() {
  var distanceScore = 15.50754091
  var isLanguageMatching = 1
  var isAvailable = 1
  var dayScore = 100
  var rating = getRating(distanceScore, isLanguageMatching, dayScore, isAvailable)
  Logger.log("Rating = " + rating)
}

function generateRecommendationTable(array) {
  // Logger.log(array)
  var dd = [];
  for (var i=0; i<array.length; i++) {
    dd.push([array[i].name, array[i].dayScore, array[i].availabilityScore, array[i].languageScore, array[i].distanceScore, array[i].rating])
  }
  
  var isAssignRule = SpreadsheetApp.newDataValidation().requireValueInList(['Yes'], true).build();
  // Logger.log(dd)
  var document = SpreadsheetApp.openById(documentId);
  var sheet = document.getSheetByName("Recommendation");
  if (sheet != null) {
    // Clear sheet and make header
    sheet.clear()
    
    // write data to sheet
    sheet.appendRow(MyColumnHeader)
    
    var range = sheet.getRange(2, 1, array.length, 6)
    range.setValues(dd);
    
    var assignColumn = sheet.getRange(2, 7, array.length, 1)
    assignColumn.setDataValidation(isAssignRule);
    
  } else {
    showAlert("Cannot find sheet name Recommendation");
  }
}

function testDidCreateNewService() {
  var testService = new Service("6/22/2018", "e", "345678");
  getBeavers(testService);
}