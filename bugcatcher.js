var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');

//创建express实例
var app = express();
var port = 8100;

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,Content-Length,Authorization,Accept,Cookie,Cache-Control,Pragma,expire-day");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

//代理
var proxy = httpProxy.createProxyServer({
    // target: 'http://192.168.1.2:8090'
    target: 'http://172.168.1.178:8090'
});

proxy.on('proxyReq', function(proxyReq, req, res, options) {
    // proxyReq.setHeader('from', 'admin')
    // proxyReq.setHeader('Accept', 'application/json')
    // proxyReq.setHeader("Authorization", "Bearer b3923a91e33d44678f2e90c73f7f9b99")
    proxyReq.setHeader('Content-Type', 'application/json')

});

// 代理中间件，只代理url包含/webservice的请求
app.use(function(req, res, next) {
    /* 记得改这个啊 啊啊啊啊 */
    // req.headers.host = 'bpm.yyang.io'

    // if (req.url.indexOf('work_plus') > -1 || req.url.indexOf('login') > -1 || req.url.indexOf('accounts') > -1 || req.url.indexOf('files') > -1) {
    proxy.web(req, res);
    console.log(req.url);
    // }
})

app.listen(process.env.PORT || port);
console.log('BeeWorks Exhibition, Show Time!');
console.log('Listening Port:' + port);
