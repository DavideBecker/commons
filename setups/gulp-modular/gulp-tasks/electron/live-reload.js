// Electron live reload
electron = require('electron-connect'),

    module.exports = function (gulp, plugins) {
        return function () {
            electron = electron.server.create()

            gulp.task('reload:browser', function () {
                electron.restart();
            })

            gulp.task('reload:view', function () {
                electron.reload();
            })

        };
    };
