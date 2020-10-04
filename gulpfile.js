// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// File paths
const files = { 
    htmlPath: './*.html',
    scssPath: './src/**/*.scss',
    jsPath: './src/**/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass().on('error', sass.logError)) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer({ grid: 'autoplace' }), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('./') // put final CSS in dist folder
    );
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask(){
    return src([
        files.jsPath
        //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('./')
    );
}

// Cachebust
/*function cacheBustTask(){
    var cbString = new Date().getTime();
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('./'));
}*/

function watchTask() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    watch([files.scssPath, files.jsPath],
        series(
            parallel(scssTask, jsTask),
            //cacheBustTask
        )
    ).on('change', browserSync.reload);
    watch(files.htmlPath).on('change', browserSync.reload);    
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(scssTask, jsTask), 
    //cacheBustTask,
    watchTask
);

//So we can just run these, if we want to
exports.scssTask = scssTask;
exports.jsTask = jsTask;
exports.watch = watchTask;