
'use strict';

var mongoose = require('mongoose');
var config = require('config');
var renderJSON = require('../lib/renderJson');
var Companies = require('../models/companies');
var mongoConnection = require('../lib/mongoConnections');
var companies = new Companies(mongoose, mongoConnection.getConnectionApp());


module.exports = {
    getCompanies: function (request, reply) {
        companies.list()
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    getCompanyById: function (request, reply) {
        var id = request.params.company_id;
        companies.getById(id)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    addCompany: function (request, reply) {
        var body = request.payload;
        companies.add(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    updateCompany: function (request, reply) {
        var body = request.payload;
        companies.update(body)
            .then(function (doc) {
                renderJSON(reply, doc);
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    },
    deleteCompanyById: function (request, reply) {
        var id = request.params.company_id;
        companies.deleteById(id)
            .then(function (doc) {
                renderJSON(reply, { message: config.get("messages.deleted") });
            })
            .catch(function (error) {
                renderJSON(reply, error, true);
            });
    }
};