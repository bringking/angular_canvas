var app = angular.module('angularCanvas');
//define directives here
app.directive('textView', require('./textview'));
app.directive('imageView', require('./imageview'));
app.directive('fillView', require('./fillview'));
app.directive('view', require('./view'));

