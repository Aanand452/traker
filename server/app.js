const express = require('express');
const http = require('http');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorhandler = require('errorhandler');

var env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

console.log('Using configuration: ', config);

require('./config/passport')(passport, config);

var app = express();

app.get('/', function (req, res) {
  res.redirect('/home');
});

app.set('port', config.app.port);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'this secret hits'
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, 'static')));

require('./config/routes')(app, config, passport);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
