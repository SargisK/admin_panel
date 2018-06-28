const mongoose = require('../libs/mongoose.js');
const crypto = require('crypto');
const async = require('async');
var util = require('util');
var HttpError = require('../error');



const Schema = mongoose.Schema;

const schema = new Schema({

  firstName: {
    type: 'string',
    required: [true, 'firstName is required!']
  },
  lastName: {
    type: 'string',
    required: [true, 'lastName is required!']
  },
  hashedPassword: {
    type: 'string',
    required: true,
  },
  salt: {
    type: 'string',
    required: true  
  },
  email: {
    type: 'string',
    required: [true, 'Email is required'],
    unique: true,
    validate: [validateFunc, 'invlaid email!']
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
}

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
}

function validateFunc(email) {
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

schema.statics.authorize = function(email, password, callback) {
  User = this;

  async.waterfall([
    function(callback) {

      User.findOne({email: email}, function(err, user) {
        if (err) callback(err);
        callback(null, user);
      })
    },
    function(user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user); 
        } else callback(new RegAuthError('Wrong password or e-mail!'));
      } else {
        callback(new RegAuthError('Wrong password or e-mail!'));
      }
    } 
  ], callback)
}


function RegAuthError (message) {
  Error.apply(this, arguments)
  Error.captureStackTrace(this, RegAuthError);
  
  this.message = message;
}

util.inherits(RegAuthError, Error);
RegAuthError.prototype.name = 'RegAuthError';

exports.RegAuthError = RegAuthError;
exports.User = mongoose.model('User', schema);