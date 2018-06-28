const User = require('../models/users.js').User;

exports.post = function(req, res, next) {
  
  User.findOne({email: req.body.email}, function(err, user){
      
     if (err) return next(err)

     if (user === null) {
       let user = new User(req.body)

       user.save(function(err, user){
        if (err) return next(err)
        req.session.user = user._id;
        console.log('ok');
        res.status(200);
        res.send({user})
       })
     } else res.status(200).send({errors : 'e-mail is busy!'})
     
  })
  
}