var pg = require('pg');
var bUtils = require('bUtils');

var sCon = "postgres://tcs:hadve4n0@192.168.3.78:5432/servermanager";
var client = new pg.Client(sCon);
client.connect();

var sQuery = 'insert into stat_node ("type", "value","date") values ($1,$2,$3)';
var v = 0;
var date = null;


/**
 * insere des nomdres au hasard
 * @param t
 */
exports.bInsertValue = function (t) {
    t = typeof t == 'number' ? t : 1;
    setInterval(function () {
        date = new Date();
        v = Math.floor(Math.random() * 100);
        client.query(sQuery, [t, v, date.toISOString()]);
        t = Math.floor(Math.random() * 10);
        console.log(t + " " + v);
    }, 5000);
}


/**
 *
 * @param table
 * @param jValue
 * @param cb
 */
exports.bSelectValue = function (table, jValue, cb) {

    var sql = strToSqlClose(table, bUtils.getJKeyVal(jValue));

    var query = client.query(sql);

    query.on("row", function (row, result) {
        result.addRow(row);
    });

    query.on("end", function (result) {
        cb(result);
        client.end();
    });
}


/**
 * forme un sql String à partir d'un json correctement formé....
 * @param table
 * @param str
 * @return {String}
 */
function strToSqlClose(table, str) {
    var sql = "SELECT * FROM " + table + " ";
    var aCL = str.split(":");

    sql += " WHERE " + aCL[0] + "=" + aCL[1];

    for (var i = 2; i < aCL.length; i++) {
        if (i % 2 == 0)
            sql += " AND " + aCL[i];
        else
            sql += ">" + aCL[i]
    }

    return sql + " ;";
}


//var query = client.query("SELECT * FROM server");
//var resultHTML = "";
//query.on("row", function (row, result) {
//    result.addRow(row.name + " " + row.what + "<br>");
//    console.log("%s : %s", row.name, row.what);
//});
//query.on("end", function (result) {
////    console.log(JSON.stringify(result.rows, null, "    "));
//    resultHTML = '<pre>' + result.rows + '</pre>';
////    resultHTML = '<pre>'+JSON.stringify(result.rows, null, "    ")+'</pre>';
//    client.end();
//});