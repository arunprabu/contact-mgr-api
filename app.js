var createError = require('http-errors');   
var express = require('express'); // importing express module
var path = require('path');  //
var cookieParser = require('cookie-parser');  
var logger = require('morgan');  
var session = require('express-session');
var passport = require('passport');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var contactsRouter = require('./routes/contacts');
var reportsRouter = require('./routes/reports');

require('./models/users');
require('./config/passport');

var app = express();   //express app

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(passport.initialize());
app.use(passport.session())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // referring to public folder

app.use(session({
  secret: 'thesecret',
  saveUninitialized: false,
  resave: false
}))

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});


//Allow Cross Domain -- Refer : https://enable-cors.org/server_expressjs.html
//Allow certain http methods: https://stackoverflow.com/questions/42463499/node-allow-cors-for-put
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//api url
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/reports', reportsRouter);

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
