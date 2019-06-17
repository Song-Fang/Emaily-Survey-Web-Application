//use require key words to access the express library
//one kind of import syntax
//common js module at server side
const express = require("express");
//import passport js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// //tell passport to use googleStategy
// passport.use(new GoogleStrategy());
//generate a new application
const app = express();
//router
//create a brand new router handler
app.get('/',(req,res)=>{
  //error function
  res.send({'hi':'new World'});
});

//express telling node to listen on port 5000
const PORT = process.env.PORT||5000
app.listen(PORT);

//localhost:5000
