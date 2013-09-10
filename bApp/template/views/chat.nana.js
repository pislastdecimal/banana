/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

//var socketConf = require('./../../../BConf').socketConf;
//
//var io = require('socket.io/node_modules/socket.io-client/dist/socket.io');
//var ip = socketConf.serverIp; var port=socketConf.port;

exports.template = function(){

	var t = '<div class="span12">'+
		'<div>'+
		'<a href="/b">TO B</a>'+
		'</div></div>';

    return t;
};
