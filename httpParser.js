var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');
var bodyParser = require('body-parser')

//创建express实例
var app = express();
var port = 9911;

const querystring = require('querystring');
const util = require('util');

// app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', function(req, res, next) {
    console.log('- - - - - - - url --- - - - - - -')
    console.log(req.url)
    console.log('- - - - - headers info - - - - -')
    console.log(req.headers)

    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,Content-Length,Authorization,Accept,Cookie,Cache-Control,Pragma,expire-day");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    var post = '';
    req.on('data', (chunk) => {
        post += chunk;
    });
    req.on('end', () => {
        //将字符串变为json的格式
        post = querystring.parse(post);
        //向前端返回字符串
        const str=util.inspect(post)
        console.log(str)
        res.end(str)
    });
    // next();
});
app.listen(process.env.PORT || port);
console.log('Http Parser, Show Time!');
console.log('Listening Port:' + port);



/*


名称  含义
ccomplete   客户端请求是否已经发送完成
httpVersion HTTP协议版本，通常是1.0或1.1
method  HTTP请求方法，如：GET,POST
url 原始的请求路径
headers HTTP请求头
trailers    HTTP请求尾(不常见)
connection  当前HTTP连接套接字，为net.Socket的实例
socket  connection属性的别名
client  client属性的别名


*/