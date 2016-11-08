var express = require('express');
var router = express.Router();
var userutils = require('../utils/userutils');
var models = require('../models');

router.get('/', function (req, res) {
  models.User.findAll().then(function (users) {
    res.render('user/userslist', {
      users: users
    });
  }).catch(function (error) {
    res.status(500).json(error);
  });
});

router.get('/new', function (req, res) {
  res.render('user/usersinput', {
    user: {}
  });
});

router.get('/:id', function (req, res) {
  models.User.findById(req.params.id).then(function (user) {
    res.render('user/usersinput', {
      user: user
    });
  }).catch(function (error) {
    res.status(500).json(error);
  });
});

router.delete('/', function (req, res) {
  models.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function () {
    res.redirect('/users');
  });
});

router.post('/', function (req, res) {
  models.User.create({
    name: req.body.name,
    username: req.body.username,
    password: userutils.cryptoPassword(req.body.password),
    active: req.body.active
  }).then(function (newUser) {
    res.redirect('/users');
  }).catch(function (error) {
    res.status(500).json(error);
  });
});

router.put('/', function (req, res) {
  models.User.update({
    name: req.body.name,
    username: req.body.username,
    active: req.body.active
  }, {
      where: {
        id: req.body.id
      }
    }).then(function (newUser) {
      res.redirect('/users');
    }).catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = router;