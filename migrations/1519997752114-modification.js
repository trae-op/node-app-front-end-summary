
var mongoose = require('mongoose');
var mongoConnection = require('../lib/mongoConnections');

// var Model = require('../models/users');
// var collection = new Users(mongoose, mongoConnection.getConnectionApp());

// var Model = require('../models/headers');
// var collection = new Model(mongoose, mongoConnection.getConnectionApp());

// var Model = require('../models/projects');
// var collection = new Model(mongoose, mongoConnection.getConnectionApp());

var Model = require('../models/scripts');
var collection = new Model(mongoose, mongoConnection.getConnectionApp());

exports.up = function(next) {
    collection
        .model
        .update(
            {},
            {
                $set: { title: 'a new script' }
            },
            {
                multi: true,
                strict: false
            },
            function (error, numberAffected, raw) {
                if (error) {
                    console.error(error);
                }
                console.log('The number of updated documents was %d', numberAffected);
                console.log('The raw response from Mongo was ', raw);
                next();
            }
        );
};

exports.down = function(next) {
    collection
        .model
        .update(
            {},
            {
                //$unset: { creator_email: '' }
                //$set: { title: 'a new script' }
            },
            {
                multi: true,
                strict: false
            },
            function (error, numberAffected, raw) {
                if (error) {
                    console.error(error);
                }
                console.log('The number of updated documents was %d', numberAffected);
                console.log('The raw response from Mongo was ', raw);
                next();
            }
        );
};