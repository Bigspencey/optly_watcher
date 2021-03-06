var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('signup', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {

      findOrCreateUser = function(){

        // find a user in Mongo with provided username
        User.findOne({'username':username},function(err, user) {

          // In case of any error return
          if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists
          if (user) {
            return done(null, false,
               req.flash('message','User Already Exists'));
          } else {
            // if there is no user with that username
            // create the user
            console.log("newUser creation");
            var newUser = new User();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.api_key = req.body.api_key
   
            // save the user
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+err);  
                throw err;  
              }
              console.log('User Registration successful');    
              return done(null, newUser);
            });
          }
        });
      };
       
      // Delay the execution of findOrCreateUser and execute 
      // the method in the next tick of the event loop
      console.log('works')
      process.nextTick(findOrCreateUser);
    })
  );

  // Generates hash using bCrypt
  var createHash = function(string){
   return bCrypt.hashSync(string, bCrypt.genSaltSync(10), null);
  }

}