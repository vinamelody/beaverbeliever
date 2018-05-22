function calculateDistrict(postalCode) {
  return Math.floor(postalCode/10000)
};

function districtLookup(id) {
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("District");
  if (dataSheet != null) {
    var x = dataSheet.getRange(id, 2).getValue()
    var y = dataSheet.getRange(id, 3).getValue()
    var district = { xValue: x, yValue: y }
    return district
  } else {
    showAlert("Cannot find sheet name District");
  }
}

function calculateDistance(wakeDistrict, district) {
  var d = Math.sqrt(Math.pow((district.xValue-wakeDistrict.xValue),2) + Math.pow((district.yValue-wakeDistrict.yValue),2)) * 1.5
  return d
}

function getDistanceScore(wakePostalCode, homePostalCode, officePostalCode) {
  homeDistrictId = calculateDistrict(homePostalCode)
  homeDistrict = districtLookup(homeDistrictId)
  Logger.log("Home district id = " + homeDistrictId)
  Logger.log("Home district x=" + homeDistrict.xValue + " y=" + homeDistrict.yValue)
  
  wakeDistrictId = calculateDistrict(wakePostalCode)  
  wakeDistrict = districtLookup(wakeDistrictId)
  
  Logger.log("Wake district id = " + wakeDistrictId)
  Logger.log("Wake district x=" + wakeDistrict.xValue + " y=" + wakeDistrict.yValue)
  
  distanceFromHome = calculateDistance(wakeDistrict, homeDistrict)
  
  if (officePostalCode == "0") {
    return distanceFromHome
  } else {
      officeDistrictId = calculateDistrict(officePostalCode)  
      officeDistrict = districtLookup(officeDistrictId)
      Logger.log("Office district id = " + officeDistrictId)
      Logger.log("Office district x=" + officeDistrict.xValue + " y=" + officeDistrict.yValue)
      
      distanceFromOffice = calculateDistance(wakeDistrict, officeDistrict)
      Logger.log("Distance from home = " + distanceFromHome)
      Logger.log("Distance from office = " + distanceFromOffice)
        if (distanceFromHome < distanceFromOffice) {
          return distanceFromHome
        } else {
          return distanceFromOffice
        }
  }
}

function testSmallestDistance() {
  var wakePostalCode = "449028"
  var homePostalCode = "389758"
  var officePostalCode = "088540"
  
  getDistanceScore(wakePostalCode, homePostalCode, officePostalCode)
}

function showAlert(message) {
  Browser.msgBox(message)
}
