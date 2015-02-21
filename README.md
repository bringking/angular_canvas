# angular_canvas
## Coming soon
I hope to update this with the ability to layout canvas using the awesome [css layout](https://github.com/facebook/css-layout) lib from Facebook.
## Overview
A set of canvas directives to create 2D canvases in a declarative way.
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
- ```scale``` Number:
The scale at which to render the canvases on rasterzation. Also, child canvases use this scale by default. This is useful for HDPI screens. For example, your View container might be set to 500px, 500px using CSS, but the canvases need to be rendered at 1000px (scale = 2), in order to appear sharp on HDPI displays. 
- ```canvasApi``` Object: This object gets added to the view options and exposes the ```rasterizeView``` method to the parent scope.

### view API
- ```getHeight()``` 
Returns the height of the view
- ```getWidth()```
Returns the width of the view
- ```rasterizeView(quality = 1.0)```
Rasterizes the entire view DOM as an image. This is done by creating another canvas based on the child canvases. Returns a data URI with the image encoded as a base64 string. Uses ```canvas.toDataURL("image/jpeg", quality);```

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
  - ```height``` Number || "inherit": The width of the canvas
  - ```width``` Number || "inherit": The width of the canvas

## text-view
The text-view directive draws a canvas with a string of text.

```
$scope.textOptions = {
    text: "Hello this is some long text",
    color: "#fff",
    align: "center",
    font: "5em Arial,sans-serif",
    lineHeight: 45,
    layout: {
        height: "inherit",
        width: "inherit",
        top: 80,
        left: 0,
        padding: 12
    }
};
```

### text-view options
- ```text``` String: The text to display
- ```color``` String: The CSS color string for the text
- ```align``` String: The alignment of the text ("start","end","center","left","right")
- ```font``` String: The CSS font string e.g. "5em Arial,sans-serif"
- ```lineHeight``` Number: The line height
- ```layout```
    - ```height``` Number: The height of the canvas
    - ```width``` Number: The width of the canvas
    - ```top``` Number: The position of the canvas Y axis relative to the parent ```view```
    - ```left``` Number: The position of the canvas X axis relative to the parent ```view```
    - ```padding``` Number: The internal padding of the canvas
    
## fill-view
The fill-view directive draws a canvas with a particular color fill

### fill-view options
- ```color``` String: The CSS color of the fill
- ```opacity``` Number: The opacity of the canvas 
- ```layout```
    - ```height``` Number||"inherit": The height of the canvas 
    - ```width``` Number||"inherit": The width of the canvas
