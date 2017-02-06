/// <binding Clean='clean' />
'use strict';

// process.env.BROWSERIFYSHIM_DIAGNOSTICS=1

var gulp = require('gulp'),
  argv = require('yargs').argv,
  browserify = require('browserify'),
  browserifyShim = require('browserify-shim'),
  buffer = require('vinyl-buffer'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  cssnext = require('postcss-cssnext'),
  gulpif = require('gulp-if'),
  precss = require('precss'),
  postcss = require('gulp-postcss'),
  rimraf = require('rimraf'),
  runSequence = require('run-sequence'),
  source = require('vinyl-source-stream'),
  transform = require('vinyl-transform'),
  typescript = require('gulp-typescript'),
  uglify = require('gulp-uglify');

//
// Configuration
//

var paths = {
  source: './src/',
  output: './www/'
};

var build = {
  input: {
    files: {
      // Source to compile
      ts: [
        paths.source + '**/*.ts',
        paths.source + '**/*.tsx'
      ],

      // Styles
      styles: paths.source + 'styles/**/*.pcss',
      stylesMin: paths.source + 'styles/**/*.min.css',

      // Fonts
      fonts: paths.source + 'fonts/**/*.ttf',

      // Scripts
      scripts: paths.source + 'scripts/**/*.js',
      scriptsMin: paths.source + 'scripts/**/*.min.js',

      vendor_js: [
        'history',
        'react',
        'react-dom',
        'react-router',
        'redux',
        'react-redux'
      ],
      extern_js: [
        'node_modules/q/q.js'
      ],
      polyfill_js: [
        paths.source + 'polyfills/Object.assign.js'
      ],

      // Miscellaneous files to copy
      images: [paths.source + 'images/**/*.{jpg,png}'],
      root: [paths.source + 'favicon.ico'],
      views: [paths.source + 'views/**/*.vash']
    }
  },
  output: {
    files: {
      styles: paths.output + 'styles/site.css',
      scripts: paths.output + 'scripts/site.js'
    },
    dirs: {
      ts: paths.output,
      images: paths.output + 'images',
      root: paths.output,
      styles: paths.output + 'styles',
      fonts: paths.output + 'fonts',
      scripts: paths.output + 'scripts',
      polyfills: paths.output + 'polyfills',
      views: paths.output + 'views'
    }
  },
  other: {
    clean: ['output/*', 'build/*'],
    output_typings: 'output/typings',
    // An intermediate file; output from tsx, input to bundle.
    client_js: [paths.output + 'app/client.js']
  }
};

//
// Basic tasks
//

gulp.task('clean:scripts', function (cb) {
  rimraf(build.output.files.scripts, cb);
});

gulp.task('clean:styles', function (cb) {
  rimraf(build.output.files.styles, cb);
});

gulp.task('clean:output', function (cb) {
  rimraf(paths.output, cb);
});

gulp.task('clean', ['clean:scripts', 'clean:styles']);

gulp.task('scripts', function () {
  gulp.src([build.input.files.scripts, '!' + build.input.files.scriptsMin], {base: '.'})
    .pipe(concat(build.output.files.scripts))
    .pipe(gulpif(argv.production || argv.staging, uglify()))
    .pipe(gulp.dest('.'));
});

gulp.task('styles', function () {
  var processors = [
    cssnext,
    precss
  ];
  gulp.src([build.input.files.styles, '!' + build.input.files.stylesMin])
    .pipe(postcss(processors))
    .pipe(concat(build.output.files.styles))
    .pipe(gulpif(argv.production || argv.staging, cssmin()))
    .pipe(gulp.dest('.'));
});

gulp.task('min', ['scripts', 'styles']);

//
// Compilation and packaging
//

gulp.task('typescript', function () {
  var tsResult = gulp
    .src(build.input.files.ts)
    .pipe(typescript({
      noImplicitAny: false,
      noEmitOnError: true,
      declarationFiles: true,
      noExternalResolve: false,
      removeComments: false,
      module: 'commonjs',
      diagnostics: true,
      sourceMap: true,
      target: 'ES6',
      jsx: 'react'
    }));

  return tsResult.js
    .pipe(gulp.dest(build.output.dirs.ts));
});

gulp.task('vendor', function () {
  return browserify({
    insertGlobals: true
  })
    .transform(browserifyShim)
    .require(build.input.files.vendor_js)
    .add(build.input.files.polyfill_js)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('vendor.js'))
    // http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
    // Convert from streaming to buffered vinyl file object for uglify
    .pipe(gulpif(argv.production || argv.staging, buffer()))
    .pipe(gulpif(argv.production || argv.staging, uglify()))
    .pipe(gulp.dest(build.output.dirs.scripts));
});

gulp.task('app', function () {
  return browserify({
    insertGlobals: true,
    entries: build.other.client_js
  })
    .transform(browserifyShim)
    .external(build.input.files.vendor_js)
    // .add(build.input.files.polyfill_js)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('app.js'))
    // http://stackoverflow.com/questions/24992980/how-to-uglify-output-with-browserify-in-gulp
    // Convert from streaming to buffered vinyl file object for uglify
    .pipe(gulpif(argv.production || argv.staging, buffer()))
    .pipe(gulpif(argv.production || argv.staging, uglify()))
    .pipe(gulp.dest(build.output.dirs.scripts));
});

//
// Copy tasks
//

gulp.task('extern', function () {
  return gulp.src(build.input.files.extern_js)
    .pipe(gulp.dest(build.output.dirs.scripts));
});

gulp.task('polyfills', function () {
  return gulp.src(build.input.files.polyfill_js)
    .pipe(gulp.dest(build.output.dirs.polyfills));
});

gulp.task('images', function () {
  return gulp.src(build.input.files.images)
    .pipe(gulp.dest(build.output.dirs.images));
});

gulp.task('root', function () {
  return gulp.src(build.input.files.root)
    .pipe(gulp.dest(build.output.dirs.root));
});

gulp.task('views', function () {
  return gulp.src(build.input.files.views)
    .pipe(gulp.dest(build.output.dirs.views));
});

gulp.task('fonts', function () {
  return gulp.src(build.input.files.fonts)
    .pipe(gulp.dest(build.output.dirs.fonts));
});

gulp.task('copy', ['scripts', 'styles', 'fonts', 'polyfills', 'images', 'root', 'views'], function () {
});

gulp.task('compile', function (callback) {
  runSequence(['typescript'], ['vendor', 'app'], callback);
});

gulp.task('recompile', function (callback) {
  runSequence('typescript', 'app', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean', 'copy', 'compile', callback);
});

gulp.task('watch', function () {
  gulp.watch(build.input.files.ts, ['recompile']);
  gulp.watch(build.input.files.views, ['views']);
  gulp.watch(build.input.files.styles, ['styles']);
});

gulp.task('dev', function (callback) {
  runSequence('build', 'watch', callback);
});

// The default task (called when running 'gulp' from the command line).
gulp.task('default', ['copy', 'compile'], function () {
});
