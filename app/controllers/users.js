'use strict';

var User = require('../models/user');

exports.authenticate = function(req, res){
  User.authenticate(req.body, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.redirect('/');
        });
      });
    }else{
      res.redirect('/login');
    }
  });
};

exports.client = function(req, res){
  User.findOne({email:req.params.email, isVisible:true}, function(err, client){
    if(client){
      res.render('users/client', {client:client});
    } else {
      res.redirect('/users');
    }
  });
};

exports.create = function(req, res){
  User.register(req.body, function(err, user){
    if(user){
      res.redirect('/');
    }else{
      res.redirect('/register');
    }
  });
};

exports.edit = function(req, res){
  res.render('users/edit');
};

exports.login = function(req, res){
  res.render('users/login');
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
};

exports.message = function(req, res){
  User.findById(req.params.userId, function(err, receiver){
    res.locals.user.send(receiver, req.body, function(){
      res.redirect('/users/' + receiver.email);
    });
  });
};

exports.new = function(req, res){
  res.render('users/new');
};

exports.show = function(req, res){
  res.render('users/show');
};

exports.update = function(req, res){
  res.locals.user.save(req.body, function(){
    res.redirect('/profile');
  });
};

exports.index = function(req, res){
  User.find({isVisible:true}, function(err, users){
    res.render('users/index', {users:users});
  });
};
