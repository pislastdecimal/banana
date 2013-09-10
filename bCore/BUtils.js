/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/


var bConf = require("./../BConf").config
    , bBaseTemplate = require('./../bApp/template/BBase')
    , fs = require("fs");

/**
 * compte le nombre d'entrees dans un json
 * @param j
 * @return {*}
 */
exports.jLength = function (j) {
    return Object.keys(j).length;
}

/**
 * recupere des paires K/V d'un json
 * util pour les console.log()
 * @param j
 */
exports.getJKeyVal = function (j) {
    var str = "";
    for (var k in j) {
        str += k + ":" + j[k] + ":";
    }
    return str.substring(-1, str.length - 1);
}

/**
 * fonction de sommeil
 * @param ms temps d'attente en millisecondes
 */
exports.bSleep = function (ms) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + ms);
}


/**
 *
 * @param r route BRouter
 * @param RH BRequestHandler
 * @return {Object} retourne un tableau route / fonction
 * TODO implementer le systeme de façon à pouvoir creer des routes du type /url/xxx/yyy
 *          avec xxx/yyy variables.
 */
exports.routeParser = function (r, RH) {

    var routed = {};
    var fn = typeof RH.rh['rhName'] == "undefined" ? " " : RH.rh['rhName'].toUpperCase();

    var pattern = /\*u/;

    // parcours du tableau de routes
    // association du pathname (URI) avec l'action correspondante.
    for (var k in r) {
        var routes = k.split('*');

//        console.log(routes);

        var j = k;
        if (k.match(pattern)) {
            j = k.split(pattern);
            j = j[0];
        }

        if (typeof RH.rh[r[k].action] != "undefined") {
            routed[j] = {
                'action':RH.rh[r[k].action],
                'template':typeof r[k].template == "string" ? r[k].template : "default"
            };

        } else {
            throw "erreur lors de la creation des routes : l'action [" + r[k].action + "] n'est pas definie dans l'objet [ bRequestHandler ] " + fn + "";
        }
    }

    return routed;
};

/**
 *
 * @param aControllers
 * @return {Object}
 */
exports.requestMapping = function (aControllers) {
    var requestMapping = {};
    for (var k in aControllers) {
        for (var k2 in aControllers[k]) {
            requestMapping[k2] = k;
        }
    }

    return requestMapping;
};

/**
 *
 * @param date
 * @return {String}
 */
exports.formatedDate = function (date) {
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return  date.getFullYear() + "/" + m + "/" + d + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};

/**
 *
 * @param date
 * @return {String}
 */
exports.formatedLogDate = function (date) {
    var m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return  date.getFullYear() + m + d+ date.getHours() + date.getMinutes() + date.getSeconds();
};

/**
 *
 * @type {Object}
 */
var template = {
    "head":bBaseTemplate.header,
    "bodyHead":bBaseTemplate.bodyH,
    "foot":bBaseTemplate.footer
};

/**
 *
 * @param t
 * @param response
 * @param vars
 * @param cb
 * @return {Boolean}
 */
exports.renderTemplate = function (t, response, vars, cb) {
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(template.head);
    response.write(template.bodyHead);
    
    if (typeof vars =="undefined") vars ={};

    if (typeof bConf.templating == "undefined" || bConf.templating == "nana") {
        var output = require('../bApp/template/views/' + t + '.nana').template();
         console.log(t);
        response.write(output);
        response.write(template.foot);
        response.end();
    }
};

/**
 *
 * @param t
 * @param response
 * @param vars
 */
exports.renderAjaxTemplate = function (t, response,vars,cb) {
    var output = require('../bApp/template/views/' + t + '.nana').template(vars);
   
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write('CB("'+output+'")');
    response.end();
};

/**
 * TODO
 */
exports.renderFile = function () {

};
/**
 * TODO
 */
exports.renderAjaxFile = function () {

};





