var http = require('http');
var http = require("http");
var port = process.env.PORT || 3000;

var options = {
  host: 'api.twitter.com',
  port: 80,
  path: '/statuses/user_timeline.json?screen_name=verge&count=5;&trim_user=1'
};

http.createServer(function(request, response) {

  var twitterRequest = http.get(options, function(res) {
  	console.log("Got response: " + res.statusCode);
	res.setEncoding('utf8');
  	var data = "";
	res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var tweets = JSON.parse(data);
        
           for(var i=0; i<5; i++) {
            var tweetData = tweets[i].text;
            
            var removeLink = tweetData.indexOf("http://");
            
            if(removeLink > 0) {
              tweetData = tweetData.substring(0, removeLink - 1) + '.';
            }
           
            //tweetData.replace("\r\n","").trim();
           
            response.write(tweetData.length.toString());
            response.write(" ");
            response.write(tweetData);
            response.write("\n");
           }
        
        response.end();
   	});

  }).on('error', function(e) {
  	console.log("Got error: " + e.message);
    });
  

}).listen(port, function() {
           console.log("Listening on " + port);
           });
