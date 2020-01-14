const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user,done)=>{
  done(null,user.id);
}
);

passport.deserializeUser((id,done)=>{
  User.findById(id).then(user=>{
    done(null,user);
  });
});

//1037395709620-rim9trp69vc9v2jjv7siccc9sofgjn37.apps.googleusercontent.com
//0kZUm_tHXIe4udpkvOMSQrJJ

passport.use(new GoogleStrategy({
  clientID:keys.googleClientID,
  clientSecret:keys.googleClientSecret,
  callbackURL:'/auth/google/callback',
  proxy:true
},
async (accessToken,refreshToken,profile,done)=>{

  const existingUser = await User.findOne({googleId:profile.id});
    if(existingUser){
    //  We already have users stored in our database
    return done(null,existingUser);
    }

    // Create new users
    const user = await new User({
        googleId:profile.id
      }).save();
    done(null,user);
    }
));
