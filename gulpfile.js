var gulp = require('gulp');
var browserify = require('gulp-browserify');

// Basic usage
gulp.task('example', function() {

    gulp.src('./angular-canvas.js')
        .pipe(browserify({
            insertGlobals: true,
            transform: ['babelify'],
            debug: true
        }))
        .pipe(gulp.dest('./example/js'))
});

/**
 * Simple watcher that watches for certain changes, and launches the appropriate tasks
 */
gulp.task('watch', ['example'], function() {
    //watch for JS changes
    gulp.watch('./directives/**/*.*', ['example']);
    gulp.watch('./controllers/**/*.*', ['example']);
});

gulp.task("default", ['watch']);