var http = require('http');
var redis = require("redis"),
client = redis.createClient();
http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  res.setHeader('Access-Control-Allow-Credentials','true')
  //  res.write('Hello World!');
  // res.end(req.headers.host);
  var key = req.headers.host || ''
  // console.log('asf ', key)
  client.LRANGE(key, 0, -1, function(err, resp) {
    // console.log(err, resp)
    if (err) return res.end(JSON.stringify([]))
    else {
      client.DEL(key)
      res.end(JSON.stringify(resp))
    }
  })
}).listen(8080);
