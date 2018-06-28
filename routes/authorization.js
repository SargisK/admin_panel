const User = require('../models/users.js').User;
const RegAuthError = require('../models/users.js').RegAuthError;
const HttpError = require('../error/index.js');

exports.post = function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  User.authorize(email, password, function(err, user){
    console.log(req.email)
    if (err) {
      if (err instanceof RegAuthError) {
        console.log('auth')
        return next(new HttpError('403', err.message))
      } else {
        return next(err);
      }
    }
    req.session.user = user._id;
    res.status(200).send({user});
  }) 

}