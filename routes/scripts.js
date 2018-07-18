
'use strict';

var Joi = require('joi');
var abouts = require('../handlers/scripts');

module.exports = [
    {
        path: '/api/scripts',
        method: 'GET',
        config: {
            description: 'Get "scripts" list',
            notes: 'Return "scripts" list in the form of JSON',
            tags: ['api'],
            auth: {
                mode: 'try'
            },
            handler: abouts.getScripts
        }
    },
    {
        path: '/api/scripts/{script_id}',
        method: 'GET',
        config: {
            description: 'Get "script" by ID',
            notes: 'Return "script" by ID in the form of JSON',
            tags: ['api'],
            validate: {
                params: {
                    script_id: Joi.string().required()
                }
            },
            auth: {
                mode: 'try'
            },
            handler: abouts.getScriptById,
        }
    },
    {
        path: '/api/scripts',
        method: 'POST',
        config: {
            description: 'Get a new "script"',
            notes: 'Return a new "script" in the form of JSON',
            tags: ['api'],
            auth: {
                // strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: abouts.addScript
        }
    },
    {
        path: '/api/scripts/{script_id}',
        method: 'DELETE',
        config: {
            description: 'Get message about deteted "script"',
            notes: 'Return message about deleted "script" in the form of JSON',
            tags: ['api'],
            validate: {
                params: {
                    script_id: Joi.string().required()
                }
            },
            auth: {
                // strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: abouts.deleteScriptById
        }
    },
    {
        path: '/api/scripts',
        method: 'PUT',
        config: {
            auth: {
                // strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: abouts.updateScript
        }
    }
];
