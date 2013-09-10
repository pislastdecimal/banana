/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

/* dependencies */
var querystring = require('querystring')
    , fs = require("fs")
    , path = require('path')
    , bUtils = require('./../../bCore/BUtils')
    ;

/**
 * request handler <=> Controller
 */
var rh = {

    /* controller name for logging */
    rhName:"Test Controller",

    /**
     *
     * @param temp
     * @param response
     * @param request
     */
    a:function (temp, response, request) {
        bUtils.renderTemplate(temp, response, request.connection.remoteAddress, function (output) {
        });
    },

    /**
     * @param temp
     * @param response
     * @param request
     */
    b:function (temp, response, request) {
        bUtils.renderTemplate(temp, response, {v1:'bruno', v2:'lamarlere'}, function (output) {
        });
    },

    /**
     *
     * @param temp
     * @param response
     */
    c:function (temp, response) {
        var noms = ['Robert', 'Jacques', 'David'];
        bUtils.renderTemplate(temp, response, function (output) {
        }, noms);
    },

    /**
     *
     * @param temp
     * @param response
     * @param request
     * @param data
     */
    ajaxCall:function (temp, response, request, data) {
        bUtils.renderAjaxTemplate(temp, response, data, function (output) {
        });
    },
    /**
     * @param temp
     * @param response
     * @param request
     * @param data
     */
    chat:function (temp, response, request, data) {
        bUtils.renderTemplate(temp, response, {}, function (output) {

        });
    }
};


exports.rh = rh;



