var mongoose = require('./mongo'); //importing connection config
var autoIncrement = require('mongoose-auto-increment'); //for auto incrementing during create
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

//schema  for collection User -- for authentication using passport and jsonwebtokens
var User = new Schema(
  {
    userId: {
      type: Number,
      unique: true
    },
    email: String,
    name: String,
    phone: Number,
    salt: String,   
    hash: String,   
    status: String,
    isTempPassword: Boolean,
    createdBy : String,
    createdOn : {type: Date, default: Date.now},
    updatedBy : String,
    updatedOn : {type: Date, default: Date.now}
  },
  { strict: true }
);

//util method to set salt and hash for the entered password
User.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

User.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

User.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}


User.plugin(autoIncrement.plugin, {model: 'User', field: 'userId', startAt: 1});
module.exports = mongoose.model('User', User);