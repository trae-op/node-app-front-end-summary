
var mongoose = require('mongoose');
var merge    = require('mongoose-merge-plugin');
var config   = require('config');

mongoose.plugin(merge);
mongoose.set('debug', true);

//var AppConnection = mongoose.createConnection(config.get('connection.db'));

var AppConnection = mongoose.createConnection(config.get('connection.db_production'));

AppConnection.on('error', function (err) {
    console.log(['error'], '"newresume" moungodb connect error: ' + err);
});

AppConnection.on('connected', function () {
    console.log('Mongoose connected to "newresume" connection!');
});

exports.getConnectionApp = function () {
    return AppConnection;
};