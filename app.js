var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
//var session = require('express-session');
//var session = require('cookie-session');
var rootRouter = require('./routes/super-admin')
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var flash = require('connect-flash');
var hbs = require('hbs');
var cors = require('cors');


var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/images')));

app.use(cors());

app.use( session( {
  secret: 'password',
  name : 'CookieFN',
  resave : true,
  saveUninitialized : true
  
  
}));
app.use(function(req, res, next){
  res.locals.session = req.session;
  
  next();
});



app.use(flash());

app.use('/',indexRouter);
app.use('/admin', adminRouter);
app.use('/super-admin', rootRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
