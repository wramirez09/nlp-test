var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
    console.log("gulp installed")
});

gulp.task('sass', function () {
    return gulp.src('./build/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./build/css/**/*.scss', ['sass']);
});