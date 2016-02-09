var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib')
var errorhandler = require('errorhandler')
// New Code
var mongo = require('mongodb');
var monk = require('monk');
//mongoose establishing connection
var mongoose = require('mongoose');
var db = mongoose.connection;
var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
  mongoose.connect('mongodb://localhost/wheredoiapply');
}

/*university.find(function(err, universities) {
  if (err) return console.error(err);
  for (var uni in universities){
    console.log(universities[uni].name);
  };
});*/
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
