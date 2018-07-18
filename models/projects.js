

'use strict';

var _ = require('lodash');
var config = require('config');
var Promise = require('bluebird');
var Boom = require('boom');

var main = require('../lib/main');

function Projects(mongoose, connection) {

    this.Schema = mongoose.Schema;

    this.ProjectsSchema = new this.Schema({
        title: String,
        description: String,
        image: String,
        link: String,
        creator_email: String,
        created_at: String
    });

    this.model = connection.model('project', this.ProjectsSchema);
}

Projects.prototype = {
    list : function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.model.find({}, function (err, doc) {
                if (err) {
                    reject(Boom.badRequest(config.get('messages.projects.errors.list')));
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
                    reject(Boom.badRequest(config.get('messages.projects.errors.get_by_id')));
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
                    reject(Boom.badRequest(config.get('messages.projects.errors.delete_by_id')));
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
                    reject(Boom.badRequest(config.get('messages.projects.errors.add')));
                } else {
                    resolve(doc);
                }
            });
        });
    },
    update : function (body) {
        var _this = this;
        var id = body._id;
        //console.log('body',body)
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
                            reject(Boom.badRequest(config.get('messages.projects.errors.update')));
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

module.exports = Projects;
