var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/js/**/*.js', ['js']);
});

gulp.task('css-clean', function() {
  var clean = require('gulp-clean');
  
  return gulp.src(['./dist/css/*'])
    .pipe(clean())
});

var compileSass = function() {
  var sass = require('gulp-sass');
  var merge = require('merge-stream');
    
  var resound = gulp.src('./src/scss/resound.scss')
    .pipe(sass({
      includePaths: [ 'node_modules/' ],
      outputStyle: 'expanded',
      sourceMap: true,
      outFile: ''
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
    
  return merge(resound);
}

gulp.task('sass', ['css-clean'], function () {
  return compileSass();
});

gulp.task('postcss', ['sass'], function () {
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');
    var focus = require('postcss-focus');
    var discardDuplicates = require('postcss-discard-duplicates');
    var merge = require('merge-stream');
  
    var plugins = [
        discardDuplicates,
        focus,
        autoprefixer({browsers: [
          'last 2 versions'
        ]})
    ];
    
    var resound = gulp.src('./dist/css/*.css')
      .pipe(postcss(plugins, { map: true }))
      .pipe(gulp.dest('./dist/css'));
    
    return merge(resound);
});

gulp.task('css-min', ['postcss'], function(){
  var cssmin = require('gulp-cssmin');
  var rename = require('gulp-rename');
  var merge = require('merge-stream');
    
  var resound = gulp.src('./dist/css/*.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));
    
  return merge(resound);
});

gulp.task('assets-clean', function() {
  var clean = require('gulp-clean');
  var merge = require('merge-stream');
  
  var fonts = gulp.src(['./dist/fonts/*'])
    .pipe(clean())
    
  var images =  gulp.src(['./dist/img/*'])
      .pipe(clean())
      
  return merge(fonts, images);
});

gulp.task('assets-imagemin', ['assets-clean'], function() {
  var imagemin = require('gulp-imagemin');
  var merge = require('merge-stream');

  var resound =  gulp.src(['./src/img/**/*.{png,jpg,gif,svg}'])
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 1}),
      imagemin.svgo({plugins: [
        {removeUselessStrokeAndFill: true}, 
        {removeUselessDefs: true}, 
        {removeTitle: true}, 
        {cleanupIDs: true}
      ]})
    ]))
    .pipe(gulp.dest('./dist/img'));
    
  return merge(resound);
});

gulp.task('assets-copy', ['assets-imagemin'], function() {
  var replace = require('gulp-string-replace');
  var merge = require('merge-stream');
  
  var fonts = gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./dist/fonts'))
    
  var img = gulp.src('./src/img/**/*.{ico,mp4,webm}')
    .pipe(gulp.dest('./dist/img'))
        
  return merge(fonts, img);
});

gulp.task('js-clean', function() {
  var clean = require('gulp-clean');
  
  return gulp.src(['./dist/js/*'])
    .pipe(clean());
});

gulp.task('js-compile', ['js-clean'], function() {
  var webpackStream = require('webpack-stream');
  var webpack = require('webpack');
  var merge = require('merge-stream');
  
  var resound = gulp.src('./src/js/resound.js')
    .pipe(webpackStream({
      output: {filename: 'resound.js'}
    }, webpack))
    .pipe(gulp.dest('./dist/js'));
    
  return merge(resound);
});

gulp.task('js-min', ['js-compile'], function(){
  var uglify = require('gulp-uglify');
  var rename = require('gulp-rename');
  var merge = require('merge-stream');
    
  var resound = gulp.src('./dist/js/*.js')
    .pipe(uglify({mangle: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'));
    
  return merge(resound);
});

gulp.task('css', [
  'css-clean',
  'sass', 
  'postcss',
  // 'css-min'
]);

gulp.task('assets', [
  'assets-clean',
  'assets-imagemin',
  'assets-copy'
]);

gulp.task('js', [
  'js-clean',
  'js-compile',
  // 'js-min'
]);

gulp.task('default', [
  'css',
  'js',
  'assets'
]);