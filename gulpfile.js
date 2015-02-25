(function () {
  'use strict';
  var requirejs = require('requirejs'),
    gulp = require('gulp'),
    child_process = require('child_process'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    LESS_DIR = 'app/assets/stylesheets',
    JS_DIR = 'app/assets/javascripts',
    CSS_DIST = 'public/assets/css',
    JS_DIST = 'public/assets/js';

  gulp.task('clean', function (cb) {
    del(['public/assets'], cb);
  });

  gulp.task('images', ['clean'], function () {
    return gulp.src('app/assets/images/*')
        .pipe(imagemin({ optimizationLevel: 0 }))
        .pipe(gulp.dest('public/assets/images'));
  });

  gulp.task('vendor', ['clean'], function () {
    return gulp.src('vendor/requirejs/require.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/vendor'));
  });

  gulp.task('css', ['clean'], function () {
    return gulp.src(LESS_DIR + '/application.less')
        .pipe(changed(CSS_DIST))
        .pipe(less())
        .pipe(gulp.dest(CSS_DIST));
  });

  gulp.task('js', ['clean'], function () {
    return requirejs.optimize({
        baseUrl: JS_DIR,
        include: ['application.js'],
        out: JS_DIST + '/application.js',
        paths: {
          jquery: '../../vendor/jquery/dist/jquery',
          underscore: '../../vendor/underscore/underscore',
          backbone: '../../vendor/backbone/backbone'
        },
        waitSeconds: 15,
        optimize: 'uglify2',
        generateSourceMaps: true,
        preserveLicenseComments: false,
        useSourceUrl: true
      });
  });

  gulp.task('build', ['clean', 'css', 'js', 'vendor', 'images']);

  gulp.task('watch', function () {
    gulp.watch('app/**/*', ['build']);
  });

  gulp.task('default', ['build', 'watch']);
}());
