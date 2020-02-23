//use require key words to access the express library
//one kind of import syntax
//common js module at server side
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

//import passport js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// //tell passport to use googleStategy
// passport.use(new GoogleStrategy());
//generate a new application
const app = express();
require('./model/User');
require('./model/Surveys');
require('./service/passport.js');
const authRouters = require('./routers/authRoutes.js');
const billRouters = require('./routers/billRouters.js');
const surveyRoutes = require('./routers/surveyRoutes.js');
mongoose.connect(keys.mongoURI);
//router
//create a brand new router handler


//middleware
app.use(bodyParser.json());

//middleware
app.use(
  cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKeys]
  })
);

//middleware
app.use(passport.initialize());

//middleware
app.use(passport.session());

authRouters(app);
billRouters(app);
surveyRoutes(app);


if(process.env.NODE_ENV==='prodution'){

  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

//express telling node to listen on port 5000
//environment variables defined by heroku
const PORT = process.env.PORT||5000;
app.listen(PORT);

//localhost:5000
