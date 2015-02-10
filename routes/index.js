var express = require('express');
var router = express.Router();

module.exports = function(passport){

	/* GET home page. */
	router.get('/', function(req, res) {
	  res.render('index', { title: 'Spencer' });
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

	return router;
}
