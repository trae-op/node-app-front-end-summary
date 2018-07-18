

'use strict';

var _ = require('lodash');
var config = require('config');
var Promise = require('bluebird');
var Boom = require('boom');

var main = require('../lib/main');

function Companies(mongoose, connection) {

    this.Schema = mongoose.Schema;

    this.CompaniesSchema = new this.Schema({
        title: String,
        description: String,
        image: String,
        link: String,
        creator_email: String,
        created_at: String
    });

    this.model = connection.model('company', this.CompaniesSchema);
}

Companies.prototype = {
    list : function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.find({}, function (err, doc) {
                if (err) {
                    reject(Boom.badRequest(config.get('messages.companies.errors.list')));
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
                    reject(Boom.badRequest(config.get('messages.companies.errors.get_by_id')));
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
                    reject(Boom.badRequest(config.get('messages.companies.errors.delete_by_id')));
                } else {
                    resolve(doc);
                }
            });
        });
    },
    add : function (body) {
        var newData = new this.model(body);
        return new Promise(function (resolve, reject) {
            newData.created_at = main.currentTime();
            newData.save(function (err, doc) {
                if (err) {
                    reject(Boom.badRequest(config.get('messages.companies.errors.add')));
                } else {
                    resolve(doc);
                }
            });
        });
    },
    update : function (body) {
        var _this = this;
        var id = body._id;
        return new Promise(function (resolve, reject) {
            _this.getById(id)
                .then(function (docFind) {
                    docFind.title = body.title;
                    docFind.description = body.description;
                    docFind.image = body.image;
                    docFind.link = body.link;
                    docFind.creator_email = body.creator_email;
                    docFind.created_at = main.currentTime();

                    docFind.save(function (err, docUpdate) {
                        if (err) {
                            reject(Boom.badRequest(config.get('messages.companies.errors.update')));
                        } else {
                            resolve(docUpdate);
                        }
                    });

                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }
};

module.exports = Companies;
