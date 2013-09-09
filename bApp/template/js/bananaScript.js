/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

var i = 0;

function testJSClient(uri, cb) {
    var t2 = jQuery("#test2").text(i++);
}

/**
*
*
*/
function callAjax(url,data) {
    jQuery.ajax({
        type:"POST",
        data:"GO",
        url:url,
        dataType:"jsonp",
        jsonpCallback:"CB",
        error:function () {
            jQuery("#test").text('error');
        },
        success:function (msg) {
            jQuery("#test").html(msg);
        }
    });
}





/**
 *  socket coté client
 * @param io
 * @param ip
 * @param port
 * @param vars
 */
function socketClient(io,ip,port,vars) {

    var i = Math.floor((Math.random()*6)+1);
    var j = Math.floor((Math.random()*6)+1);
    var fruits=[{fname:'banana',color:'yellow'},
		{fname:'apple',color:'green'},
		{fname:'orange',color:'orange'},
		{fname:'kiwi',color:'brown'},
		{fname:'strawberry',color:'red'},
		{fname:'blueberry',color:'blue'}];
    var data = {c:fruits[i].color,f:fruits[j].fname};
    
    var socket = io.connect('"http://'+ip+':'+port+'"');

    socket.on('con', function (msg) {
        $('#socketdiv').text(msg.c+" "+msg.f+" is good");
    });
    socket.on('img', function (msg) {
        $('#testFile').html('<img src="data:image/png;base64,'+msg+'" />');
    });
    socket.on('connect',function(){
        socket.emit('user',data);
    });
    socket.on('disconnect',function(){
        socket.emit('userdeco',data);
    });
    $(document).ready(function () {
        socket;
    });
}


