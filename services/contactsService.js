//// 2. Establish handshake with DB (from services)
var Contact = require('../models/contacts');
var STATUS_CODES = require('../config/statutsCode');

//create contact
exports.createContact = function (contactDataToBeSaved, callback ) {
  // get the form data
  console.log(contactDataToBeSaved);

  // 3. Construct our own query to Create Contact
  var contactDao = new Contact(contactDataToBeSaved);
  contactDao.save(function(err, savedContact){
    // get the resp 
    // 4. Get status from Database
      if (!err) {
          console.log(`Contact registered successfully with contactId:${savedContact.contactId}`);
      }
      //  5. Channelise it to the router, // send it back
      callback(err, savedContact);
  })  
}

exports.getContacts = function(callback){
  //2. construct the query 
  Contact.find({}, function(err, contactList){
    if(!err){
      console.log(`Loaded contacts ${contactList.length}` );
    }
    
    //3. channelise the res to routes
    callback(err, contactList);
  });
}

exports.getContactById = function(_contactId, callback){
  console.log(_contactId);
  Contact.findOne({ contactId: parseInt(_contactId) }, function(err, contactObj){
    if(!err){
      console.log(`ContactById: ${contactObj.contactId} loaded successfully`);
    }
    callback(err, contactObj);
  });
}

//put
exports.updateContactById = function(_contactId, _updatableObj, callback){
  console.log(_contactId,  _updatableObj);
  Contact.updateOne({ contactId: parseInt(_contactId)}, _updatableObj, function(err, status) {
    var _statusMsg = {};
    if(!err){
      console.log(status);
      if(status && status.n === 1 && status.ok == 1){
        _statusMsg.message = STATUS_CODES.UPDATED_STATUS;
      }else{
        _statusMsg.message = STATUS_CODES.NOT_UPDATED_STATUS;
      }
    }
    callback(err, _statusMsg );
  });
}

//delete
exports.deleteContactById = function(_contactId, callback) {
  console.log(_contactId);
  Contact.deleteOne({ contactId: parseInt(_contactId) }, function(err, status) {
    var _statusMsg = {};
    if(!err){
      console.log(status);
      if(status && status.n === 1){
        _statusMsg.message = STATUS_CODES.DELETED_STATUS;
      }else{
        _statusMsg.message = STATUS_CODES.NOT_DELETED_STATUS;
      }
    }
    callback(err, _statusMsg );
  });
}


exports.getThirdPartyData = function(){
  // call third party api 
  //Example: send mail 
  //1. complete mailing configurations
  //2. what should be mailed, to whom
  //3. send mail ... have a callback registered.. wait for resp 
      //3.1 you should fire callback 
      //3.2 channelise it to the router
  

  //Example Calling Third party API URL 
  //1. http client  example: var request = require('request');
  //2. api url 
  //3. call the api url using http client 
    //3.1 listen to response 
    //3.2 channelise it to the router
    
}