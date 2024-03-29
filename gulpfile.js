const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
// const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const reload = browserSync.reload;
const kit = require('gulp-kit');

const paths = {
    html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/*',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
    dist: './dist',
};

// const { src, dest, series } = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const cssnano = require('gulp-cssnano');
// import autoprefixer from 'autoprefixer';
// // const autoprefixer = require('gulp-autoprefixer');
// const rename = require('gulp-rename');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(dest(paths.sassDest))
		.pipe(csso())
		.pipe(cssnano())
		.pipe(autoprefixer())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
        .pipe(dest(paths.sassDest));
	done();
}

function javaScript(done) {
	src(paths.js)
        .pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(dest(paths.jsDest));
	done();
}

function convertImage(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
	done();
}


function handleKits(done) {
	src(paths.html).pipe(kit()).pipe(dest('./'));
	done();
}

function cleanStuff(done) {
    src(paths.dist, {read:false})
        .pipe(clean());
        done();

}

function startBrowserSync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
	done();
}

function watchForChanges(done) {
    
    watch([paths.sass, paths.js, paths.html], parallel(handleKits, sassCompiler, javaScript)).on("change", reload);
    watch(paths.img, convertImage).on("change", reload);
	done();
}

//CZYSZCZENIE
//gulp cleanStuff

const mainFunctions = parallel(handleKits, sassCompiler, javaScript, convertImage)
exports.cleanStuff = cleanStuff
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
