colors          = require('colors')


// Terminal theming for the colors module
module.exports.colorTheme = colorTheme = {
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
};
colors.setTheme(colorTheme)

// How ESLint error severities should be displayed (By default ESLint just shows 0, 1, 2)
module.exports.eslintErrorSeverity = [
    'none',         // 0
    'Warning'.warn, // 1
    'FATAL'.error   // 2
];


///////////////////
// Folder config //
///////////////////

///////////
// Basic //

// baseUrl: Appended to pretty much all paths.
// Helpful for relative folders outside the working directory or absolute paths
module.exports.baseUrl = baseUrl = './';

// vendorFolder: For libraries and other external resources. Most tasks don't touch
// the contents of those folders and just move them to the output folder
module.exports.vendorFolder = vendorFolder ='vendor/';

///////////
// Input //

// This is only used in the next option and serves as a shortcut, so
// you only have to edit it once. If you want different input folders, you can
// edit the next option
inputFolder = 'assets/';
outputFolder = 'assets/';

// Here you can specify where the various tasks should look for source files. And where the
// files for releases should go.

module.exports.resources = resources = {
    css: {
        in:  baseUrl + inputFolder  + 'styles/**',
        out: baseUrl + outputFolder + 'css/'
    },

    js: {
        in:  baseUrl + inputFolder  + 'scripts/**',
        out: baseUrl + outputFolder + 'js/'
    },

    img: {
        in:  baseUrl + inputFolder  + 'images/**',
        out: baseUrl + outputFolder + 'img/'
    },

    svg: {
        in:  baseUrl + inputFolder  + 'vectors/**',
        out: baseUrl + outputFolder + 'svg/'
    },

    data: {
        in:  baseUrl + inputFolder  + 'data/**',
        out: baseUrl + outputFolder + 'data/'
    },

    fonts: {
        in:  baseUrl + inputFolder  + 'fonts/**',
        out: baseUrl + outputFolder + 'fonts/'
    }
}


// Some tasks require a single entry file. Specify their path here.
// You can ignore this if you don't have any tasks enabled that need them.
module.exports.entryFiles = entryFiles = {
    // 'js': src.js + 'main.js',
    // 'css': src.css + 'main.sass',
}






// Everything below here is just various automatic configuration.
// No need to touch that.

// Exclude the vendor folder from
var pipes = {}

for(var category in resources) {
    pipes[category] = {
        "in":  [resources[category].in,  '!' + resources[category].in  + vendorFolder + '**'],
        "out": [resources[category].out, '!' + resources[category].out + vendorFolder + '**']
    }
}

module.exports.pipe = pipes
