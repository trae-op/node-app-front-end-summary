
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
      subject: config.get('messages.email_messages.subject'),
      html: 'You need to click by this <a href="' + user.url + '#/account_activation">link</a> for your activation.'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        reject(Boom.badRequest(config.get('messages.email_messages.not_sent')));
      } else {
        console.log(config.get('messages.email_messages.sent'));
        resolve(info);
      }
    });
  });
}


module.exports = sendEmail;