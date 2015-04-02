var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

// Look at this later per Brad's instructions
//var env = require('NODE_ENV' + process.env.NODE_ENV);

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

var configuration = require('./config/config.js');

// Mongoose Database Connection
var Mongoose = require('mongoose');
Mongoose.connect('mongodb://' + configuration.UserName + ':' + configuration.PassWord + '@localhost:27017/optly_watcher_db');

var app = express();

// Swig view engine setup
var swig = require('swig');
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

// Allows Express to cache templates following initial page load
app.set('view cache', true);

swig.setDefaults({ cache : false });

// Connect Flash Initialization
var flash = require('connect-flash');
app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// This is apparently deprecated...take a look at it later
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Initializing Passport
var initPassport = require('./passport/init'); 
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

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
