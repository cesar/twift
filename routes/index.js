var https = require('https');
var Twitter = require('mtwitter');
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

/*
 * GET etsy suggestions
 */

exports.getSuggestions = function(req, res) {

  twitter.get('/statuses/user_timeline', {screen_name : req.params.username, count : 5}, function(err, data)
  {
    var tweet_text_raw = '';
    for(var i = 0; i < data.length; i++)
    {
      tweet_text_raw += data[i].text;
    }


    var new_data = [];

    alchemy.keywords(tweet_text_raw, {}, function(error, response) {
      //Only add the elements with high relevance.
      for(var i = 0; i < response.keywords.length; i++) {
        if(parseFloat(response.keywords[i].relevance, 10) > 0.85)
        {
          new_data.push(response.keywords[i]);
        }
      }

      https.get("https://openapi.etsy.com/v2/treasuries?api_key="+process.env.ETSY_API_KEY+"&keywords="+response.keywords[0].text, function(response) {
        //store chunks of data
        var result = '';
        response.on('data', function(someData) {
          //more data has been received
          result += someData;
        });

        response.on('end', function()
        {
          console.log(JSON.parse(result).results[1]);
          //When the request is done
          res.render('suggestions', {content : JSON.parse(result).results})
        });

      }).on('error', function(e) {
        console.error(e);
      });
    });
  });
}