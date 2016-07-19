var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('bablify');

var src = './src/';
var dest = './dist/';

var d3 = 'd3-waveform.js';
var react = 'app.js'

gulp.task('build-d3', function () {
  return browserify(src + d3)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(rename(d3))
  .pipe(gulp.dest(dest));
});

gulp.task('build-react', function () {
    return browserify(src + react)
    .transform('babelify', { presets: ['es2015', 'react']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(rename(react))
    .pipe(gulp.dest(dest));
});

gulp.task('build', ['build-d3', 'build-react']);

gulp.task('watch', ['build'], function () {
  gulp.watch(src + d3, ['build-d3']);
  gulp.watch([src + react, src + 'react/**/*.js'], ['build-react']);
});

gulp.task('default', ['build']);
