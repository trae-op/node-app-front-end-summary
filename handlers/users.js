
'use strict';

var mongoose = require('mongoose');
var config = require('config');
var jwt = require('jsonwebtoken');
var main = require('../lib/main');
var renderJSON = require('../lib/renderJson');
var privateKey = config.get('jwt_private_key');
var Users = require('../models/users');
var mongoConnection = require('../lib/mongoConnections');
var users = new Users(mongoose, mongoConnection.getConnectionApp());

module.exports = {
    getUsers: function (request, reply) {
        users.list()
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    getUserById: function (request, reply) {
        var id = request.params.user_id;
        users.getById(id)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    addUser: function (request, reply) {
        var body = request.payload;
        users.add(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    login: function (request, reply) {
        var credentials = request.payload;
        var email = credentials.email;
        var password = credentials.password;

        // if there isn't 'password' property when probably it's facebook or google
        if (!password) {
            var user = credentials;
            var token = jwt.sign(user, privateKey, {
                expiresIn: 3600000 * 60 // 1 hour
            });
            renderJSON(reply, {user: user, token: token});

        } else {
            users.findByEmail(email)
                .then(function (doc) {
                    main.checkPassword(password, doc)
                        .then(function () {
                            var user = doc;
                            var token = jwt.sign(user._doc, privateKey, {
                                expiresIn: 3600000 * 60 // 1 hour
                            });
                            renderJSON(reply, {user: user, token: token});
                        })
                        .catch(function (error) {
                            renderJSON(reply, error, true);
                        });
                })
                .catch(function (error) {
                    renderJSON(reply, error, true);
                });
        }

    },
    deleteUserById: function (request, reply) {
        var id = request.params.user_id;
        users.deleteById(id)
            .then(function (doc) {
                renderJSON(reply, { message: config.get("messages.deleted") });
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    validateJwtToken: function(request, decodedToken, callback) {
        var user_id = decodedToken._id;
        if (!decodedToken.password) {
            // if there isn't 'password' property when probably it's facebook or google
            var user = decodedToken;
            user.scope = [];
            user.role = 'User';
            user.scope.push(user.role);
            return callback(null, true, user);
        } else {
            users.getById(user_id)
                .then(function (user) {
                    user._doc.scope = [];
                    user._doc.scope.push(user._doc.role);
                    //console.log('user._doc--->\n', user._doc);
                    return callback(null, true, user._doc);
                })
                .catch(function (error) {
                    return callback(error, false, {message: 'user is missing!!!'});
                });
        }
    },
    authorizationUser: function (request, reply) {
      var body = request.payload;
      users.authorization(body)
        .then(function (doc) {
          renderJSON(reply, doc);
        })
        .catch(function (error) {
          renderJSON(reply, error, true);
        });
    },
    accountActivationUser: function (request, reply) {
      var body = request.payload;
      main.checkPassword(body.uuid, { password: body.hash })
        .then(function () {

          users.accountActivation(body)
            .then(function (doc) {
              renderJSON(reply, doc);
            })
            .catch(function (error) {
              renderJSON(reply, error, true);
            });

        })
        .catch(function (error) {
          renderJSON(reply, error, true);
        });
    }
};