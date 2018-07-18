
'use strict';

var Joi = require('joi');
var abouts = require('../handlers/abouts');

module.exports = [
    {
        path: '/api/abouts',
        method: 'GET',
        config: {
            handler: abouts.getAbouts,
            description: 'Get list "abouts"',
            notes: 'Returns a list "abouts"',
            tags: ['api'],
            auth: {
                mode: 'try'
            }
        }
    },
    {
        path: '/api/abouts/{about_id}',
        method: 'GET',
        config: {
            handler: abouts.getAboutById,
            description: 'Get About by ID',
            notes: 'Return "about" by ID',
            tags: ['api'],
            validate: {
                params: {
                    about_id: Joi.string().required()
                }
            },
            auth: {
                mode: 'try'
            },
        }
    },
    {
        path: '/api/abouts',
        method: 'POST',
        config: {
            description: 'Add a new "about"',
            notes: 'Return a new created "about"',
            tags: ['api'],
            auth: {
                // strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: abouts.addAbout
        }
    },
    {
        path: '/api/abouts/{about_id}',
        method: 'DELETE',
        config: {
            description: 'Delete "about" by ID',
            notes: 'Return message about deleted "about"',
            tags: ['api'],
            validate: {
                params: {
                    about_id: Joi.string().required()
                }
            },
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: abouts.deleteAboutById
        }
    },
    {
        path: '/api/abouts',
        method: 'PUT',
        config: {
            auth: {
                //strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: abouts.updateAbout
        }
    }
];
