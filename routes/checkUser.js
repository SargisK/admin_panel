const User = require('../models/users.js').User;
const mongoose = require('../libs/mongoose.js');

exports.get = function(req, res, next) {

    if (req.session.user) {
      User.findById(req.session.user, function(err, user){
        if (err) next(err)     
        res.status(200).send(user)     
      })
    } else {
      res.status(403).end();
    } 

}