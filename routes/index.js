var http = require('https');
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

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.suggest = function(req, res){
	twitter.get('/statuses/user_timeline.json', {screen_name: req.body.user_name, count:200, include_entitites: true}, function(data) {
		var tweet_text_raw = '';
		for (var i = 0; i < data.length; i++) {
			tweet_text_raw += data[i].text;
		}
		var new_data = [];

		alchemy.keywords(tweet_text_raw, {}, function(error, response){
				//Only add the elements with high relevance.
				for(var i = 0; i < response.keywords.length; i++){
					if(parseFloat(response.keywords[i].relevance, 10) > 0.85){
						new_data.push(response.keywords[i]);
					}
				}
				console.log(response);
			var options = {
				hostname: 'openapi.etsy.com',
				path: '/v2/treasuries?api_key=oo4naleziqpm5w8c4q592968&keywords='+response.keywords[0].text,
				method: 'get'
			};
			console.log(options);

<<<<<<< HEAD
  var request = http.request(options, function(response) {
    console.log('STATUS: ' + response.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      // JSON.parse(chunk);
      res.send(chunk);
    });
  });

  request.on('error', function(e) {
	// console.log('problem with request: ' + e.message);
  });

  // write data to request body
  request.write('data\n');
  request.write('data\n');
  request.end();
}
