var User = require('../models/users.js').User;

exports.post = function(req, res, next) {

  User.findById(req.body._id, function(err, user) {

    if (err) next(err);
    
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err) {
      if (err) next(err);   
    })
    res.status(200).send({});
  })

} 

