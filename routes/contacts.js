var express = require('express');
var contactService = require('../services/contactsService');
var router = express.Router();

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  //send a req to get the data from db  --- service: db queries 
          //receive the resp 
          //send it back to routes
  //routes will receive the resp and send it back as output 
  res.send(
    [{
      "id": 1,
      "name": "Perceval",
      "phone": "374-328-0774",
      "email": "pbartolomeoni0@omniture.com"
    }, {
      "id": 2,
      "name": "Jess",
      "phone": "105-148-4832",
      "email": "jtowey1@wp.com"
    }]
  );
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

// GET contactByContactId
router.get('/:contactId', function(req, res, next) {
  console.log(req.params);
  //send the contactId to db to get only one specific rec
  //get resp and send it back 
  res.send(
    {
      "id": 1,
      "name": "Perceval",
      "phone": "374-328-0774",
      "email": "pbartolomeoni0@omniture.com"
    }
  );
});

//PUT will come

//DELETE will come 

module.exports = router;
