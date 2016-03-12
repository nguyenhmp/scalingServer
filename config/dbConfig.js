var mysql = require('mysql');
var dbCredentials = require('../server/dbCredentials.js');
var dbSettings = require('../server/dbSettings.js');
var networkSettings = require('../server/networkSettings.js');
var dbObject = {
	"connectionLimit": dbSettings.connectionLimit, 
	"host": dbSettings.host,
	"database": dbSettings.database,
	"user": dbCredentials.user,
	"password" : dbCredentials.password
}
var dbpool = mysql.createPool(dbObject);
module.exports = (function(){
	return dbpool;
})()