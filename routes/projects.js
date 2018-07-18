
'use strict';

var Joi = require('joi');
var projects = require('../handlers/projects');

module.exports = [
    {
        path: '/api/projects',
        method: 'GET',
        config: {
            description: 'Get PROJECTS list',
            notes: 'Return PROJECTS list in the form of JSON',
            tags: ['api'],
            auth: {
                mode: 'try',
                // strategy: 'session',
                // scope: ['User']
            },
            handler: projects.getProjects
        }
    },
    {
        path: '/api/projects/{project_id}',
        method: 'GET',
        config: {
            description: 'Get PROJECT by ID',
            notes: 'Return PROJECT by ID in the form of JSON',
            tags: ['api'],
            validate: {
                params: {
                    project_id: Joi.string().required()
                }
            },
            auth: {
                mode: 'try'
            },
            handler: projects.getProjectById,
        }
    },
    {
        path: '/api/projects',
        method: 'POST',
        config: {
            description: 'Get a new PROJECT',
            notes: 'Return a new PROJECT in the form of JSON',
            tags: ['api'],
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: projects.addProject
        }
    },
    {
        path: '/api/projects/{project_id}',
        method: 'DELETE',
        config: {
            description: 'Get message about deteted PROJECT',
            notes: 'Return message about deleted PROJECT in the form of JSON',
            tags: ['api'],
            validate: {
                params: {
                    project_id: Joi.string().required()
                }
            },
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: projects.deleteProjectById
        }
    },
    {
        path: '/api/projects',
        method: 'PUT',
        config: {
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: projects.updateProject
        }
    }
];
