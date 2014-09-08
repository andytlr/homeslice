var gulp   = require('gulp');
var rev    = require('gulp-rev');

gulp.task('default', function () {
  return gulp.src(['assets/*.js', 'assets/*.css', 'assets/*.png'])
    .pipe(rev())
    .pipe(gulp.dest('dist'));
});