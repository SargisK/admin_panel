const User = require('../models/users').User;
const HttpError = require('../error/index.js');

exports.get = function (req, res, next) {

  User.find({}, (err, users) => {
    if (err)  return next(err)
    if(!users) next(new HttpError(404, 'not found'))
    else res.json(users);
  });
}  


  