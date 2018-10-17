var express = require('express');
var contactService = require('../services/contactsService');
var authUtil = require('./util/authUtil');
var router = express.Router();

/* GET contacts listing. */

router.get('/',  authUtil.optional, function(req, res, next) {
  //1. connect to service 
  contactService.getContacts(function(err, contactList){
     //4. send the res to client  
     if(!err){
       res.json(contactList);
     }else{
       res.json(err);
     }
  });

  // connecting to other third party api 
  

});

//POST contact creation
router.post('/', function(req, res, next) {
  console.log(req.body);
  //1. send the form data to service
  contactService.createContact(req.body, function(err, savedContact){
    console.log(savedContact);
    //Step 6: send the response back to the front end 
    if (!err) {
      res.json(savedContact);
    } else {
      res.json(err);
    }
  })
  
});


router.get('/test', authUtil.required, function(req, res, next){
  //try calling third party service from here
  //
  
  res.json({ 
    message: "When the URL is with /test Success"
  });
});

// GET contactByContactId
router.get('/:contactId', function(req, res, next) {
  console.log(req.params);
  contactService.getContactById(req.params.contactId, function(err, contactObj){
    if(!err){
      res.json(contactObj);
    }else{
      res.json(err);
    }
  });
});

//PUT will come
router.put('/:contactId', function(req, res, next){
  contactService.updateContactById(req.params.contactId, req.body, function(err, status){
    if(!err){
      res.json(status);
    }else{
      res.json(err);
    }
  })
});

//DELETE will come 
router.delete('/:contactId', function(req, res, next) {
  //1. call the service 
  contactService.deleteContactById(req.params.contactId, function(err, status){
    if(!err){
      res.json(status);
    }else{
      res.json(err);
    }
  })
});

module.exports = router;
