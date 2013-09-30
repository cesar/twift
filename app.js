
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var index = require('./routes/index');
var http = require('http');
var path = require('path');
var Twitter = require('twitter');
var util = require('util');

var twitter = new Twitter({
	consumer_key: 'aevBRTLUjmAlv16wgrqG5w',
	consumer_secret: 'qXHcDKI47ez4c150ZjGsdCCU9gcjnl3JC08aNjJw02U',
	access_token_key: '46003103-ta6jxdKNSppMiaYFfez7oiiwuTR0U3WTLZjmhj1EM',
	access_token_secret: '5dh7bOuTyxD8QzDyHluBE1Z9BORHZaB9AiPzoVIsN7k'
});
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('f425552e7eec51eb837a2b4a7fa08a8ced222609');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(req, res){
	res.render('index');
});


app.post('/suggest', index.suggest);
//app.get('/findgift/:keywords', index.findgift);


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
