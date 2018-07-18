
'use strict';

var mongoose = require('mongoose');
var Bcrypt = require('bcrypt');
var config = require('config');
var jwt = require('jsonwebtoken');
var renderJSON = require('../lib/renderJson');
var privateKey = config.get('jwt_private_key');
var Users = require('../models/users');
var mongoConnection = require('../lib/mongoConnections');
var users = new Users(mongoose, mongoConnection.getConnectionApp());

module.exports = {
  validate: function(request, decodedToken, callback) {

    var user_id = decodedToken._id;

    console.log('----2----');

    users.getById(user_id)
        .then(function (user) {
            console.log('---user---> validation\n');
            return callback(null, true, user._doc);
        })
        .catch(function (error) {
            console.log('---error---> validation\n');
            return callback(error, false, {message: 'user is missing!!!'});
        });
  }
};