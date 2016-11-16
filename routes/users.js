var express = require('express');
var router = express.Router();
var userutils = require('../utils/userutils');
var models = require('../models');
var patternUrl = 'sec/user';

router.get('/new', function (req, res) {
  renderUserInput(res, {});
});

router.get('/:id', function (req, res) {
  models.User.findById(req.params.id).then(function (user) {
    renderUserInput(res, user);
  }).catch(function (error) {
    renderUserList(res, users, error);
  });
});

router.route('/')
  .get(function (req, res) {
    models.User.findAll().then(function (users) {
      renderUserList(res, users);
    }).catch(function (error) {
      renderUserList(res, users, error);
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
      renderUserInput(res, req.body, error);
    });
  })
  .put(function (req, res) {
    models.User.update({
      name: req.body.name,
      active: req.body.active
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (newUser) {
        res.redirect('/' + patternUrl);
      }).catch(function (error) {
        renderUserInput(res, req.body, error);
      });
  })
  .delete(function (req, res) {
    models.User.destroy({
      where: {
        id: req.body.id
      }
    }).then(function () {
      res.redirect('/' + patternUrl);
    }).catch(function (error) {
      renderUserList(res, users, error);
    });
  });

function renderUserList(res, users, error) {
  res.render(patternUrl + '/userslist', {
    users: users,
    title: 'Lista de usuários',
    add: patternUrl + '/new',
    errors: formatErros(error)
  });
}

function renderUserInput(res, user, error) {
  res.render(patternUrl + '/usersinput', {
    user: user,
    title: (user.id ? 'Edição de usuário' : 'Cadastro de usuário'),
    method: (user.id ? '?_method=PUT' : ''),
    errors: formatErros(error)
  });
}

function formatErros(error) {
  if (error) {
    return error.errors;
  }
}

module.exports = router;