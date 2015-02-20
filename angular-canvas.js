require("babel/polyfill");
require('angular');

/**
 * Create our angular canvas module
 */
var app = angular.module("angularCanvas", []);

//bring in dependencies
require("./controllers/index");
require("./directives/index");


//add a run function
app.run(["$log", function( $log ) {
    $log.info("angularCanvas running");
}]);

//export
module.exports = app;