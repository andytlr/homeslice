var gulp = require('gulp');
var manifest = require('gulp-manifest');

var paths = {
  cache: [
      '*.html',
      '*/*.js',
      '*/*.css',
      '*/*.png'
    ]
};

gulp.task('manifest', function(){
  gulp.src(paths.cache)
    .pipe(manifest({
      hash: true,
      timestamp: false,
      filename: 'homeslice.appcache'
     }))
    .pipe(gulp.dest(''));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.cache, ['manifest']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'manifest']);