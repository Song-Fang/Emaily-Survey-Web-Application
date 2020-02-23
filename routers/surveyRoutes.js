const requireLogin = require('../middleware/requireLogin.js');
const requireCredits = require('../middleware/requireCredits.js');
const mongoose = require('mongoose');
const Surveys = mongoose.model('surveys');
const Mailer = require('../service/Mailer.js');
const surveyTemplate = require('../service/template/emailTemplate');
const _=require('lodash');
const {Path} = require('path-parser');
const {URL} = require('url');

module.exports=app=>{

  app.get('/api/surveys',requireLogin,async (req,res)=>{
    const surveys = await Surveys.find({_user:req.user.id}).select({
      recipients:false
    });
    res.send(surveys);
  });

  app.get('/api/:surveyId/:choice',(req,res)=>{
    res.send("Thanks for commenting!");
  });

  app.post('/api/surveys/webhook',(req,res)=>{
  _.chain(req.body).map(({email,url})=>{
      const pathname = new URL(url).pathname;
      const p = new Path('/api/:surveyId/:choice');
      const match = p.test(pathname);
      if(match){
        return {email,surveyId:match.surveyId,choice:match.choice};
      }
    }).compact().uniqBy('email','url').each(({email,surveyId,choice})=>{
      Surveys.updateOne({_id:surveyId,recipients:{$elemMatch:{email:email,responded:false}}},
        {
          $inc:{[choice]:1},
          $set:{'recipients.$.responded':true},
          dateResponded:new Date()
        }
      ).exec();
    }).value();

    res.send({});
  });

  app.post('/api/surveys',requireLogin,requireCredits, async (req,res)=>{
    const {title,subject,body,recipients} = req.body;
    const surveys = new Surveys({
      title,
      subject,
      body,
      recipients:recipients.split(',').map(email=>({email})),
      _user:req.user.id,
      dateSent:Date.now()
    });

    const mailer = new Mailer(surveys,surveyTemplate(surveys));

    try{
      await mailer.send();
      await surveys.save();
      req.user.credits-=1;
      console.log(req.user.credits);
      const user = await req.user.save();
      res.send(user);
  }catch(err){
    res.status(422).send(err);
  }
  });

}
