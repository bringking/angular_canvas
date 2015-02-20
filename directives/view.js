var flex = require("css-layout");
module.exports = ["$document", function( $document ) {


    /**
     * The main canvas directive
     */
    return {
        restrict: "A",
        scope: {
            options: "=options"
        },
        controller: ["$scope", "$element", "$attrs", function( $scope, $element, $attrs ) {

            /**
             * Get the child canvases of this view
             * @returns {Array}
             */
            this.getCanvasChildren = () => {
                return [...$element.find("canvas")];
            };

            /**
             * Arrange the child canvases
             */
            this.layoutChildren = () => {

                //Set the
                this.getCanvasChildren().forEach(( c, idx ) => {
                    let el = angular.element(c);
                    el.css({
                        zIndex: idx,
                        position: "absolute",
                        top: 0,
                        left: 0
                    });
                });
            };

            /**
             * Initialize the directive
             */
            this.init = () => {
                //init options
                $scope.options.canvasApi = $scope.options.canvasApi || {};
                $scope.options.canvasApi.rasterizeView = this.rasterizeView;

                //expose our scale
                this.scale = $scope.options.scale || 1;

                $scope.height = $element[0].offsetHeight;
                $scope.width = $element[0].offsetWidth;

                //set the container style
                $element.css("position", "relative");

                //layout child canvases
                this.layoutChildren();

            };

            /**
             * Rasterize the bounds view into one image
             */
            this.rasterizeView = ( quality = 1.0 ) => {

                //create our target canvas
                let canvas = $document[0].createElement("canvas");
                canvas.height = $element[0].offsetHeight * this.scale;
                canvas.width = $element[0].offsetWidth * this.scale;

                //get our ctx
                let ctx = canvas.getContext("2d");
                this.getCanvasChildren().forEach(( c ) => {
                    let el = angular.element(c);
                    let width = parseInt(el.attr("width").replace("px", ""));
                    let height = parseInt(el.attr("height").replace("px", ""));
                    ctx.drawImage(c, 0, 0, width, height);
                });

                //create the data url
                return canvas.toDataURL("image/jpeg", quality);
            };
            /**
             * Get the height of this view
             * @returns {number|*}
             */
            this.getHeight = () => {
                return $scope.height;
            };
            /**
             * Get the width of this view
             * @returns {number|*}
             */
            this.getWidth = () => {
                return $scope.width;
            };

            //init the directive
            this.init();

        }]
    }

}];