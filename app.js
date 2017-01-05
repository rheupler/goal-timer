// require and instantiate express
var express = require('express');
var app = express();
var path = require('path');

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

// Database Configuration 
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

// tell Express to serve files from our public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  // route to serve up the homepage (index.html)
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/signup', function (req, res, next) {
    var user = {
       Name: req.body.name,
       Email: req.body.email,
       Pass: req.body.pass,
       Num: req.body.num
   };
   var UserReg = mongoose.model('UserReg', RegSchema);
   UserReg.create(user, function(err, newUser) {
      if(err) return next(err);
      req.session.user = email;
      return res.send('Logged In!');
   });
});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
