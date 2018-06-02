// Constants
var emphasisOnDay = 0.45
var MyColumnHeader = ['ID', 'Name', 'Role', 'Days Since Last Service', 'Recommendation', 'Assign?', 'Remarks'];

function getRating(distanceScore, isLanguageMatching, dayScore, isAvailable) {
  return (isAvailable * isLanguageMatching * (emphasisOnDay * dayScore + (1 - emphasisOnDay) * distanceScore))
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


function generateRecommendationTable(array) {
  var colorArray = [];  
  // Logger.log(array)
  var dd = [];
  for (var i=0; i<array.length; i++) {
    var recommendationText = mapRatingFormat(array[i].languageScore, array[i].availabilityScore, array[i].rating)
    dd.push([array[i].id, array[i].name, array[i].role, array[i].daysSinceLastServed, recommendationText.text, '', array[i].remarks])
    colorArray.push(recommendationText.color)
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
    
    var range = sheet.getRange(2, 1, array.length, MyColumnHeader.length)
    range.setValues(dd);
    
    var assignColumnNo = 6 // A = 1
    var assignColumnRange = sheet.getRange(2, assignColumnNo, array.length, 1)
    assignColumnRange.setDataValidation(isAssignRule);
    beautifyRecommendationTable(colorArray);
  } else {
    showAlert("Cannot find sheet name Recommendation");
  }
}

function testGetRating() {
  var distanceScore = 15.50754091
  var isLanguageMatching = 1
  var isAvailable = 1
  var dayScore = 100
  var rating = getRating(distanceScore, isLanguageMatching, dayScore, isAvailable)
  Logger.log("Rating = " + rating)
}