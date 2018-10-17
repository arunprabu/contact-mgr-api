var express = require('express');
var authService = require('../services/authService');
var router = express.Router();

//POST register user
router.post('/signup', function(req, res, next) {
  console.log(req.body);
  authService.signup(req.body, function(err, status){
    if(!err){
      res.json(status);
    }else{
      res.json(err);
    }
 });
});

/* Post login . */
router.post('/login', function(req, res, next) {
  //1. connect to service 
  console.log(req.body);
  authService.login(req, function(err, status){
    console.log(status);
    res.json(status);
  });
});



module.exports = router;
