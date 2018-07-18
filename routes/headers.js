
'use strict';

var Joi = require('joi');
var headers = require('../handlers/headers');

module.exports = [
    {
        path: '/api/headers',
        method: 'GET',
        config: {
            handler: headers.getHeaders,
            description: 'Get list "headers"',
            notes: 'Returns a list "headers"',
            tags: ['api'],
            auth: {
                mode: 'try'
            }
        }
    },
    {
        path: '/api/headers/{header_id}',
        method: 'GET',
        config: {
            handler: headers.getHeaderById,
            description: 'Get headers by ID',
            notes: 'Return headers by ID',
            tags: ['api'],
            validate: {
                params: {
                    header_id: Joi.string().required()
                }
            },
            auth: {
                mode: 'try'
            }
        }
    },
    {
        path: '/api/headers',
        method: 'POST',
        config: {
            description: 'Add a new header',
            notes: 'Return a new created header',
            tags: ['api'],
            auth: {
                // strategies: ['session'],
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: headers.addHeader
        }
    },
    {
        path: '/api/headers/{header_id}',
        method: 'DELETE',
        config: {
            description: 'Delete header by ID',
            notes: 'Return message about deleted header',
            tags: ['api'],
            validate: {
                params: {
                    header_id: Joi.string().required()
                }
            },
            auth: {
                // strategies: ['session'],
                //scope: ['Admin', 'User']
                mode: 'try'
            },
            handler: headers.deleteHeaderById
        }
    },
    {
        path: '/api/headers',
        method: 'PUT',
        config: {
            auth: {
                scope: ['Admin', 'User']
                //mode: 'try'
            },
            handler: headers.updateHeader
        }
    }
];
