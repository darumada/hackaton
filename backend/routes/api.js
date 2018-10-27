var express = require('express');
var router = express.Router();
var config = require('config').get('development');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

var ensureToken = require('../utils/token');

router.param('id', function(req, res, next, id) {
  req.id = id;
  next();
});

router.post('/users', function(req, res, next) {
  var user = new User();
  user.iin = req.body.iin;
  user.fio = req.body.fio;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user
    .save()
    .then(function() {
      return res.json({ user: user.toAuthJSON() });
    })
    .catch(next);
});

router.post('/users/login', function(req, res, next) {
  if (!req.body.iin) {
    return res.status(422).json({ errors: { iin: "can't be blank" } });
  }

  if (!req.body.password) {
    return res.status(422).json({ errors: { password: "can't be blank" } });
  }

  passport.authenticate('local', { session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/projects', function(req, res) {
  Project.find().then(projects => {
    res.json({ projects });
  });
});

router.get('/project/:id', function(req, res) {
  Project.findById(ObjectId(req.id), (err, project) => {
    if (err) {
      res.sendStatus(404);
    }
    console.log(project);
    if (project) {
      console.log(project);
      res.json({ project });
    } else {
      res.sendStatus(404);
    }
  });
});

router.post('/comment/:id', ensureToken, function(req, res) {
  Project.findById(req.id, (err, project) => {
    if (err) {
      res.sendStatus(404);
    }
    if (project) {
      User.findById(req.token.id, (err, user) => {
        var comment = {
          fio: user.fio,
          userId: user._id,
          comment: req.body.comment,
          star: req.body.star
        };
        project.comments.push(comment);
        return project.save().then(function() {
          return res.json({ comment });
        });
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
