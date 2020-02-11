const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  //the type of the data
  googleId:String,
  //object
  credits: {type:Number,default:0}
});

mongoose.model('users',userSchema);
