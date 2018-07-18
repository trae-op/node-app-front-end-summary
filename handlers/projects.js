
'use strict';

var mongoose = require('mongoose');
var config = require('config');
var renderJSON = require('../lib/renderJson');
var Projects = require('../models/projects');
var mongoConnection = require('../lib/mongoConnections');
var projects = new Projects(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getProjects: function (request, reply) {
      //console.log('request.auth.isAuthenticated -> projects', request.auth.isAuthenticated);
        projects.list()
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    getProjectById: function (request, reply) {
        var id = request.params.project_id;
        projects.getById(id)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    addProject: function (request, reply) {
        var body = request.payload;
        projects.add(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    updateProject: function (request, reply) {
        var body = request.payload;
        //console.log('body', body)
        projects.update(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    deleteProjectById: function (request, reply) {
        var id = request.params.project_id;
        //console.log(id);
        projects.deleteById(id)
            .then(function (doc) {
                renderJSON(reply, { message: config.get("messages.deleted") });
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    }
};