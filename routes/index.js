var http = require('https');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.findgift = function(req,res,next){
	var options = {
		hostname: 'openapi.etsy.com',
		path: '/v2/treasuries?api_key=oo4naleziqpm5w8c4q592968&keywords='+req.params.keywords,
		method: 'get'
	};
	console.log(options);


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
