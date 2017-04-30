const gulp = require('gulp');
const util = require('gulp-util');

require('./gulp-tasks/app');
require('./gulp-tasks/deps');
require('./gulp-tasks/server');

gulp.task('default', () => {
  if (util.env.production) gulp.start('deps', 'app');
  else gulp.start('deps', 'app', 'server');
});