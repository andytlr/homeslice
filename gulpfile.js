var gulp = require('gulp');
var manifest = require('gulp-manifest');

gulp.task('default', function () {

});

gulp.task('manifest', function(){
  gulp.src([
      '*.html',
      'assets/*.js',
      'assets/*.css',
      'assets/*.png',
      'vendor/*.js'
    ])
    .pipe(manifest({
      hash: true,
      timestamp: false,
      network: ['http://*', 'https://*', '*'],
      filename: 'homeslice-new.appcache'
     }))
    .pipe(gulp.dest(''));
});