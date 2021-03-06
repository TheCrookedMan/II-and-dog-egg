var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var argv = process.argv.slice(2);
var apiRouter, templateRouter, errorRouter, pageRouter, swigFilter,systemConfig;

if ("dev" == argv) {
    apiRouter = require('./routes/api-router');
    templateRouter = require('./routes/temp-router');
    errorRouter = require('./routes/error-router');
    pageRouter = require('./routes/page-router');
    swigFilter = require('./routes/tools/filter');
    systemConfig = require('./routes/rest/config');
} else if ("server-dev" == argv) {
    apiRouter = require('./lib/api-router');
    templateRouter = require('./lib/temp-router');
    errorRouter = require('./lib/error-router');
    pageRouter = require('./lib/page-router');
    swigFilter = require('./lib/tools/filter');
    systemConfig = require('./lib/rest/config');
} else {
    apiRouter = require('./lib/api-router');
    templateRouter = require('./lib/temp-router');
    errorRouter = require('./lib/error-router');
    pageRouter = require('./lib/page-router');
    swigFilter = require('./lib/tools/filter');
    systemConfig = require('./lib/rest/config');
}
var app = express();
app.use(compression());

var swig = require('swig');
var _setting = {
    cache: false,
    locals: {
        now: function() {
            return new Date();
        }
    }
};
swigFilter(swig);
swig.setDefaults(_setting);
app.engine('html', swig.renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.set('appid', systemConfig.wechat.appId);
app.set('redirect_uri', systemConfig.wechat.redirect_uri);

app.use('/', apiRouter);
app.use('/', templateRouter);
app.use('/', pageRouter);
errorRouter(app);

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
