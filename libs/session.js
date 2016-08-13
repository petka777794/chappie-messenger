var mongoose = require('./mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports =  session({
  secret: 'I\'m your master!',
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: null,
    httpOnly: true,
    path: '/'
  },
  store: new MongoStore({mongooseConnection: mongoose.connection})
})