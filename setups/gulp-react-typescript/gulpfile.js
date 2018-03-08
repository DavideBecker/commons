"use strict";
const conf = require('./config.json');

console.log(conf)

const gulp = require('gulp');
const gutil = require('gulp-util');
const merge = require('merge2');
const streamify = require('gulp-streamify');
const runSequence = require('run-sequence');

const persistify = require('persistify');
const tsify = require('tsify');
const uglify = require('gulp-uglify');
const scssify = require('scssify');

const source = require('vinyl-source-stream');
const nodemon = require('gulp-nodemon');

const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');

const yargs = require('yargs');
const argv = yargs.argv;

const browserSync = require('browser-sync')

const isProduction = conf.environment === 'production';

if (isProduction) {
	process.env.NODE_ENV = 'production';
}

function swallowError(error) {
	console.log(error.toString());
	this.emit('end');
}

function buildHtml() {
	let buildStartTime = null;
	let buildEndTime = null;

	function run() {
		buildStartTime = new Date();

		let stream = gulp.src(conf.html.in)
		.on('error', swallowError)
		.on('end', () => {
			buildEndTime = new Date();
			gutil.log(`Building HTML done. (Time elapsed ${buildEndTime - buildStartTime}ms.)`);
		})

		if(isProduction) {
			stream.pipe(htmlmin({collapseWhitespace: true}));
		}

		return stream.pipe(gulp.dest(conf.html.out));
	} 

	if(!argv.once) {
		gulp.watch(conf.html.in, () => {
			gutil.log('Detect HTML changes. Rebuilding...');
			return run();
		});
	}

	return run();
}

function buildScript() {
	const opts = Object.assign({
		debug: !isProduction
	});
	const b = persistify(opts, {
			watch: !!!argv.once
		})
		.add(conf.js.in)
		.on('update', bundle)
		.on('log', gutil.log)
		.external(conf.js.vendors)
		.plugin(tsify)
		.transform(scssify, {
			autoInject: true,
			sass: {
				"includePaths": [conf.css.in]
			}
		});

	function bundle() {
		let stream = b.bundle()
			.on('error', swallowError)
			.on('end', () => {
				gutil.log(`Building JS:bundle done.`);
				browserSync.reload();
			})
			.pipe(source('bundle.js'));

		if (isProduction) {
			stream.pipe(streamify(uglify()));
		}

		return stream.pipe(gulp.dest(conf.js.out));
	}

	return bundle();
};

function buildVendor() {
	const b = persistify({
		debug: false
	}, {
		watch: !!!argv.once
	});

	conf.js.vendors.forEach(vendor => {
		b.require(vendor);
	});

	let stream = b.bundle()
		.on('error', swallowError)
		.on('end', () => {
			gutil.log(`Building JS:vendor done.`);
			browserSync.reload();
		})
		.pipe(source('vendor.js'));

	if (isProduction) {
		stream.pipe(streamify(uglify()));
	}

	return stream.pipe(gulp.dest(conf.js.out));
}

function buildSass() {
	let buildStartTime = null;
	let buildEndTime = null;

	function run() {
		buildStartTime = new Date();

		let stream = gulp.src(conf.css.in)
			.on('error', swallowError)
			.on('end', () => {
				buildEndTime = new Date();
				gutil.log(`Building Sass done. (Time elapsed ${buildEndTime - buildStartTime}ms.)`);
			})
			.pipe(
				sass()
				.on('error', sass.logError)
			);

		if (isProduction) {
			stream.pipe(cssnano());
		}

		return stream.pipe(gulp.dest(conf.css.out))
			.pipe(browserSync.stream());
	}

	if (!argv.once) {
		gulp.watch(conf.css.in, () => {
			gutil.log('Detect Sass changes. Rebuilding...');
			return run();
		});
	}

	return run();
}


function serve() {
	let serverStarted = false;

	nodemon({
			script: 'server.js',
			ignore: ['src/**', 'build/**']
		})
		.on('start', () => {
			if (!serverStarted) {
				serverStarted = true;

				browserSync.init(null, {
					proxy: `localhost:${conf.server.port || 3000}`,
					port: conf.server.proxyPort || 4000
				});

				gulp.watch(conf.html.in, buildHtml).on('change', browserSync.reload);
				gulp.watch(conf.css.in, buildSass);

				// return empty stream
				return gutil.noop();
			}
		});
}


// gulp.task('html:build', function () {
//     return gulp.src(conf.css.in)
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest(conf.css.out))
// });

// gulp.task('build', ['scripts:build', 'styles:build']);

// gulp.task('default', ['build'], function () {
//     gulp.watch(conf.js.in, ['scripts:build']);
//     gulp.watch(conf.css.in, ['styles:build']); 
// });





gulp.task('build', () => {
	return merge([
		buildHtml(),
		buildSass(),
		buildScript(),
		buildVendor()
	]);
});

gulp.task('build::html', () => {
	return buildHtml();
});

gulp.task('build::scss', () => {
	return buildSass();
});

gulp.task('build::script', () => {
	return merge([
		buildJs(),
		buildVendor()
	]);
});

gulp.task('serve', () => {
	return serve();
});

gulp.task('default', () => {
	runSequence('build', 'serve');
});