'use strict';

var gulp = require('gulp')
var path = require('path')
var sequence = require('run-sequence')

var config = require('./gulp-tasks/config.js')


// Configure which tasks should be loaded
var activeTasks = {
    scripts: ['default', 'lint']
}


// Load all active tasks
for(var category in activeTasks) {
    var tasks = activeTasks[category];

    for(var i in tasks) {
        var task = tasks[i];

        require('./' + path.join('./gulp-tasks', category, task + '.js'))()
    }
}


// Watch task
gulp.task('watch', function() {
    electron.start();

    gulp.watch('./main.js', ['reload:browser']);

    gulp.watch('./src/main.html', ['reload:view']);

    gulp.watch(config.src.css + '**', ['styles', 'reload:view']);

    gulp.watch(config.src.js + '**', ['scripts', 'reload:view']);

    gulp.watch(config.src.fonts, ['fonts', 'reload:view']);
})

// Cleanup Task
gulp.task('clean', function() {
    var cleanPaths = []

    for(var resource in config.resources) {
        cleanPaths.push(config.resources[resource].out)
    }

    console.log(cleanPaths)

    // gulp.src(cleanPaths)
    //     .pipe(clean());
})

// Default task
gulp.task('default', function() {
    sequence('clean', ['scripts:lint']);
})
