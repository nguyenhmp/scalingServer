var mysql = require('mysql');
var dbSettings = require('./dbSettings.js');
var networkSettings = require('./networkSettings.js');
dbSettings.port = networkSettings.port;
var dbpool = mysql.createPool(dbSettings);
module.exports = (function(){
	return dbpool;
})()