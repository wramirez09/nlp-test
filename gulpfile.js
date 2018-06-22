const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
var browserify = require('gulp-browserify');

let paths = {
    js_build_path: './build/js/app.js',
    sass_build_path: './build/css/**/*.scss',
    public: {
        js: './public/js/',
        css: './public/css/'
    }
}


gulp.task('scripts', () => {
    gulp.src(paths.js_build_path)
        .pipe(sourcemaps.init())
        .pipe(
            browserify({
                transform:['babelify']
            })
        )
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.public.js));
    }
);

gulp.task('scripts:watch', ()=>{
    gulp.watch(paths.js_build_path, ["scripts"])
})

gulp.task('sass', function () {
    return gulp.src(paths.sass_build_path)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.public.css));
});

gulp.task('sass:watch', function () {
    gulp.watch(paths.sass_build_path, ['sass']);
});

gulp.task("default", ['sass:watch', 'scripts:watch']);
