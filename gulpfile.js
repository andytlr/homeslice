var gulp = require('gulp');
var manifest = require('gulp-manifest');

gulp.task('default', function () {

});

gulp.task('manifest', function(){
  gulp.src([
      '*.html',
      '*/*.js',
      '*/*.css',
      '*/*.png'
    ])
    .pipe(manifest({
      hash: true,
      timestamp: false,
      // network: ['http://*', 'https://*', '*'],
      filename: 'homeslice.appcache'
     }))
    .pipe(gulp.dest(''));
});