var mysql = require('mysql');
var dbSettings = require('./dbSettings.js');
var dbpool = mysql.createPool(dbSettings);
module.exports = (function(){
	return dbpool;
})()