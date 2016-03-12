var mysql = require('mysql')
var express = require('express');
var async = require('async');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');

app.listen(8889, function(req, res){
  console.log("listening on 8889")
})

app.get('/', function(req, res){
	res.render('loadtest')
})