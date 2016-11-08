var app = require('express')();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var models = require('./models');

var users = require('./routes/users');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use('/users', users);

models.sequelize.sync().then(function () {
  app.listen('8080');
});

module.exports = app;
