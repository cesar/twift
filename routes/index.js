var https = require('https');
var Twitter = require('twitter');
var util = require('util');

var twitter = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI(process.env.ALCHEMY_API_KEY);

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getSuggestions = function(req, res){
// 	twitter.get('/statuses/user_timeline.json', {screen_name: req.body.user_name, count:200, include_entitites: true}, function(data) 
//   {
// 		  var tweet_text_raw = '';
// 	    for (var i = 0; i < data.length; i++) {
// 			   tweet_text_raw += data[i].text;
// 		  }
// 		var new_data = [];

// 		alchemy.keywords(tweet_text_raw, {}, function(error, response)
//     {
// 				//Only add the elements with high relevance.
// 				for(var i = 0; i < response.keywords.length; i++)
//         {
// 					if(parseFloat(response.keywords[i].relevance, 10) > 0.85)
//           {
// 						new_data.push(response.keywords[i]);
// 					}
// 				}

//   https.get("openapi.etsy.com/v2/treasuries?api_key=oo4naleziqpm5w8c4q592968&keywords="+response.keywords[0].text, function(res) {
//   console.log("statusCode: ", res.statusCode);
//   console.log("headers: ", res.headers);

//   res.on('data', function(d) {
//     process.stdout.write(d);
//   });

// }).on('error', function(e) {
//   console.error(e);
// });
         
//     });

//   });
}
