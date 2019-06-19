//use require key words to access the express library
//one kind of import syntax
//common js module at server side
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
const cookieSession = require('cookie-session');

//import passport js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// //tell passport to use googleStategy
// passport.use(new GoogleStrategy());
//generate a new application
const app = express();
require('./model/User');
require('./service/passport.js');
const authRouters = require('./routers/authRoutes.js');
mongoose.connect(keys.mongoURI);
//router
//create a brand new router handler
app.use(
  cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKeys]
  })
);

app.use(passport.initialize());

app.use(passport.session());

authRouters(app);
app.get('/',(req,res)=>{
  //error function
  res.send({'hi':'new World'});
});

//express telling node to listen on port 5000
const PORT = process.env.PORT||5000
app.listen(PORT);

//localhost:5000
