

'use strict';

var _ = require('lodash');
var config = require('config');
var Promise = require('bluebird');
var Bcrypt = require('bcrypt');
var Boom = require('boom');
var uuidv1 = require('uuid/v1');
var sendEmail = require('../lib/send-email');

var main = require('../lib/main');

function Users(mongoose, connection) {

    this.Schema = mongoose.Schema;

    this.UsersSchema = new this.Schema({
        name: String,
        email: String,
        password: String,
        created_at: String,
        role: String,
        url: String
    });

    this.model = connection.model('user', this.UsersSchema);
}

Users.prototype = {
    list : function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.find({}, function (err, doc) {
                if (err) {
                    reject(Boom.badRequest(config.get('messages.users.errors.list')));
                } else {
                    resolve(doc);
                }
            });
        });
    },
    getById : function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.findById(id, function (err, doc) {
                if (err) {
                    reject(Boom.badRequest(config.get('messages.users.errors.get_by_id')));
                } else {
                    resolve(doc);
                }
            });
        });
    },
    deleteById : function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.findByIdAndRemove(id, function (err, doc) {
                if (err) {
                    reject(Boom.badRequest(config.get('messages.users.errors.delete_by_id')));
                } else {
                    resolve(doc);
                }
            });
        });
    },
    findByEmail : function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.find({email: email}, function (err, doc) {

                if (err) {
                    return reject(Boom.badRequest(config.get('messages.users.errors.find_by_id')));
                } else {
                    if (doc.length) {
                        resolve(doc[0]);
                    } else {
                        reject(Boom.badRequest(config.get('messages.users.errors.not_exit_email')));
                    }
                }
            });
        });
    },
    add : function (body) {
        var _this = this;
        var newData = new this.model(body);
        return new Promise(function (resolve, reject) {

            _this.findByEmail(newData.email)
                .then(function () {
                    return reject(Boom.badRequest("This email \"" + newData.email + "\" is already existing!"));
                })
                .catch(function () {
                    newData.role = (newData.email === 'traeopwork@gmail.com') ? 'Admin' : 'User';
                    newData.created_at = main.currentTime();
                    Bcrypt.genSalt(10, function(err, salt) {
                        if (err) {
                            reject(Boom.badRequest(config.get('messages.users.errors.generating_of_password')));
                        }

                        Bcrypt.hash(body.password, salt, function(err, hash) {
                            newData.password = hash;
                            newData.save(function (err, doc) {
                                if (err) {
                                    reject(Boom.badRequest(config.get('messages.users.errors.add')));
                                } else {
                                    resolve(doc);
                                }
                            });
                        });
                    });
                });


        });
    },
    authorization: function (body) {
      var _this = this;
      var newData = new this.model(body);
      var temporaryDataUser = {};
      var uuid = uuidv1();
      return new Promise(function (resolve, reject) {

        _this.findByEmail(newData.email)
          .then(function () {
            return reject(Boom.badRequest("This email \"" + newData.email + "\" is already existing!"));
          })
          .catch(function () {

            Bcrypt.genSalt(10, function(err, salt) {
              if (err) {
                reject(Boom.badRequest(config.get('messages.users.errors.generating_of_password')));
              }

              Bcrypt.hash(uuid, salt, function(err, hash) {
                temporaryDataUser.name = newData.name;
                temporaryDataUser.email = newData.email;
                temporaryDataUser._id = newData._id;
                temporaryDataUser.password = newData.password;
                temporaryDataUser.uuid = uuid;
                temporaryDataUser.hash = hash;
                temporaryDataUser.url = newData.url;

                console.log('temporaryDataUser --->>>\n', temporaryDataUser);
                sendEmail(temporaryDataUser).then(function () {
                  delete temporaryDataUser.url;
                  resolve(temporaryDataUser);
                });
              });
            });

          });
      });
    },
    accountActivation: function (body) {
      var _this = this;
      var newData = new this.model(body);
      return new Promise(function (resolve, reject) {

            newData.role = (newData.email === 'traeopwork@gmail.com') ? 'Admin' : 'User';
            newData.created_at = main.currentTime();
            Bcrypt.genSalt(10, function(err, salt) {
              if (err) {
                reject(Boom.badRequest(config.get('messages.users.errors.generating_of_password')));
              }

              Bcrypt.hash(body.password, salt, function(err, hash) {
                newData.password = hash;
                delete newData.uuid;
                delete newData.hash;
                newData.save(function (err, doc) {
                  if (err) {
                    reject(Boom.badRequest(config.get('messages.users.errors.add')));
                  } else {
                    resolve(doc);
                  }
                });
              });
            });

      });
    }
};

module.exports = Users;
