var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var log = require('./libs/log')(module);

var config = require('./config');
var HttpError = require('./libs/httpError');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app config sets

app.set('env', config.get('env'));

// set PORT

var port = normalizePort(process.env.PORT || config.get('port'))
app.set('port', port);

function normalizePort(val) {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// set sessions
var session = require('./libs/session');
app.use(session);


app.use(express.static(path.join(__dirname, 'public')));

// middlewares
var routes = require('./routes/index');
var chat = require('./routes/chat');
var authentication = require('./routes/authentication');

app.use('/', routes);
app.use('/chat', chat);
app.use('/authentication', authentication);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var status = 404;
	var message = 'I have some troubles with looking for your request. I\'m so sorry =(';
	var err = new HttpError(status, message);
	next(err);
});



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		if(res.req.headers['x-requested-with'] == 'XMLHttpRequest'){
			log.info(res.req.headers['x-requested-with'])
			res.json(err);
		}  else{
			res.render('error', {
				message: err.message,
				error: err
			});
		}
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	if(res.req.headers['x-requested-with'] == 'XMLHttpRequest'){
		res.json(err);
	} else{
		res.render('error', {
			message: err.message,
			error: {
				status: err.status
			},
		});
	} 
});


module.exports = app;
