module.exports = function(app) {

  app.get('/users', require('./users').get);
  app.post('/registration', require('./registration').post);
  app.post('/userdelete', require('./userDelete').post);
  app.post('/authorization', require('./authorization').post);
 
}