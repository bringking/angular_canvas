module.exports = [function() {
    /**
     * The main canvas directive
     */
    return {
        restrict: "E",
        scope: {
            options: "=options"
        },
        require: '^view',
        transclude: true,
        template: `<canvas></canvas>`,

        link( scope, element, attrs, view ) {

            //register with the parent view
            view.registerChild(scope.options.layout);
            
            /**
             * Get our canvas
             */
            const canvas = element.children("canvas")[0];

            /**
             * Get our canvas context
             * @type {CanvasRenderingContext2D}
             */
            const context = canvas.getContext("2d");

            /**
             * Draw the image body
             * @param img
             */
            function draw_image( img ) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            }

            /**
             * Set the height and width of this element
             */
            function setBounds() {
                let el = angular.element(canvas);

                //set initial style
                if ( scope.options.layout.height === "inherit" ) {
                    let viewHeight = view.getHeight();
                    el.css("height", `${viewHeight}px`);
                    el.attr("height", `${viewHeight * view.scale}px`);
                } else {
                    el.css("height", `${scope.options.layout.height}px`);
                    el.attr("height", `${scope.options.layout.height * view.scale}px`);
                }
                //set initial style
                if ( scope.options.layout.width === "inherit" ) {
                    let viewWidth = view.getWidth();
                    el.css("width", `${viewWidth}px`);
                    el.attr("width", `${viewWidth * view.scale}px`);
                } else {
                    el.css("width", `${scope.options.layout.width}px`);
                    el.attr("width", `${scope.options.layout.width * view.scale}px`);
                }
            }

            //add watcher
            scope.$watch("options", function() {
                var img = new Image();
                img.src = scope.options.image.src;
                img.setAttribute('crossOrigin', 'anonymous');

                img.onload = () => {
                    draw_image(img);
                };

            }, true);

            //set the initial bounds
            setBounds();
        }
    }

}];