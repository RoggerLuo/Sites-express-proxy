var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');
var http = require('http')
//创建express实例
var app = express();
var port = 80
//app.use('/', express.static('/root/indexPage'))

app.use('/', function(req, res, next) {
console.log(req.url)  
var options = {
    host: "47.99.79.11",
    port: "8081",
    path: req.url,//'/release/index.html?id=lore&profile=default',
    method: req.method,
    headers: req.headers 
  };
  var request = http.request(options,function(response){
    res.statusCode = response.statusCode;
    response.pipe(res);
  }).on("error",function(){
    res.statusCode = 503;
    res.end();
  });
  req.pipe(request);
});



app.listen(process.env.PORT || port);
console.log('Show Time!');
console.log('Listening Port:' + port);
