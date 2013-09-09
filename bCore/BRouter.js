/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 ************************************/
var fs = require('fs');
var bController = require('./../bCore/BController');

/**
 *
 * @param controller action/template à utiliser
 * @param response
 * @param request
 */
function route(controller, response, request) {

    //  404
    if (controller == "error404") {
        controller = {action:bController.rh.error404, template:"error404"};
    }

    // routing to action with template
    if (typeof controller.action === 'function') {
        var temp = typeof controller.template != 'string' ? "default" : controller.template;

        return controller.action(temp, response, request);
    }
    // should never go there....
    else {
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("oups... something reeeealy bad append ...");
        response.end();
    }
}

exports.route = route;
