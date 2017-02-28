var gulp = require('gulp');
var pug = require('gulp-pug');

gulp.task('pug', function () {
    gulp.src('./views/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function () {
    gulp.watch('./views/*.pug', ['pug'])
});

gulp.task('default', ['pug', 'watch'])