# angular_canvas

A set of canvas directives to create 2d canvases in a declarative way.
```
    <div view id="main" options="viewOptions" style="width:400px; height:410px; margin:0 auto;">
        <image-view options="imageOptions"></image-view>
        <fill-view options="fillOptions"></fill-view>
        <text-view options="textOptions"></text-view>
    </div>
```
Which lets you easily make semi-complex canvases with ease. In the example below there is a layered image, fill and text. 

![angular_canvas example](http://i.imgur.com/j8p9V1o.png)

## view
```
<div view options="viewOptions">
</div>
```
The view directive is an attribute directive meant to contain the other canvas based views. This directive maintains an element reference to each child canvas, and exposes it's controller for use. Any child canvas can specify to inherit it's width from the parent view

### view options
- ```scale```
The scale at which to render the canvases on rasterzation. Also, child canvases use this scale by default. This is useful for HDPI screens. For example, your View container might be set to 500px, 500px using CSS, but the canvases need to be rendered at 1000px (scale = 2), in order to appear sharp on HDPI displays. 

### view API
- ```getHeight()``` 
Returns the height of the view
- ```getWidth()```
Returns the width of the view
- ```rasterizeView(quality = 1.0)```
Rasterizes the entire view DOM as an image. This is done by creating another canvas based on the child canvases. Returns a data URI with the image encoded as a base64 string. Uses ```canvas.toDataURL("image/jpeg", quality);```

### view options
- ```scale``` The scale to render any rastered view and child canvases
- ```canvasApi``` This object gets added to the view options and exposes the ```rasterizeView``` method to the parent scope.

## image-view
The image-view directive draws a canvas with a particular image.

### image-view options
```
$scope.imageOptions = {
            image: http://placehold.it/400x410,
            layout: {
                height: "inherit",
                width: "inherit"
            }

};
```
- ```image```
The url of the image resource to draw on the canvas
- ```layout```
  - ```height``` int || "inherit": The width of the canvas
  - ```width``` int || "inherit": The width of the canvas

## text-view
The text-view directive draws a canvas with a string of text.

### text-view options
- ```text``` The text to display
- ```color``` The CSS color string for the text
- ```align``` The alignment of the text ("start","end","center","left","right")
- ```font``` The CSS font string e.g. "5em Arial,sans-serif"
- ```lineHeight``` The line height
- ```layout```
    - ```height``` The height of the canvas
    - ```width``` The width of the canvas
    - ```top``` The position of the canvas Y axis relative to the parent ```view```
    - ```left``` The position of the canvas X axis relative to the parent ```view```
    - ```padding``` The internal padding of the canvas
    
## fill-view
The fill-view directive draws a canvas with a particular color fill

### fill-view options
- ```color``` The CSS color of the fill
- ```opacity``` The opacity of the canvas
- ```layout```
    - ```height``` The height of the canvas 
    - ```width``` The width of the canvas
