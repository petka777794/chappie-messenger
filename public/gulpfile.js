var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	ts = require('gulp-typescript'),
	babel = require('gulp-babel');

gulp.task('server', function () {
	 browserSync.init({
		server: {
			baseDir: './'
		},
		tunnel: true,
		online: false
	});
});

gulp.task('ts', function () {
	 gulp.src('./app_ts/**/*.ts')
	 		.pipe(ts({
	 			target: "es6",
	 			module: "commonjs",
	 			moduleResolution: "node",
	 			sourceMap: true,
	 			emitDecoratorMetadata: true,
	 			experimentalDecorators: true,
	 			removeComments: false,
	 			noImplicitAny: false
	 		}))
	 		.pipe(babel({
	 			presets: ['es2015']
	 		}))
	 		.pipe(gulp.dest('./app_js/'))
	 		// .pipe(browserSync.reload({stream: true}));
});

 
gulp.task('reload', function () {
	gulp.src('./*.html')
		.pipe(browserSync.reload({stream: true}));
	gulp.src('./templates/**/*.*')
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
	 gulp.watch('./app_ts/**/*.ts', ['ts']);
	 // gulp.watch('./*.html', ['reload']);
	 // gulp.watch('./templates/**/*.*', ['reload']);
});

gulp.task('default', ['server', 'ts', 'watch']);