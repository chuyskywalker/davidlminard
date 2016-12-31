var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var concat = require('gulp-concat');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/agency.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

var cssFiles = [
    'css/bootstrap.css',
    'css/fontello.css',
    'css/agency.css'
];
gulp.task('css', ['less'], function() {
    return gulp.src(cssFiles)
        .pipe(concat('dist.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

var jsFiles = [
    'js/jquery.js',
    'js/bootstrap.js',
    'js/jquery.easing.js',
    'js/agency.js'
];
gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(concat('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Run everything
gulp.task('default', ['less', 'css', 'js']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'watch'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('js/dist.js', browserSync.reload);
    gulp.watch('js/dist.css', browserSync.reload);
});

gulp.task('watch', ['less', 'css', 'js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch(cssFiles, ['css']);
    gulp.watch(jsFiles, ['js']);
});
