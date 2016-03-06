'use strict';
var $      = require('gulp-load-plugins')(),
browser    = require('browser-sync'),
concat     = require('gulp-concat'),
//concatCSS  = require('gulp-concat-css'),
del        = require('del'),
gulp       = require('gulp'),
//imagemin   = require('gulp-imagemin'),
less       = require('gulp-less'),
minifyCss  = require('gulp-cssnano'),
//minifyJS   = require('gulp-uglify'),
order      = require('gulp-order'),
postcss    = require('gulp-postcss'),
prefix     = require('autoprefixer'),
rename     = require('gulp-rename'),
sass       = require('gulp-sass'),
sequence   = require('run-sequence'),
sourcemaps = require('gulp-sourcemaps'),
// uglify     = require('gulp-uglify'),
uncss      = require('gulp-uncss'),
when       = require('gulp-if'),
zip        = require('gulp-zip');

// To build production-ready run the following:
// npm run build
// It will run the following code:
// NODE_ENV=production gulp
var env = process.env.NODE_ENV || 'development';

// This defines how the main-style.css file is generated. 'bothCSS' loses sourcemap for pre-compiled files and the order they are concatenated is *.css, main.less, main.sass
var cssLang = 'sassOnly'; // can be 'sassOnly', 'lessOnly' or 'bothCSS'

// Port to use for the development server.
var PORT = 8000;

// URL for the development server.
// Example: var URL = 'http://localwebsite.dev'
var URL = 'http://localhost/themes-garden';

//Set the name for the theme.zip file
var THEME = 'production build';

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  assets: [
    'src/assets/**/*',
    '!src/assets/{img,js,css,scss,less}/**/*'
  ],
  css: [
    'src/assets/css/**/*.css'
  ],
  sass: {
    temp: 'src/assets/css/zzzz-scss-to-css/',
    main: 'src/assets/css/scss/main.scss',
    rest: [
    'bower_components/foundation-sites/scss/',
    'bower_components/motion-ui/src/',
    'bower_components/bootstrap-sass/assets/stylesheets/',
    'bower_components/material-design-lite/src/'
    ]
  },
  less: {
    temp: 'src/assets/css/zz-less-to-css/',
    main: 'src/assets/css/less/main.less',
    rest:
    'bower_components/bootstrap/less/'

  },
  javascript: [
    // 'bower_components/jquery/dist/jquery.js',

    // // Paths to Bootstrap components defined below
    // 'bower_components/bootstrap/js/affix.js',
    // 'bower_components/bootstrap/js/alert.js',
    // 'bower_components/bootstrap/js/button.js',
    // 'bower_components/bootstrap/js/carousel.js',
    // 'bower_components/bootstrap/js/collapse.js',
    // 'bower_components/bootstrap/js/dropdown.js',
    // 'bower_components/bootstrap/js/modal.js',
    // 'bower_components/bootstrap/js/popover.js',
    // 'bower_components/bootstrap/js/scrollspy.js',
    // 'bower_components/bootstrap/js/tab.js',
    // 'bower_components/bootstrap/js/tooltip.js',
    // 'bower_components/bootstrap/js/transition.js',

    //// Paths to Foundation components defined below
    //'bower_components/what-input/what-input.js',
    //'bower_components/foundation-sites/js/foundation.core.js',
    //'bower_components/foundation-sites/js/foundation.util.*.js',
    //// Paths to individual JS files
    //'bower_components/foundation-sites/js/foundation.abide.js',
    //'bower_components/foundation-sites/js/foundation.accordion.js',
    //'bower_components/foundation-sites/js/foundation.accordionMenu.js',
    //'bower_components/foundation-sites/js/foundation.drilldown.js',
    //'bower_components/foundation-sites/js/foundation.dropdown.js',
    //'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
    //'bower_components/foundation-sites/js/foundation.equalizer.js',
    //'bower_components/foundation-sites/js/foundation.interchange.js',
    //'bower_components/foundation-sites/js/foundation.magellan.js',
    //'bower_components/foundation-sites/js/foundation.offcanvas.js',
    //'bower_components/foundation-sites/js/foundation.orbit.js',
    //'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
    //'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
    //'bower_components/foundation-sites/js/foundation.reveal.js',
    //'bower_components/foundation-sites/js/foundation.slider.js',
    //'bower_components/foundation-sites/js/foundation.sticky.js',
    //'bower_components/foundation-sites/js/foundation.tabs.js',
    //'bower_components/foundation-sites/js/foundation.toggler.js',
    //'bower_components/foundation-sites/js/foundation.tooltip.js',

    //// Path to Material Design JS file
    //'bower_components/material-design-lite/material.js',

    'src/assets/js/!(main).js',
    'src/assets/js/main.js'
  ],
  img: [
    'src/assets/img/**/*.jpg',
    '!src/assets/img/lossy/**/*.jpg'
  ],
  zip: [
    'dist/**/*',
    '!dist/**/wp-style.css',
    '!dist/{scss,less}'
  ]
};


function stripCSS() {
  return when(env === 'production', uncss({
    html: ['src/assets/**/*.html', 'src/assets/**/*.php']//,
    //ignore: [
    //  new RegExp('^meta\..*'),
    //  new RegExp('^\.is-.*')
    //]
  }));
}


// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function() {
  return del('dist');
});


// Copy files out of the assets folder
// This task skips over the content of the "img", "js", "css", "scss" and "less" folders, which are parsed separately
gulp.task('copy', function(cb) {
  var wpStyle = 'src/assets/wp-style.css';

  gulp.src(PATHS.assets)
    .pipe(when(wpStyle,
      gulp.src(wpStyle)
        .pipe(rename('style.css'))))
    .pipe(gulp.dest('dist'));
  cb();
});


// Compile Sass files into Main CSS File
// In production, the CSS is compressed
gulp.task('sassOnly', function(){
  return gulp.src(PATHS.sass.main)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: PATHS.sass.rest
    })
      .on('error', $.sass.logError))
    .pipe(postcss([prefix({ browsers: COMPATIBILITY })]))
    .pipe(rename("main-style.css"))
    //.pipe(stripCSS())
    .pipe(when(env === 'production', minifyCss()))
    .pipe(when(env != 'production', sourcemaps.write()))
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.reload({ stream: true }));
});


// Compile less files into Main CSS File
// In production, the CSS is compressed
gulp.task('lessOnly', function(){
  return gulp.src(PATHS.less.main)
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [PATHS.less.rest]
      }))
    .pipe(postcss([prefix({ browsers: COMPATIBILITY })]))
    .pipe(rename("main-style.css"))
    //.pipe(stripCSS())
    .pipe(when(env === 'production', minifyCss()))
    .pipe(when(env != 'production', sourcemaps.write()))
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.reload({ stream: true }));
});


//===========================================
// Compile both Sass and Less for creation of Main CSS File
// Compile Sass into CSS for bothCSS
gulp.task('sass', function(){
  return gulp.src(PATHS.sass.main)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: PATHS.sass.rest
    })
      .on('error', $.sass.logError))
    .pipe(rename("main_sass.css"))
    //.pipe(when(env != 'production', sourcemaps.write()))
    .pipe(gulp.dest(PATHS.sass.temp));
});


// Compile less into CSS for bothCSS
gulp.task('less', function(){
  return gulp.src(PATHS.less.main)
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [PATHS.less.rest]
      }))
    .pipe(rename("main_less.css"))
    //.pipe(when(env != 'production', sourcemaps.write()))
    .pipe(gulp.dest(PATHS.less.temp));
});


// Create Main CSS File
// In production, the CSS is compressed
gulp.task('bothCSS', ['sass', 'less'], function(){
  return gulp.src(PATHS.css)
    .pipe(sourcemaps.init())
    //.pipe(order([PATHS.css, PATHS.less.temp, PATHS.sass.temp]))
    .pipe(concat('main-style.css'))
    .pipe(postcss([prefix({ browsers: COMPATIBILITY })]))
    //.pipe(stripCSS())
    .pipe(when(env === 'production', minifyCss()))
    .pipe(when(env != 'production', sourcemaps.write()))
    .pipe(gulp.dest('dist/css'))
    .pipe(browser.reload({ stream: true }));
});
//===========================================


// Delete the unnecessary css files and folders
gulp.task('cssPolish', [cssLang], function() {
  return del([
      PATHS.sass.temp, PATHS.less.temp,
      'dist/wp-style.css'
  ]);
});


// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var minifyJS = when(env === 'production', $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe(sourcemaps.init())
    .pipe(concat('main-app.js'))
    .pipe(minifyJS)
    .pipe(when(env != 'production', sourcemaps.write()))
    .pipe(gulp.dest('dist/js'))
    .on('finish', browser.reload);
});


// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = when(env === 'production', $.imagemin({
    progressive: true
  }));

  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest('dist/img'))
    .on('finish', browser.reload);
});


// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['copy', 'cssPolish', 'javascript', 'images'], done);
});


// Create zip file with everyting inside if in production
gulp.task('zipall', ['build'], function() {
  var createZip = when(env === 'production',  
    zip(THEME + '.zip')
    .pipe(gulp.dest('dist/Compressed\ Build'))
  );

  gulp.src(PATHS.zip)
  .pipe(createZip);
});


// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    port: PORT,
    proxy: URL
  });
});


// Build the theme, create zip file, and watch for file changes
gulp.task('default', ['server', 'zipall'], function(){
  gulp.watch(PATHS.assets, ['copy']);
  gulp.watch(['src/assets/css/scss/**/{*.scss, *.sass}'], ['cssPolish']);
  gulp.watch(['src/assets/css/less/**/*.less'], ['cssPolish']);
  gulp.watch(PATHS.css, ['cssPolish']);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
  gulp.watch(['src/assets/img/**/*'], ['images']);
});
