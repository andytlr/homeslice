var gulp = require('gulp');
var manifest = require('gulp-manifest');

var paths = {
  assets: ['assets/*', 'vendor/*']
};

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
      filename: 'homeslice.appcache'
     }))
    .pipe(gulp.dest(''));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.assets, ['manifest']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'manifest']);