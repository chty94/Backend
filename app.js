var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mysqlRouter = require('./routes/mysql');
var findRouter = require('./routes/find');
var franchiseRouter = require('./routes/franchise');
var cardRouter = require('./routes/card');
var accommodationRouter = require('./routes/accommodation');
var showstoreRouter = require('./routes/showstore');
var commuicationRouter = require('./routes/communication');
var storeRouter = require('./routes/store')
var informationRouter = require('./routes/infocommunication')
var hotrankRouter = require('./routes/hotrank')


var app = express();
var cors = require('cors');
const { showstore } = require('./config/database');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mysql', mysqlRouter);
app.use('/find', findRouter);
app.use('/franchise', franchiseRouter);
app.use('/card', cardRouter);
app.use('/accommodation', accommodationRouter);
app.use('/communication', commuicationRouter);
app.use('/showstore', showstoreRouter);
app.use('/store', storeRouter);
app.use('/infocommunication', informationRouter);
app.use('/hotrank', hotrankRouter);


app.use(cors());

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
