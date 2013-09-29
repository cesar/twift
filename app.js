
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
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

app.get('/suggest/:username', function (req, res) {
  twitter.get('/statuses/user_timeline.json', {screen_name: req.params.username, count:200, include_entitites: true}, function(data) {
    var tweet_text_raw = '';
    for (var i = 0; i < data.length; i++) {
      tweet_text_raw += data[i].text;
    }
    var new_data = [];

    alchemy.keywords(tweet_text_raw, {}, function(error, response)
    	{
    		//Only add the elements with high relevance.
    		for(var i = 0; i < response.keywords.length; i++)
    		{
    			if(parseFloat(response.keywords[i].relevance, 10) > 0.85)
    			{
    				new_data.push(response.keywords[i]);
    			}
    		}
    		console.log(new_data);
    	});
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
