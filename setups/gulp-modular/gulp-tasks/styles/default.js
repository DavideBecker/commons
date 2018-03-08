module.exports = function (gulp, plugins) {
    return function () {
        gulp.task('styles', function () {
            gulp.src(src.css + src.cssMain)
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer())
                .pipe(cssnano())
                .pipe(sourcemaps.write('./'))

                .pipe(gulp.dest(dist.css))

            gulp.src(src.css + vendorFolder + '/**').pipe(gulp.dest(dist.css + vendorFolder));
        })

    };
};
