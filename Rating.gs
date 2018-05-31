var emphasisOnDay = 0.45

function getRating(distanceScore, isLanguageMatching, dayScore, isAvailable) {
  return (isAvailable * isLanguageMatching * (emphasisOnDay * dayScore + (1 - emphasisOnDay) * distanceScore))
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
  Logger.log(array)
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Recommendation");
  if (sheet != null) {
    // Clear sheet and make header
    sheet.clear()
    sheet.appendRow(MyColumnHeader)
    
    for (var row = 0; row < array.length; row++) {
      sheet.appendRow([
        array[row].name, 
        array[row].dayScore,
        array[row].availabilityScore,
        array[row].languageScore,
        array[row].distanceScore,
        array[row].rating
      ]);
    }
  } else {
    showAlert("Cannot find sheet name Recommendation");
  }
}