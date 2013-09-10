/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

var fs = require('fs');

/**
 * config http
 * @type {Object}
 */
var conf = {
    "port":8888
    ,"logFile":"log.txt"
    ,"logMaxSize":1000000
    ,"templating":"nana"
};
exports.config = conf;

/**
 * config socket
 * @type {Object}
 */
var socket={
     "socket":true
    ,"port":8889
    ,"serverIp":"192.168.3.78"
    ,"logFile":"socketLog.txt"
    ,"levelApp":'dev'
};
exports.socketConf = socket;

/**
 * config static files for html
 * @type {Object}
 */
var view = {
     script : fs.readFileSync("./bApp/template/js/jQuery.js")+fs.readFileSync('./node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js')+fs.readFileSync("./bApp/template/js/bananaScript.js")
     ,css:fs.readFileSync("./bApp/template/css/style.css")+fs.readFileSync("./bApp/template/css/bootstrap.css")
};
 exports.view = view;


//################################################################################
/**
 * objet decrivant URL et l'action associÃ©e.
 * l'action doit etre presente dans le BRequestHandler
 *
 *      {"url1":{action:"action"[,template:"template"]} ["url2":"action2".....]}
 *
 *  plusieurs "pools" de routes peuvent etre crÃ©es
 */


var routeTest = {
    "/":{'action':'a'}
    ,"/a":{'action':'a'}
    ,"/b":{'action':'a','template':"b"}
    ,"/c":{'action':'a'}
    ,"/d":{'action':'b','template':"d"}
    ,"/e":{'action':'c','template':"b",'uri':true}
    ,"/ajaxCall":{action:'ajaxCall', template:"ajax"}
    ,"/chat":{action:"chat",template:"chat"}
    ,"/route/pour/*test/*varUrl":{"action":"a"}
};
exports.routeTest = routeTest;
