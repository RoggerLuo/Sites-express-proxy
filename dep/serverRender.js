var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');

var ReactDOMServer = require('react-dom/server');
var React = require('react')
const ReactApp = function(){
    return (<div>测试服务端渲染</div>)
}
let string = ReactDOMServer.renderToString(<ReactApp/>)
console.log(string)