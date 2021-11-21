var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var medalsRouter = require('./routes/medalsRoute');
var citiesRouter = require('./routes/citiesRoute');
var usersRouter = require('./routes/usersRoute');
var uFriendsRouter = require('./routes/uFriendsRoute');
var fieldsRouter = require('./routes/fieldsRouter');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/medals', medalsRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/users', usersRouter);
app.use('/api/usersFriends', uFriendsRouter);
app.use('/api/fields', fieldsRouter);

module.exports = app;
