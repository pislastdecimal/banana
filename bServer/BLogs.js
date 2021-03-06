/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

var logsPath = "logs/";
var fs = require("fs");
var lf = logsPath+require('./../BConf').config.logFile;
var sf = logsPath+require('./../BConf').socketConf.logFile;
var logMaxSize = require('./../BConf').config.logMaxSize;
var bUtils = require('./../bCore/BUtils');
var zlib = require('zlib');

if (typeof lf == "undefined") lf = 'log.txt';
if (typeof sf == "undefined") lf = 'socketLog.txt';

/**
 * write http requests
 * @param req
 * @param res
 */
exports.writeLog = function (req, res) {

    zipLog(lf,logMaxSize);

    var date = new Date();
    var formatedDate = bUtils.formatedDate(date);
    if (typeof res._header != 'undefined') {
        var aResp = res._header.split("\r\n");
        var resp = aResp[0] + "\t" + aResp[1]
    } else
        var resp = "";


    var log = "# [" + formatedDate + "] FROM:'" + req.connection.remoteAddress + "' METH:'" + req.method + "'  FOR:'" + req.url + "'  RESP:" + resp + "\n";

    fs.writeFile(lf, log, {flag:"a+"}, function (err) {
        if (err) throw err;
    });
};

/**
 * logger web server
 * @param e
 */
exports.writeServerEvent = function (e) {
    var date = new Date();
    var formatedDate = bUtils.formatedDate(date);

    if (e == "close") {
        var log = "@@@ [" + formatedDate + "] SHUT DOWN @@@\n";
        fs.writeFile(lf, log, {flag:"a+"}, function (err) {
            if (err) throw err;
        });
    }
    else if (e == "listen") {
        var log = "@@@ [" + formatedDate + "] LISTENNING @@@\n";
        fs.writeFile(lf, log, {flag:"a+"}, function (err) {
            if (err) throw err;
        });
    } else{
        var log = "@@@ [" + formatedDate + "] "+e+"\n";
        fs.writeFile(lf, log, {flag:"a+"}, function (err) {
            if (err) throw err;
        });
    }
};
/**
 * 
 * @param e
 * @param data
 */
exports.writeSocketEvent = function (e, data) {

    var date = new Date();
    var formatedDate = bUtils.formatedDate(date);

    if (e == 'connect')
        var log = "@@@ [" + formatedDate + " " + date.getMilliseconds() + "] Connection : " + data;
    else if (e == 'disconnect')
        var log = "@@@ [" + formatedDate + " " + date.getMilliseconds() + "] Disconnection : " + data;

    fs.writeFile(sf, log, {flag:"a+"}, function (err) {
        if (err) throw err;
    });
};

/**
 *
 * @param data
 */
exports.writeSocketLog = function (data) {

    zipLog(sf,logMaxSize);

    var date = new Date();
    var formatedDate = bUtils.formatedDate(date);

    var log = "# [" + formatedDate + "] " + data + "\n";

    fs.writeFile(sf, log, {flag:"a+"}, function (err) {
        if (err) throw err;
    });
};

/**
 * logs zipper
 * @param flog
 * @param size
 */
function zipLog(flog,size) {
    fs.exists(flog, function (exists) {

        if (exists) {

            fs.stat(flog, function (e, s) {

                if (e)throw e;

                if (s.size > size) {
                    var date = new Date();
                    var newname = flog + "_" + bUtils.formatedLogDate(date);
                    var gzip = zlib.createGzip();
                    fs.renameSync(flog, newname);
                    var inp = fs.createReadStream(newname);
                    var out = fs.createWriteStream(newname + '.gz');
                    inp.pipe(gzip).pipe(out);
                    fs.unlink(newname);
                }
            });
        }
    });
}
