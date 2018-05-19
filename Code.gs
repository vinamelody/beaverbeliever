// Created by Vina Melody

var ColsEnum = {
  "name": 1,
  "lastDateServed": 4
};
Object.freeze(ColsEnum);

var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds;
var MyColumnHeader = ['Name', 'Days score'];

var Service = function(serviceDate, language, wakeCode) {
  this.serviceDate = serviceDate;
  this.language = language;
  this.wakeCode = wakeCode;
}

var Beaver = function(name, lastDateServed) {
  this.name = name;
  this.lastDateServed = lastDateServed;
};

function getBeavers() {  
  var dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Step 1 - Master List");
  var resultSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Recommendation");
  if (dataSheet != null && resultSheet != null) {
    // Clear sheet and make header
    resultSheet.clear()
    resultSheet.appendRow(MyColumnHeader)
    
    // Create a service object
    var service = new Service("19 May 2018", "English", "380126")
    
    var data = dataSheet.getDataRange().getValues();
    for (var row = 1; row < data.length; row++) {
      // Logger.log('Beaver ' + data[row][1]);
      var beaver = new Beaver(data[row][ColsEnum.name],data[row][ColsEnum.lastDateServed]);
      resultSheet.appendRow([beaver.name, getDayScore(beaver.lastDateServed, service.serviceDate)]);
    }
  }
}

// Helper Functions

function countDaysBetween(firstDate, secondDate) {

  var first = new Date(firstDate)
  first.setHours(0,0,0)
  var second = new Date(secondDate)
  second.setHours(0,0,0)
  var diffDays = Math.round(Math.abs((first.getTime() - second.getTime())/(oneDay)));
  return diffDays
}

function getDayScore(firstDate, secondDate) {
  var days = countDaysBetween(firstDate, secondDate)
  if (days < 7) {
    return 0
  } else if (days < 10) {
    return 3
  } else if (days < 13) {
    return 7
  } else if (days < 16) {
    return 15
  } else if (days < 20) {  
    return 30
  } else if (days < 24) {  
    return 60
  } else if (days < 27) {  
    return 80
  } else {
    return 100
  }
}