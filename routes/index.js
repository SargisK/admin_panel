module.exports = function(app) {

  app.get('/users', require('./users').get);
  app.get('/checkUser', require('./checkUser').get);
  app.post('/registration', require('./registration').post);
  app.post('/userdelete', require('./userDelete').post);
  app.post('/authorization', require('./authorization').post);
  app.post('/userUpdate', require('./userUpdate').post);
  app.post('/logout', require('./logout').post);
 
}