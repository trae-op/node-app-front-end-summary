
'use strict';

var mongoose = require('mongoose');
var config = require('config');
var renderJSON = require('../lib/renderJson');
var Abouts = require('../models/about');
var mongoConnection = require('../lib/mongoConnections');
var abouts = new Abouts(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getAbouts: function (request, reply) {
        abouts.list()
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    getAboutById: function (request, reply) {
        var id = request.params.about_id;
        abouts.getById(id)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    addAbout: function (request, reply) {
        var body = request.payload;
        abouts.add(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    updateAbout: function (request, reply) {
        var body = request.payload;
        abouts.update(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    deleteAboutById: function (request, reply) {
        var id = request.params.about_id;
        abouts.deleteById(id)
            .then(function (doc) {
                renderJSON(reply, { message: config.get("messages.deleted") });
            })
            .catch(function (error) {
                reply(error);
            });
    }
};