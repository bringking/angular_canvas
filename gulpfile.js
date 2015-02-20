var gulp = require('gulp');
var browserify = require('gulp-browserify');

// Basic usage
gulp.task('example', function() {

    gulp.src('modules/angular-canvas.js')
        .pipe(browserify({
            insertGlobals: true,
            transform: ['6to5ify'],
            debug: !gulp.env.production
        }))
        .pipe(gulp.dest('./example/js'))
});

/**
 * Simple watcher that watches for certain changes, and launches the appropriate tasks
 */
gulp.task('watch', ['example'], function() {
    //watch for JS changes
    gulp.watch('./modules/**/*.*', ['example']);
});

gulp.task("default", ['watch']);