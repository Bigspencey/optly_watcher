var express = require('express');
var router = express.Router();
var controller = require('../controllers/execute.js');

var isAuthenticated = function(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

module.exports = function(passport){

	/* GET Home Page. */
	router.get('/', function(req, res) {
	  res.render('index', { title: 'Optly_Watcher', message: req.flash('message') });
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
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user : req.user });
	});

	/* GET Execute - Kicks off polling */
	router.get('/home/success', function(req, res){
		controller.execute();
		res.render('home', {message: req.flash('message')}); // Need to potentially review this
	});

	return router;
}
