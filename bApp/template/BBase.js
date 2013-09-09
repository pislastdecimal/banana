/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/


var conf = require('./../../BConf').view;


exports.header = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
    '<script type="text/javascript">' + conf.script + '</script>' +
    '</head>';

exports.bodyH = '<body>' +
    '<style>' + conf.css + '</style>' +
    '<div class="row container">' +
    '<div id="banana_header" style = "height:50px;margin-top:10px;border:1px solid #ddd;padding:5px; background: #eee;text-align: center;font-size: 20px;" > baNanA <div id="socketdiv" style="font-size: 24px;"></div></div>';

exports.footer = '</div></body></html>';
