const { src, dest, series, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserify = require('browserify');
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const util = require("gulp-util");
const babelify = require('babelify');

const STYLE_PATH = 'src/sass/**/*.scss';
const SCRIPT_PATH = 'src/js/**/*.js';
const HTML_PATH = 'src/**/*.html';
const DIST_PATH = 'dist';

const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: DIST_PATH
        }
    });
    done();
}

const processScripts = () => {
    return browserify('src/js/index.js')
        .transform(
            babelify.configure({
                presets: ["@babel/preset-env", "@babel/react"]
            })
        )
        .bundle()
        .pipe(
            source('dist/js/index.js')
        )
        .pipe(
            buffer()
        )
        .pipe(
            dest("./")
        )
        .pipe(
            browserSync.stream()
        )
        .on("error", util.log);
};

const browserReload = (done) => {
    browserSync.reload();
    done();
};

const processStyles = () => {
    return src(STYLE_PATH)
        .pipe(
            sass({ outputStyle: "expanded" }).on("error", sass.logError)
        )
        .pipe(
            autoprefixer({})
        )
        .pipe(
            dest('dist/css')
        )
        .pipe(
            browserSync.stream()
        )
        .on("error", util.log)
}

const copyHTML = () => {
    return src('src/index.html')
        .pipe(
            dest('dist')
        )
        .pipe(
            browserSync.stream()
        )
        .on("error", util.log)
}

const cleanDist = (done) => {
    return clean(DIST_PATH)
        .pipe(
            done()
        )
}

const watchStyleFiles = () => {
    watch(STYLE_PATH, series(processStyles, browserReload));
};

const watchScriptFiles = () => {
    watch(SCRIPT_PATH, series(processScripts, browserReload));
};

const watcher = () => {
    watchStyleFiles();
    watchScriptFiles();
    watch(HTML_PATH, series(copyHTML, browserReload));
};

const buildFiles = parallel(processStyles, processScripts, copyHTML)
const watchFiles = series(buildFiles, parallel(watcher, serve));

exports.default = buildFiles;
exports.dev = watchFiles;

exports.watchStyles = parallel(serve, watchStyleFiles);
exports.watchScripts = parallel(serve, watchScriptFiles);

exports.processStyles = processStyles;
exports.processScripts = processScripts;
exports.copyHTML = copyHTML;