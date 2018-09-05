// Tutorial found here: https://www.youtube.com/watch?v=bwU1MSLi33Q

// creating a connection to the web service
function doGet (){
    return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function backEndGetInfo(){  
  return getSheetInfo();
}

function getSheetInfo(){
  // get info from the sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var sheetData = sheet.getDataRange().getValues();
  var headerNames = sheetData[0]
  var sheetContentLength = sheetData.length -1
  
  var content = sheetData.splice(1,sheetContentLength)
  
  // convert into 
  var keyValuePairs = content.map(function(item, index){
    var contentObj = {
      id:index+1
    }
    for(var i =0; i<headerNames.length; i++){
      contentObj[headerNames[i]] = item[i];
    }
    return contentObj
  })
  
  return keyValuePairs;
}

function backEndProcessFormInfo(info){
  var content = {
    id:'',
    title:'',
    description:''
  }
  for(var i =0; i <info.length ;i++){
    if(info[i].name === 'id'){
      content.id = info[i].value
    }
    if(info[i].name === 'title'){
      content.title = info[i].value
    }
    if(info[i].name === 'description'){
      content.description = info[i].value
    }
  }
  updateSheet(content)
}

function updateSheet(values){  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var sheetData = sheet.getDataRange().getValues();
  var headerNames = sheetData[0]
  
  for(var i = 0; i<headerNames.length; i++){
    sheet.getRange(parseInt(values.id)+1,i+1,1,1).setValue( values[headerNames[i]] )
  }

}
