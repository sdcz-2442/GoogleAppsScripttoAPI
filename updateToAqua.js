function updateToAqua() {
  
  var url = ""; //URL API
  
  //get info from the last form submitted
  var formResponses = FormApp.getActiveForm().getResponses();
  var formResponse = formResponses[formResponses.length-1];
  var itemResponses = formResponse.getItemResponses();

  var arrayTitles = [];
  var arrayAnswers = [];
  var datos = {}

  //save info in arrays
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    arrayTitles[i] = itemResponse.getItem().getTitle();
    arrayAnswers[i] = JSON.stringify(itemResponse.getResponse());
  }
  var clientNum = formResponses.length+1; //here we store the number of the last form submitted

  //in this case we save the variables hardcoded because the order in the array is different than the one needed on the JSON format 
  //we use a conditional because in this particular case a Y/N answer changes the order of the variables stored in the arrays
  //this step is completely made for the case I was working on so if you only want to store the variables one could just 
  //made a loop to fill datos{} with arrayTitles and arrayAnswers

  if(arrayAnswers[13] != null && arrayAnswers[13].includes('')){ //defining the Y/N answer so we know which variables to store next
    //Caso corto 
    datos = {
    "ReceiveTempCustomer": arrayAnswers[0],
    "NIF": arrayAnswers[8], 
    "Name":arrayAnswers[0], 
    "CommercialName":arrayAnswers[1], 
    "Address":arrayAnswers[2], 
    "CIPCode":arrayAnswers[3],
    "CIF":arrayAnswers[9], 
    "City":arrayAnswers[4],
    "Province":arrayAnswers[5],
    "Country":arrayAnswers[6],
    "GroupVat":arrayAnswers[10], 
    "PaymentType" : arrayAnswers[11], 
    "CorporateWeb" : arrayAnswers[12],
    "NumSocio" : clientNum,
    "DeliveryAddress" : arrayAnswers[2],
    "DeliveryCIPCode" : arrayAnswers[3], 
    "DeliveryCity" : arrayAnswers[4],
    "DeliveryProvince":arrayAnswers[5],
    "ContactPersonC" : arrayAnswers[20], 
    "ContactEmailC" : arrayAnswers[21], 
    "ContactPhoneC" : arrayAnswers[22], 
    "ContactPersonT" : arrayAnswers[23], 
    "ContactEmailT" : arrayAnswers[24],
    "ContactPhoneT" : arrayAnswers[25], 
    "ContactPhoneL" : arrayAnswers[17], 
    "ContactEmailL" : arrayAnswers[18], 
    "ContactPersonL" : arrayAnswers[19], 
    "ContactPhoneF" : arrayAnswers[14], 
    "ContactEmailF" : arrayAnswers[15], 
    "ContactPersonF" : arrayAnswers[16]
    };
  } else {
    //Caso largo
    datos = {
    "ReceiveTempCustomer": arrayAnswers[0],
    "NIF": arrayAnswers[8], 
    "Name":arrayAnswers[0], 
    "CommercialName":arrayAnswers[1], 
    "Address":arrayAnswers[2], 
    "CIPCode":arrayAnswers[3],
    "CIF":arrayAnswers[9], 
    "City":arrayAnswers[4],
    "Province":arrayAnswers[5],
    "Country":arrayAnswers[6],
    "GroupVat":arrayAnswers[10], 
    "PaymentType" : arrayAnswers[11], 
    "CorporateWeb" : arrayAnswers[12],
    "NumSocio" : clientNum,
    "DeliveryAddress" : arrayAnswers[14],
    "DeliveryCIPCode" : arrayAnswers[15], 
    "DeliveryCity" : arrayAnswers[16],
    "DeliveryProvince":arrayAnswers[17],
    "ContactPersonC" : arrayAnswers[20], 
    "ContactEmailC" : arrayAnswers[21], 
    "ContactPhoneC" : arrayAnswers[22], 
    "ContactPersonT" : arrayAnswers[23], 
    "ContactEmailT" : arrayAnswers[24],
    "ContactPhoneT" : arrayAnswers[25], 
    "ContactPhoneL" : arrayAnswers[17], 
    "ContactEmailL" : arrayAnswers[18], 
    "ContactPersonL" : arrayAnswers[19], 
    "ContactPhoneF" : arrayAnswers[14], 
    "ContactEmailF" : arrayAnswers[15], 
    "ContactPersonF" : arrayAnswers[16]
    };
  }
  
  //Set API parameters 
  var APIparameters = JSON.stringify({ 
  InstanceId: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', 
  SkillId: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
  Password: 'XXXXXXXXXXXXXXXXXXXXX',
  Parameters:[{
    Name: "Json",
    Type: 0,
    Value: `${JSON.stringify(datos)}`
  }]
   });

var options = {
  method: 'POST',
  contentType: 'application/json; charset=utf-8',
  validateHttpsCertificates: false,
  payload: APIparameters
};

//If API call is ok we should recieve 200 response
var response = UrlFetchApp.fetch(url, options);
Logger.log(response.getResponseCode());
}