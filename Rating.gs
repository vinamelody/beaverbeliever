// Constants
var emphasisOnDay = 0.45
var MyColumnHeader = ['ID', 'Name', 'Contact', 'Role', 'Days Since Last Service', 'Recommendation', 'Assign?', 'Remarks'];

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


function generateRecommendationTable(array, service) {
  var colorArray = [];  
  // Logger.log(array)
  Logger.log(service)
  var dd = [];
  for (var i=0; i<array.length; i++) {
    var recommendationText = mapRatingFormat(array[i].languageScore, array[i].availabilityScore, array[i].rating)
    dd.push([array[i].id, array[i].name, array[i].contact, array[i].role, array[i].daysSinceLastServed, recommendationText.text, '', array[i].remarks])
    colorArray.push(recommendationText.color)
  }
  
  var isAssignRule = SpreadsheetApp.newDataValidation().requireValueInList(['Yes'], true).build();
  // Logger.log(dd)
  var document = SpreadsheetApp.openById(getDocumentId());
  var sheet = document.getSheetByName("Recommendation");
  if (sheet != null) {
    // Clear sheet and make header
    sheet.clear()
    
    var formattedDate = Utilities.formatDate(new Date(service.serviceDate), "GMT+8", "EEEEEE, dd MMMM YYYY");
    
    sheet.appendRow(['Service date', '', formattedDate]);
    sheet.appendRow(['Wake postal code', '', service.wakeCode])
    sheet.appendRow(['Language', '', service.language])
    sheet.appendRow(['Pastor', '', service.pastor])
    sheet.appendRow(['Name of deceased', '', service.deceasedName])

    // write data to sheet
    sheet.appendRow(MyColumnHeader)
    sheet.insertRows(sheet.getLastRow(), 2)
    
    var startHeaderRow = 9
    var range = sheet.getRange(startHeaderRow, 1, array.length, MyColumnHeader.length)
    range.setValues(dd);
    
    var assignColumnNo = 7 // A = 1
    var assignColumnRange = sheet.getRange(startHeaderRow, assignColumnNo, array.length, 1)
    assignColumnRange.setDataValidation(isAssignRule);
    beautifyRecommendationTable(colorArray);
  } else {
    showAlert("Cannot find sheet name Recommendation");
  }
}

function testDidCreateNewService() {
  var testService = new Service("6/22/2018", "English", "345678", "Joash", "Kwang");
  getBeavers(testService);
}

function testGetRating() {
  var distanceScore = 15.50754091
  var isLanguageMatching = 1
  var isAvailable = 1
  var dayScore = 100
  var rating = getRating(distanceScore, isLanguageMatching, dayScore, isAvailable)
  Logger.log("Rating = " + rating)
}