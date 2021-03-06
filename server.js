var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'), 
  User = require ('./models/user');

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect('mongodb://localhost/simple-login');

app.post('/users', function (req, res) {
 // use the email and password to authenticate here
  User.createSecure(req.body.email, req.body.password, function (err, user) {
    res.json(user);
  });
});

// authenticate the user and set the session
app.post('/sessions', function (req, res) {
  // call authenticate function to check if password user entered is correct
  User.authenticate(req.body.email, req.body.password, function (err, loggedInUser) {
    if (err){
      console.log('authentication error: ', err);
      res.status(500).send();
    } else {
      console.log('setting sesstion user id ', loggedInUser._id);
      req.session.userId = loggedInUser._id;
      res.redirect('/profile');
    }
  });
});

// signup route with placeholder response
app.get('/signup', function (req, res) {
  res.render('signup');
});

// login route with placeholder response
app.get('/login', function (req, res) {
  res.render('login');
});

// listen on port 3000
app.listen(3000, function () {
  console.log('server started on locahost:3000');
});