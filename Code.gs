// Created by Vina Melody

// Constants
var documentId = "Replace with your document id"
var ColsEnum = {
  "id": 0,
  "name": 1,
  "contact": 2,
  "lastDateServed": 4,
  "blockDateStart": 6,
  "blockDateEnd": 7,
  "remarks": 8,
  "role": 9,
  "english": 10,
  "mandarin": 11,
  "hokkien": 12,
  "cantonese": 13,
  "homePostal": 14,
  "officePostal": 15
};
Object.freeze(ColsEnum);

var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds;
var yes = /Yes/;

// Models
var Service = function(serviceDate, language, wakeCode) {
  this.serviceDate = serviceDate;
  this.language = language;
  this.wakeCode = wakeCode;
}

var Beaver = function(id, name, lastDateServed, blockOutStart, blockOutEnd, language) {
  this.id = id;
  this.name = name;
  this.lastDateServed = lastDateServed;
  this.blockOutStart = blockOutStart;
  this.blockOutEnd = blockOutEnd;
  this.language = language;
};

// Functions

function getBeavers(request) {
  var document = SpreadsheetApp.openById(documentId);
  var dataSheet = document.getSheetByName("Step 1 - Master List")
  if (dataSheet != null) {    
    // Create a service object
    // var service = new Service("19 May 2018", "e", "380126")
    var service = new Service(request.serviceDate, request.language, request.wakeCode)
    
    var recommendation = [];
    
    var data = dataSheet.getDataRange().getValues();
    for (var row = 1; row < data.length; row++) {
      // Logger.log('Beaver ' + data[row][1]);
      var isEnglish = yes.test(data[row][ColsEnum.english])
      var isMandarin = yes.test(data[row][ColsEnum.mandarin])
      var isHokkien = yes.test(data[row][ColsEnum.hokkien])
      var isCantonese = yes.test(data[row][ColsEnum.cantonese])
      var lang = assignLanguage(isEnglish, isMandarin, isHokkien, isCantonese)
      var homePostalCode = !isEmpty(data[row][ColsEnum.homePostal]) ? data[row][ColsEnum.homePostal] : "0"
      var officePostalCode = !isEmpty(data[row][ColsEnum.officePostal]) ? data[row][ColsEnum.officePostal] : "0"
      var beaver = new Beaver(
        data[row][ColsEnum.id],
        data[row][ColsEnum.name],
        data[row][ColsEnum.lastDateServed],
        data[row][ColsEnum.blockDateStart],
        data[row][ColsEnum.blockDateEnd],
        lang
      );
      
      var dayScore = getDayScore(beaver.lastDateServed, service.serviceDate);
      var availabilityScore = ((isAvailable(service.serviceDate, beaver.blockOutStart, beaver.blockOutEnd))? '1' : '0');
      var languageScore = ((isLanguageMatching(service.language, beaver.language)) ? '1' : '0');
      var distanceScore = getDistanceScore(service.wakeCode, homePostalCode, officePostalCode)
      var rating = getRating(distanceScore, languageScore, dayScore, availabilityScore);
      //var ratingLabel = mapRating(languageScore, availabilityScore, rating);
      
      var contact = data[row][ColsEnum.contact]
      var role = data[row][ColsEnum.role]
      var remarks = data[row][ColsEnum.remarks]
      
      var beaverData = {
        id: beaver.id,
        name: beaver.name,
        dayScore: dayScore,
        availabilityScore: availabilityScore,
        languageScore: languageScore,
        distanceScore: distanceScore,
        rating: rating,
        role: role,
        remarks: remarks,
        contact: contact,
        daysSinceLastServed: countDaysBetween(beaver.lastDateServed, service.serviceDate)
      };
      
      recommendation.push(beaverData);
      //Logger.log("Beaver = " + beaverData.name)
    }
    recommendation.sort(function(o1, o2) {
      return parseFloat(o2.rating) - parseFloat(o1.rating)
    })
    Logger.log("Recommendation sorted")
    generateRecommendationTable(recommendation)
  } else {
    showAlert("Cannot find Step 1 - Master List");
  }
}

// Helper Functions

function isEmpty(str) {
  return (!str || 0 === str.length);
}

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

function isAvailable(serviceDate, blockDateStart, blockDateEnd) {
  var check = new Date(serviceDate);
  var dStart = new Date(blockDateStart);
  var dEnd = new Date(blockDateEnd);
    
  if (check >= dStart && check < dEnd) {
    return false;
  } else {
    return true;
  }
};

function assignLanguage(english, mandarin, hokkien, cantonese) {
  var lang = "";
  if (Boolean(english)) {
    lang += 'e';
  }
  if (mandarin) {
    lang += 'm';
  }
  if (hokkien) {
    lang += 'h';
  }
  if (cantonese) {
    lang += 'c';
  }
  return lang
}
        
function isLanguageMatching(serviceLanguage, beaverLanguage) {
  return (beaverLanguage.indexOf(serviceLanguage) !== -1) 
};



function testDistrict() {
  var id = 38
  var d = districtLookup(id)
  Logger.log("x=" + d.xValue)
  Logger.log("y=" + d.yValue)
}
