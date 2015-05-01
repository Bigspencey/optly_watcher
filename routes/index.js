var express = require('express');
var router = express.Router();
var optimizelyApi = require('../models/optimizely_api.js');
var User = require('../models/user');
var _  = require('underscore');

var isAuthenticated = function(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = function(passport){

	/* GET Index Page. */
	router.get('/', function(req, res) {
	  res.render('index', { title: 'Optimizely Notifications', message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register', {message: req.flash('message')});
	});

	/* Handle Registraion POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	/* Handle Logout */
	router.get('/signout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	/* GET Home Page - Handle Unauthenticated Users */
	router.get('/home', isAuthenticated, function(req, res, next){
		optimizelyApi(req, function(results){
			res.render('home', { user : req.user, projects : results });
		});
	});

	/* POST Home Page */
	router.post('/home', function(req, res){
		User.update({ username: req.user._doc.username }, {
			project_ids : req.body.project
		}, function(err){
			if(err){
				console.log("error");
			}
		});
		req.flash('message', "You're now registered to receive email notifications!");
		res.render('home', {complete: req.flash('message')});
	});

	return router;
}
