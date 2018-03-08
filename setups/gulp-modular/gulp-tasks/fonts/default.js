module.exports = function (gulp, plugins) {
    return function () {
        gulp.task('fonts', function () {
            gulp.src(src.fonts)
                .pipe(gulp.dest(dist.fonts))
        });
    };
};
