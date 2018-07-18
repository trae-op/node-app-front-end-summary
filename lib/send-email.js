
'use strict';

var config = require('config');
var nodemailer = require('nodemailer');
var Promise = require('bluebird');
var Boom = require('boom');

function sendEmail(user) {
  return new Promise(function (resolve, reject) {
    var transporter = nodemailer.createTransport({
      service: config.get('service_email.service'),
      auth: {
        user: config.get('service_email.user'),
        pass: config.get('service_email.pass')
      }
    });

    var mailOptions = {
      from: config.get('service_email.user'),
      to: user.email,
      subject: 'IT-Summary: Account verification ',
      html: 'You need to click by this <a href="' + user.url + '#/activation/' + user.hash + '">link</a> for your activation.'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(Boom.badRequest('The message to activate account wasn\'t send :(('));
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });
}


module.exports = sendEmail;