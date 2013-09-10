/************************************
 * Par: bruno lamarlere             *
 * Le: 09/07/13                     *
 * brunolamarlere@gmail.com         *
 * Jusqu'à l'infini et au dela...   *
 *				    *
 * server launcher...		    *
 * # node starter.js		    *
 ************************************/

/** libraries */
var bServer = require('./bServer/BServer')
    , bRouter = require('./bCore/BRouter')
    , bUtils = require('./bCore/BUtils')
//    , bcontroller = require('./bCore/BController')
;

/** Controllers  */
var CT = require('./bApp/controller/controllerTest');
  //,otherController = require('./bApp/controller/otherController');

/** Routes  */
var routeTest = require('./BConf').routeTest;
  //,other routeObject;

/** url/action/template list */
var controllers = [
    bUtils.routeParser(routeTest, CT)
  //,bUtils.routeParser(otherRoutes, otherController)
];

/*** launch server */
try {
    bServer.start(bRouter, bUtils.requestMapping(controllers), controllers);
} catch (e) {
    console.log(e);
}
