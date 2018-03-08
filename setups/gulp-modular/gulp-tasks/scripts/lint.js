var gulp = require('gulp')
var eslint = require('gulp-eslint')

var config = require('../config')
var helpers = require('../helpers')

module.exports = function () {
    gulp.task('scripts:lint', function () {
        gulp.src(config.pipe.js.in)
            .pipe(eslint({
                fix: false,
                useEslintrc: true
            }))
            .pipe(eslint.result(helpers.prettyLint))
    })
};
