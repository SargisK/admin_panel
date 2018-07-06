exports.post = function(req, res, next) {
  if (req.session.user) {
    req.session.destroy((err)=>{
      if (err) next(err);
     
    }) 
    res.status(403).end();
  } 
}