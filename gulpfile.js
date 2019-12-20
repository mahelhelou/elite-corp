const {
   src,
   dest,
   watch,
   series,
   parallel
} = require('gulp')

// Markup packages
const pug = require('gulp-pug')

// Styles packages
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')

// Scripts packages
const concat = require('gulp-concat')

// Other assets packages
const imageMin = require('gulp-image')

// Mutli-purpose packages
const browserSync = require('browser-sync').create()

/* function html() {
   return src('./app/assets/pug/index.pug')
      .pipe(
         pug({
            pretty: true
         })
      )
      .pipe(dest('./app'))
} */

function styles() {
   return src('./app/assets/styles/styles.scss')
      .pipe(sourcemaps.init())
      .pipe(
         sass({
            outputStyle: 'expanded'
         })
      )
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(sourcemaps.write('./'))
      .pipe(dest('./app/temp/styles'))
      .pipe(browserSync.stream())
}

function scripts() {
   return src("./app/assets/scripts/**/*.js", {
      sourcemaps: false
   })
      .pipe(concat("App.js"))
      .pipe(dest("./app/temp/scripts", {
         sourcemaps: false
      })
   )
   .pipe(browserSync.stream())
}

function watchFiles() {
   browserSync.init({
      notify: false,
      server: {
         baseDir: 'app'
      }
   })
   // watch('./app/assets/pug/**/*.pug', html)
   watch('./app/**/*.html').on('change', browserSync.reload)
   watch('./app/assets/styles/**/*.scss', styles)
   watch('./app/assets/scripts/**/*.js', scripts)
}

// exports.html = html
exports.styles = styles
exports.scripts = scripts

// const compileAssets = parallel(html, styles, scripts)
const compileAssets = parallel(/*html,*/ styles, scripts)

exports.serve = parallel(compileAssets, watchFiles)

// function watch() {
//   browserSync.init({
//     notify: false,
//     server: {
//       baseDir: "app"
//     }
//   });
//   gulp.watch("./app/assets/pug/**/*.pug", html);
//   gulp.watch("./app/assets/styles/**/*.scss", styles);
//   gulp.watch("./app/assets/scripts/**/*.js", scripts);

//   gulp.watch("./app/*.html").on("change", browserSync.reload);
//   gulp.watch("./app/assets/scripts/**/*.js").on("change", browserSync.reload);
// }

// function compressImages() {
//   return src([
//       "./app/assets/images/**/*",
//       "!./app/assets/images/icons",
//       "!./app/assets/images/icons/**/*"
//     ])
//     .pipe(imageMin())
//     .pipe(dest("./dist/assets/images"));
// }


// exports.scripts = scripts;
// exports.watch = watch;

// exports.deleteDistFolder = deleteDistFolder;
// exports.compressImages = compressImages;
// exports.build = build;

// exports.default = gulp.parallel(html, styles, scripts, watch)