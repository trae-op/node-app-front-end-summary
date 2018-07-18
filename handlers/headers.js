
'use strict';

var mongoose = require('mongoose');
var config = require('config');
var renderJSON = require('../lib/renderJson');
var Headers = require('../models/headers');
var mongoConnection = require('../lib/mongoConnections');
var headers = new Headers(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getHeaders: function (request, reply) {
        headers.list()
            .then(function (doc) {
                //console.log(doc)
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    getHeaderById: function (request, reply) {
        var id = request.params.header_id;
        headers.getById(id)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    addHeader: function (request, reply) {
        var body = request.payload;
        headers.add(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    updateHeader: function (request, reply) {
        var body = request.payload;
        headers.update(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                reply(error);
            });
    },
    deleteHeaderById: function (request, reply) {
        var id = request.params.header_id;
        headers.deleteById(id)
            .then(function (doc) {
                renderJSON(reply, { message: config.get("messages.deleted") });
            })
            .catch(function (error) {
                reply(error);
            });
    }
};