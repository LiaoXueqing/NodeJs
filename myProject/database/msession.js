var Settings = require('./settings');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var db = new Db( 'demo', new Server( '127.0.0.1',27017, {auto_reconnect:true, native_parser: true}),{safe: false});
module.exports = db;