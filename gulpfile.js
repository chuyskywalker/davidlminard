var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');

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
        .pipe(gulp.dest('dist'))
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
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copy', function() {

    gulp.src(['css/fontello*', '!css/fontello.css'])
        .pipe(gulp.dest('dist/'));

    gulp.src('img/*')
        .pipe(gulp.dest('dist/img/'));
});

// Run everything
gulp.task('default', ['less', 'css', 'js', 'copy', 'audio-njk', 'index-njk']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        open: false
    })
});

gulp.task('audio-njk', function() {
  return gulp.src('audio.njk')
    .pipe(data(function(){return requireUncached('./data.json')}))
    .pipe(nunjucksRender({path: ['.']}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('dist/audio'))
});

gulp.task('index-njk', function() {
  return gulp.src('index.njk')
    .pipe(nunjucksRender({path: ['.']}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('dist'))
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'watch'], function() {
    gulp.watch('dist/**', browserSync.reload);
});

gulp.task('watch', ['default'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch(cssFiles, ['css']);
    gulp.watch(jsFiles, ['js']);
    gulp.watch(['index.njk'], ['index-njk']);
    gulp.watch(['audio.njk', 'data.json'], ['audio-njk']);
    gulp.watch(['img/*', 'css/fontello*', '!css/fontello.css'], ['copy']);
});

function requireUncached( $module ) {
    delete require.cache[require.resolve( $module )];
    return require( $module );
};
