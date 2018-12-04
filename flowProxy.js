var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');

//创建express实例
var app = express()
var port = 9111

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,Content-Length,Authorization,Accept,Cookie,Cache-Control,Pragma,expire-day");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

var proxy = httpProxy.createProxyServer({
    target:'http://0.0.0.0:5555'
})

app.use(function(req, res, next) {
    proxy.web(req, res);
    console.log(req.url);
})

app.listen(process.env.PORT || port);
console.log('Show Time!');
console.log('Listening Port:' + port);
