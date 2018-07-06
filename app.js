const http = require('http');
const config = require('./config');
const log = require('./libs/log')(module);
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./error');
const mongoose = require('./libs/mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

http.createServer(app).listen(config.get('port'), () => {
  log.info(`listen port ${config.get('port')} `)
});

app.use(require('./middleware/sendHttpError'));

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

const MongoStore = require('connect-mongo')(session);
app.use(session({ 
  resave: false,
  saveUninitialized: false,
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'), 
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
 
require('./routes')(app);

app.use(function(err, req, res, next) {

  if (typeof err == 'number') {
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  }
  if (app.get('env') == 'development') {
    require('errorhandler')(err, req, res);
  } else {
    log.error(err);
    err = new HttpError(500);
    res.sendHttpError(err);
  }
});