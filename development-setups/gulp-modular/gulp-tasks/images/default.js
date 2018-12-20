module.exports = function (gulp, plugins) {
    return function () {
        gulp.task('images', function () {
            gulp.src(src.img)
                .pipe(imagemin({
                    progressive: true
                }))

                .pipe(gulp.dest(dist.img))
        });

    };
};
