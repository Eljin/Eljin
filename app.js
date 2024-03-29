var express = require('express');
var http = require('http');
var path = require('path');

var MongoStore=require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
//var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.session({
    secret: settings.cookieSecret,
    key: settings.db,
    cookie: {maxAge: 1000 * 60 * 60 * 12},
    store:new MongoStore({db:settings.db})
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

routes(app);
//app.get('/', routes.index);
//app.get('/users', users.list);



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found '+req.url);
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
