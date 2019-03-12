var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');


var AipNlpClient = require("./aip-node-sdk-2").nlp;

// 设置APPID/AK/SK
var APP_ID = "15737243";
var API_KEY = "MmGcFmcpYeG6vEKEBc20K9zP";
var SECRET_KEY = "fGLes8qGvGrntH1Cx75hnSXoGK5dgmcN";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipNlpClient(APP_ID, API_KEY, SECRET_KEY);




//创建express实例
var text1 = "blur 和 focus操作必须由用户触发 1.可以由鼠标click，键盘keydown等操作触发 2.不能由setTimeout或者setInterval触发 3.触发时，不能有其他同步发生的异步请求 第三点非常重要";

var text2 = "http fetch cookie 跨域 fetch默认不带cookie, server也默认不会跨域发cookie  options.credentials = 'include'   cookie不能跨域 浏览器的domain和服务器的不同, 跨域无法发送cookie 那就不要跨域，开发的时候开一个代理";
// 调用短文本相似度
client.simnet(text1, text2).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

