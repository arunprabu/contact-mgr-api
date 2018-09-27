var mongoose = require('./mongo'); //importing connection config
var autoIncrement = require('mongoose-auto-increment'); //for auto incrementing during create

var Schema = mongoose.Schema;

//schema  for collection Contact
var Contact = new Schema(
  {
    contactId: {
      type: Number,
      unique: true
    },
    name: String,
    phone: Number,
    email: String,
    status: String,
    createdBy : String,
    createdOn : {type: Date, default: Date.now},
    updatedBy : String,
    updatedOn : {type: Date, default: Date.now},
  },
  { strict: false }
);

Contact.plugin(autoIncrement.plugin, {model: 'Contact', field: 'contactId', startAt: 1});
module.exports = mongoose.model('Contact', Contact);