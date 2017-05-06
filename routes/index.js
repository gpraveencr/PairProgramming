var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Programming made easy'
 });
});

router.get('/about', function(req, res, next) {
  res.render('about', {title : 'PairProgramming: Programming made easy'});
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', {title : 'PairProgramming: Programming made easy'});
  })
  .post(function(req, res, next) {

    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('message', 'Empty Message').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
      res.render('contact', {
        title : 'PairProgramming: Programming made easy',
        name : req.body.name,
        email : req.body.email,
        message : req.body.message,
        errorMessages : errors
      });
    }
    else {

      var mailOptions = {
        from : 'noreply@gmail.com',
        to : 'bluemix1729@gmail.com',
        subject : 'You got a new message from PairProgramming 👍',
        text : req.body.message
      }

      transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
          console.log(error);
        }
        res.render('thanks', {title : 'PairProgramming: Programming made easy'});
      });
    }
  });

module.exports = router;
