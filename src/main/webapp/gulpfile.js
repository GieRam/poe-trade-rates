var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');


gulp.task('scripts', function() {
    var b = browserify({
        entries: ['assets/app.js'],
        debug: true
    });
    return b
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/'))
    ;
});

gulp.task('default',['scripts']);