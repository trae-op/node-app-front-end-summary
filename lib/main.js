
var datetime = require('node-datetime');
var Promise = require('bluebird');
var Bcrypt = require('bcrypt');
var config = require('config');
var Boom = require('boom');

module.exports = {
    currentTime: function () {
        return datetime.create().format('d.m.Y');
    },
    checkPassword: function (password, doc) {
      return new Promise(function (resolve, reject) {
          Bcrypt.compare(password, doc.password).then(function(isValid) {
              if (!isValid) {
                  reject(Boom.badRequest(config.get('messages.password')));
              } else {
                  resolve(isValid);
              }
          });
      });
    },
    checkRole: function (newData) {
      return (newData.email === config.get('service_email.user')) ? 'Admin' : 'User';
    }
};