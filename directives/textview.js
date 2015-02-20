module.exports = [function() {
    /**
     * The main canvas directive
     */
    return {
        restrict: "E",
        scope: {
            options: "=options"
        },
        transclude: true,
        require: '^view',
        template: `<canvas></canvas>`,
        link( scope, element, attrs, view ) {

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

            //function to draw the header text
            function draw_text() {

                //prepare canvas
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.textAlign = scope.options.align;
                context.font = scope.options.font;
                context.fillStyle = scope.options.color;

                //let padding = getPadding();
                let maxWidth = (canvas.width - scope.options.layout.padding * view.scale);
                let lineHeight = scope.options.lineHeight;
                let x = canvas.width / 2;//scope.options.left || 0; //(canvas.width - maxWidth) / 2;
                let y = scope.options.layout.top || 0;

                let words = scope.options.text.split(' ');
                let line = '';

                for ( let n = 0; n < words.length; n++ ) {

                    let testLine = line + words[n] + ' ';
                    let metrics = context.measureText(testLine);
                    let testWidth = metrics.width;

                    if ( testWidth > maxWidth && n > 0 ) {
                        context.fillText(line, x, y);
                        line = words[n] + ' ';
                        y += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }

                context.fillText(line, x, y);
            }

            //add watcher
            scope.$watch("options", function() {
                draw_text();
            },true);

            //draw initial
            setBounds();
            draw_text();
        }
    }

}];