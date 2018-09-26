//// 2. Establish handshake with DB (from services)
var Contact = require('../models/contacts');

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


