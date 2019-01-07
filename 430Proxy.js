var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');

//创建express实例
var app = express();
var port = 5656;
app.use('/', express.static('/home/430edu/front/430edu/admin/dist'))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,Content-Length,Authorization,Accept,Cookie,Cache-Control,Pragma,expire-day");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
var proxy = httpProxy.createProxyServer({
    // target: 'http://bpmnew.workapps.io'
    // target:'http://172.16.1.40:8080',
    // target:'http://172.16.1.27:8080/activiti' //'http://172.16.1.244',
    // target:'http://172.16.1.25:8880/activiti' //  开发
    target:'http://172.16.1.144:9090', //赐飞
    // target:'http://172.16.1.71' //杨峰
    // target:'http://172.16.1.244', //测试
})
proxy.on('proxyReq', function(proxyReq, req, res, options) {
    proxyReq.setHeader('Accept', 'application/json')
});

app.use(function(req, res, next) {
     req.headers.host = '172.16.1.144:9090'//'bpmnew.workapps.io'
    // if (req.url.indexOf('work_plus') > -1 || req.url.indexOf('login') > -1 || req.url.indexOf('accounts') > -1 || req.url.indexOf('files') > -1) {
    proxy.web(req, res);
    console.log(req.url);
})

app.listen(process.env.PORT || port);
console.log('Show Time!');
console.log('Listening Port:' + port);