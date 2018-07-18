
'use strict';

var mongoose = require('mongoose');
var config = require('config');
var renderJSON = require('../lib/renderJson');
var Scripts = require('../models/scripts');
var mongoConnection = require('../lib/mongoConnections');
var scripts = new Scripts(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getScripts: function (request, reply) {
        scripts.list()
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    getScriptById: function (request, reply) {
        var id = request.params.script_id;
        scripts.getById(id)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    addScript: function (request, reply) {
        var body = request.payload;
        scripts.add(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    updateScript: function (request, reply) {
        var body = request.payload;
        scripts.update(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    deleteScriptById: function (request, reply) {
        var id = request.params.script_id;
        scripts.deleteById(id)
            .then(function (doc) {
                renderJSON(reply, { message: config.get("messages.deleted") });
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    }
};