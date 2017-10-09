// Generate Github pages folder

module.exports = function (gulp, plugins) {
    return function () {
        gulp.task('pages:clean', function () {
            return gulp.src('./docs/').pipe(clean());
        })

        gulp.task('pages:generate', function () {
            gulp.src('index.html').pipe(gulp.dest('./docs/'))
            gulp.src(baseUrl + distUrl + '**').pipe(gulp.dest('./docs/' + baseUrl + distUrl))
        })

        gulp.task('pages', function () {
            sequence(['pages:clean'], ['pages:generate']);
        })

    };
};
