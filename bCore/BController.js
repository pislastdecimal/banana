/************************************
 * Par: bruno                     *
 * Le: 09/07/13                      *
 *                                  *
 * Jusqu'à l'infini et au dela...   *
 ************************************/

 var errTmp = require('../bApp/template/views/error404.nana');


exports.rh = {
    rhName:"Default Controller",
    index:function () {
    },
    error404:function (template, response) {
        response.writeHead(404, {"Content-Type":"text/html"});

        response.write(errTmp.template());

        response.end();
    }

}
