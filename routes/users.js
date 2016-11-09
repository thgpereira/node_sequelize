var express = require('express');
var router = express.Router();
var userutils = require('../utils/userutils');
var models = require('../models');
var patternUrl = 'sec/user';

router.get('/new', function (req, res) {
  res.render(patternUrl + '/usersinput', {
    user: {},
    title: 'Cadastro de usuário',
    method: ''
  });
});

router.route('/')
  .get(function (req, res) {
    models.User.findAll().then(function (users) {
      res.render(patternUrl + '/userslist', {
        users: users,
        title: 'Lista de usuários'
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });
  })
  .post(function (req, res) {
    models.User.create({
      name: req.body.name,
      username: req.body.username,
      password: userutils.cryptoPassword(req.body.password),
      active: req.body.active
    }).then(function (newUser) {
      res.redirect('/' + patternUrl);
    }).catch(function (error) {
      res.status(500).json(error);
    });
  })
  .put(function (req, res) {
    models.User.update({
      name: req.body.name,
      username: req.body.username,
      active: req.body.active
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (newUser) {
        res.redirect('/' + patternUrl);
      }).catch(function (error) {
        res.status(500).json(error);
      });
  });

router.route('/:id')
  .get(function (req, res) {
    models.User.findById(req.params.id).then(function (user) {
      res.render(patternUrl + '/usersinput', {
        user: user,
        title: 'Edição de usuário',
        method: '?_method=PUT'
      });
    }).catch(function (error) {
      res.status(500).json(error);
    });
  })
  .delete(function (req, res) {
    models.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.redirect('/' + patternUrl);
    });
  });

module.exports = router;