var gulp        = require('gulp');
var fingerprint = require('gulp-fingerprint');

// rev-manifest.json produced from gulp-rev
var manifest = require('../../dist/rev-manifest');

gulp.task('default', function () {
  var options = {
    base: 'assets/',
    prefix: '//cdn.example.com/',
    verbose: true
  };

  return gulp.src('.tmp/styles/app.css')
    .pipe(fingerprint(manifest, options))
    .pipe(gulp.dest('dist'));
});