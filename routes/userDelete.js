const User = require('../models/users.js').User;

exports.post = function(req, res, next) {
console.log(req.body.id)
  User.findById(req.body.id, function(err, user){
    if (err) throw err
    user.remove()
    res.end('ok')
  })
 
}