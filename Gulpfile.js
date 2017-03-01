var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var typescript = require('gulp-typescript');
var watch = require('gulp-watch');


gulp.task('compile:js', function (cb) {
  return gulp.src('kljs.ts')
    .pipe(typescript({
      "target": "es5"
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('build:js', function (cb) {
  pump([
      gulp.src('dist/kljs.js'),
      uglify(),
      rename("kljs.min.js"),
      gulp.dest('dist')
    ],
    cb
  );
});

var browserSync = require('browser-sync');

function browserSyncInit(baseDir, files, browser) {
  browser = 'default';
  browserSync.instance = browserSync.init(files, {
    startPath: '/',
    server: {
      baseDir: baseDir,
      middleware: []
    },
    browser: browser,
    ghostMode: false
  });
}
gulp.task('watch', function(){
  return gulp.watch('kljs.ts', ['compile:js']);
});

gulp.task('build', ['compile:js', 'build:js']);

gulp.task('serve', ['watch'], function () {
  browserSyncInit('.', [
    'dist/kljs.js',
    'index.html'
  ]);
});