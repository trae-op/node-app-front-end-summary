
'use strict';

var Joi = require('joi');
var users = require('../handlers/users');

module.exports = [
    {
        path: '/api/users',
        method: 'GET',
        config: {
            description: 'Delete "about" by ID',
            notes: 'Return message about deleted "about"',
            tags: ['api'],
            auth: {
                mode: 'try'
                //scope: ['Admin']
            },
            handler: users.getUsers
        }
    },
    {
        path: '/api/users/{user_id}',
        method: 'GET',
        config: {
            description: 'Delete "about" by ID',
            notes: 'Return message about deleted "about"',
            tags: ['api'],
            auth: {
                //mode: 'try',
                scope: ['Admin']
            },
            validate: {
                params: {
                    user_id: Joi.string().required()
                }
            },
            handler: users.getUserById
        }
    },
    {
        path: '/api/users',
        method: 'POST',
        config: {
            description: 'Delete "about" by ID',
            notes: 'Return message about deleted "about"',
            tags: ['api'],
            auth: {
                mode: 'try'
                //strategies: ['Admin']
            },
            handler: users.addUser
        }
    },
    {
        path: '/api/users/{user_id}',
        method: 'DELETE',
        config: {
            description: 'Delete "about" by ID',
            notes: 'Return message about deleted "about"',
            tags: ['api'],
            validate: {
                params: {
                    user_id: Joi.string().required()
                }
            },
            auth: {
                //scope: ['Admin'],
                mode: 'try'
            },
            handler: users.deleteUserById
        }
    },
    {
        path: '/api/users/login',
        method: 'POST',
        config: {
            handler: users.login,
            auth: {
                mode: 'try'
            }
        }
    },
  {
    path: '/api/authorization',
    method: 'POST',
    config: {
      handler: users.authorizationUser,
      auth: {
        mode: 'try'
      }
    }
  },
  {
    path: '/api/activation',
    method: 'POST',
    config: {
      handler: users.accountActivationUser,
      auth: {
        mode: 'try'
      }
    }
  }
];
