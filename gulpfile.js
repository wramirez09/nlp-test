const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var babelify    = require('babelify');

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

gulp.task("default", ['sass:watch', 'scripts:watch'])



gulp.task('build', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './build/js/app.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('public/js/app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(livereload());
});

function bundle (bundler) {

    // Add options to add to "base" bundler passed as parameter
    bundler
      .bundle()                                                        // Start bundle
      .pipe(source(paths.js_build_path))                        // Entry point
      .pipe(buffer())                                               // Convert to gulp pipeline
      .pipe(rename(paths.public.js))          // Rename output from 'main.js'
                                                                              //   to 'bundle.js'
      .pipe(sourceMaps.init({ loadMaps : true }))  // Strip inline source maps
      .pipe(sourceMaps.write("/"))    // Save source maps to their
                                                                                      //   own directory
      .pipe(gulp.dest(paths.public.js))        // Save 'bundle' to build/
      .pipe(livereload());                                       // Reload browser if relevant
}

gulp.task('bundle', function () {
    var bundler = browserify(paths.js_build_path)  // Pass browserify the entry point
                                .transform(babelify, { presets : [ 'es2015' ] });  // Then, babelify, with ES2015 preset

    bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
})
