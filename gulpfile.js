'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    notify       = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    watch        = require('gulp-watch');

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.sass')
    .pipe(sass(
      {
        includePaths: ['node_modules/modularscale-sass/stylesheets'],
        outputStyle: 'compressed'
      }
    ))
    .on('error', notify.onError(function (error) {
       return 'An error occurred while compiling SASS.\n' + error;
    }))
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest('./src'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('./src/sass/**/*.sass', ['sass']);
});

gulp.task('default', [ 'sass', 'watch' ]);
