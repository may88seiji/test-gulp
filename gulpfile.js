var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var gulpif = require('gulp-if');
var imagemin = require( 'gulp-imagemin' );
var pleeease = require('gulp-pleeease');
var plumber = require('gulp-plumber');
var rename = require( 'gulp-rename' );
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require( 'gulp-uglify' );
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');

//task
gulp.task('default', ['watch','webserver','sass']);
gulp.task('imgmin', ['imgmin']);

//watch
gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass','ple']);
});

//server
gulp.task('webserver', function () {
  gulp.src('./dest') // 公開したい静的ファイルを配置したディレクトリを指定
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true
    }));
});

// Sass
gulp.task('sass', function(){
  gulp.src('./src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      sourcemap: true
    }))
    .pipe(plumber())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dest/css/'));
});

//pleeease css最適化(Autoprefixer,minify)
gulp.task('ple', ['sass'], function() {
  gulp.src('./dest/css/*.css')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(pleeease({
    sass: true,
    mqpacker: true,
    minifier: false,
    autoprefixer: {'browsers': ['last 3 versions', 'ie 8', 'ios 5', 'android 2.3']}
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dest/css/'));
});

//画像圧縮
gulp.task('imgmin', function() {
  gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dest/img/'));
});

//ファイル移動（複製）
// gulp.task('copy', function() {
//   gulp.src('./src/*')
//     .pipe(gulp.dest('./dest/'));
// });

// リネーム
// gulp.task('rename', function() {
//   gulp.src('./src/index.html')
//     .pipe(rename('index.php'))
//     .pipe(gulp.dest('./dest/'));
// });

//結合
// gulp.task('concat', function() {
//   gulp.src([
//     './src/style01.css',
//     './src/style02.css',
//     './src/style03.css'
//   ])
//   .pipe(concat('style.css'))
//   .pipe(gulp.dest('./dest/'));
// });

//js圧縮
// gulp.task('jsmin', function() {
//   gulp.src('./src/script.js')
//     .pipe(uglify())
//     .pipe(rename({suffix: '.min'}))
//     .pipe(gulp.dest('./dest/'));
// });

//画像圧縮
// gulp.task('imgmin', function() {
//   gulp.src('./src/images/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./dest/images/'));
// });