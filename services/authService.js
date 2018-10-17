var User = require('../models/users');
//generate password
//var generator = require('generate-password');
//passport 
var passport = require('passport');

//create contact
exports.signup = function ( userData, callback ) {
  // get the form data
  console.log(userData);
  
  // 3. Construct our own query to save a new User
  var userDao = new User(userData);
  
  //generate temp password 
  // var _tempPassword = generator.generate({
  //                                         length: 14,
  //                                         numbers: true
  //                                       });
  userDao.setPassword(userData.password); //to create salt and hash for the p/w
  //delete userDao["password"]; //in case if you make the schema as non-strict

  console.log(userDao);

  userDao.save(function(err, savedUser){
    // 4.After Saving the records, send email with a temp password or else with a link to verify email
    // But, we are not sending email, instead let's show to password to the user. 
      if (!err) {
          console.log(`User registered successfully with userId:${savedUser.userId}`);
      }
      //  5. Channelise it to the router
      delete savedUser._doc.salt;
      delete savedUser._doc.hash;
      callback(err, savedUser);
  })  
}

//login flow
exports.login = function(req, callback){
  
  console.log(req);
  //auth flow with passport
  passport.authenticate('local', function(err, user, info){
    // If Passport throws/catches an error
    if (err) {
      callback(err);
    }

    // If a user is found
    if(user){      
      var userData = {  
                        email : user.email, 
                        name: user.name,
                        phone: user.phone,
                        createdBy: user.createdBy,
                        createdOn: user.createdOn,
                        updatedBy: user.updatedBy,
                        updatedOn: user.updatedOn,
                        token: user.generateJWT()
                     }
      callback(err, userData);
    } else {
      // If user is not found
      //res.status(401).json(info);
    callback(err, info);
    }
  })(req, callback);
}
