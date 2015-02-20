module.exports = ["$document", function( $document ) {

    /**
     * The main canvas directive
     */
    return {
        restrict: "A",
        scope: {
            options: "=options"
        },
        controller: "view"
    }

}];