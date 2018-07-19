
'use strict';

var config = require('config');
var _ = require('lodash');
var Path = require('path');
var Hapi = require('hapi');
var server = new Hapi.Server();

var users = require('../handlers/users');

var routesUsers = require('../routes/users');
var routesAbouts = require('../routes/abouts');
var routesScripts = require('../routes/scripts');
var routesHeaders = require('../routes/headers');
var routesProjects = require('../routes/projects');
var routesCompanies = require('../routes/companies');

server.connection({
    port: process.env.PORT || config.get('connection.port'),
    host: config.get('connection.host'),
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    }
});

var privateKey = config.get('jwt_private_key');

server.register([
    {
        register: require('hapi-auth-jwt')
    }
], function (error) {

    if (error) {
        console.log('----> Failed loading plugin!!! <----');
        return;
    }

    server.auth.strategy('token', 'jwt', {
        key: privateKey,
        validateFunc: users.validateJwtToken
    });

    server.auth.default({
      strategies: ['token']
    });

    var allRoutes = _.concat(
        routesUsers,
        routesAbouts,
        routesScripts,
        routesHeaders,
        routesProjects,
        routesCompanies
    );

  // server.route({
  //   method: 'GET',
  //   path: '/{param*}',
  //   config: {
  //     handler: {
  //       directory : {
  //         path : 'views'
  //       }
  //     },
  //     auth: {
  //       mode: 'try'
  //     }
  //   }
  // });

    server.route(allRoutes);
});

server.start(function (err) {
    if (err) {
        throw err;
    }

    console.log('Server running at:' + server.info.uri);
});

