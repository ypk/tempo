const { src, dest, series, watch, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const browserify = require('browserify');
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const util = require("gulp-util");
const rimraf = require('rimraf');
const babelify = require('babelify');

const SOURCE_PATH = 'src/js/index.jsx';
const STYLE_PATH = 'src/sass/**/*.scss';
const SCRIPT_PATH = 'src/js/**/*.{js,jsx}';
const RESOURCES_PATH = ['src/index.html', 'src/images/**/*', 'src/fonts/**/*'];
const DIST_PATH = 'dist';

const serve = (done) => {
    browserSync.init({
        server: {
            baseDir: DIST_PATH
        }
    });
    watch(STYLE_PATH, series(processStyles, browserReload));
    watch(SCRIPT_PATH, series(processScripts, browserReload));
    watch(RESOURCES_PATH, series(copyResources, browserReload));
    watch(SOURCE_PATH, series(processScripts, browserReload));
    done();
}

const processScripts = () => {
    return browserify('src/js/index.jsx')
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

const copyResources = () => {
    return src(RESOURCES_PATH, { "base" : "./src/" })
        .pipe(
            dest('dist')
        )
        .pipe(
            browserSync.stream()
        )
        .on("error", util.log)
}

const cleanDist = (done) => {
    return rimraf(DIST_PATH, () => {
        console.log(`Deleted ${DIST_PATH}`);
        done()
    });
}

const buildFiles = series(cleanDist, parallel(processStyles, processScripts, copyResources))
const watchFiles = series(buildFiles, serve);

exports.default = buildFiles;
exports.dev = watchFiles;