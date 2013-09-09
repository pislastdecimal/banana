/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

var socketConf = require('./../../../BConf').socketConf;

var io = require('socket.io/node_modules/socket.io-client/dist/socket.io');
var ip = socketConf.serverIp; var port=socketConf.port;

exports.template = function (url,data) {
    var t = '<div class="span12"><div><a href="/d">lien</a></div>' +
        '<button class="btn" onclick="callAjax(\'/ajaxCall\','+data+');">server call</button>' +
        '<button class="btn btn-warning" onclick="testJSClient(\'WIZZZZZZ\')">local call</button>' +
        '<div id="test"></div>' +
        '<div id="test2"></div>' +
        '<div id="testFile"></div></div>';
    
	if(socketConf.socket)
    		t += '<script type="text/javascript">socketClient(io,"'+ip+'",'+port+',"'+data+'");</script>';

    return t;
}


