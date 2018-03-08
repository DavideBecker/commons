var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')

var config = require('../config')
var helpers = require('../helpers')

module.exports = function () {
    gulp.task('scripts', function () {
        gulp.src(config.pipe.js.in)
            .pipe(sourcemaps.init())
            // .pipe(concat(src.jsMain)).on('error', errorHandler)
            // .pipe(include({
            //     includePaths: [
            //         path.join(__dirname, 'src', 'scripts'),
            //     ]
            // }))
            // .on('error', console.log)
            // .pipe(gulp.dest(dist.js))
            .pipe(uglify()).on('error', helpers.errorHandler)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.resources.js.out))

        gulp.src(config.resources.js.in + config.vendorFolder + '/**').pipe(gulp.dest(config.resources.js.out + config.vendorFolder));
    });
};
