//You need to define {Url-To-Download-CSV-From}
//You need to define {UserName}
//You need to define {password}

function main() {
  uploadCsvFromRemoteServer();
}

function uploadCsvFromRemoteServer() {
  // URL of your CSV file
  var dataUrl = '{Url-To-Download-CSV-From}';
  
  // Fetch the file using given credentials
  var options = {
    method: 'get',
    headers: {
      'Authorization': 'Basic ' + Utilities.base64Encode("{UserName}:{password}")
    }
  };
  
  var response = UrlFetchApp.fetch(dataUrl, options);
  
  // If the CSV data is fetched successfully
  if (response.getResponseCode() === 200) {
    var csvData = response.getContentText();
    
    var csvLines = csvData.split('\n');
    var headers = csvLines[0].split(',');  // Assuming CSV uses ',' as delimiter
    
    var upload = AdsApp.bulkUploads().newCsvUpload(headers, {moneyInMicros: false});
    upload.forOfflineConversions();
    
    for (var i = 1; i < csvLines.length; i++) {
      var line = csvLines[i].split(',');
      var obj = {};
      for (var j = 0; j < headers.length && j < line.length; j++) {
        obj[headers[j]] = line[j];
      }
      upload.append(obj);
    }
    
    // Preview the upload
   // upload.preview();
      upload.apply();
  } else {
    Logger.log('Error fetching the CSV: ' + response.getResponseCode());
  }
}
