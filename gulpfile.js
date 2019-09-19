const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const {DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task( "clean", () => {
    return src( `${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task('copy', () =>  {
    return src(`${SRC_PATH}/content/**/*`).pipe(dest(`${DIST_PATH}/content`));
});

task('copy:fonts', () =>  {
    return src(`${SRC_PATH}/fonts/*`).pipe(dest(`${DIST_PATH}/fonts`));
});

task('copy:html', () =>  {
    return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}));
});

task('styles', () => {
    return src([...STYLES_LIBS, 'src/css/main.scss'])
    .pipe(gulpif(env==="dev", sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env==="dev",
    autoprefixer({
        cascade: true
    }))
    )
    .pipe(gulpif(env==="prod", gcmq()))
    .pipe(gulpif(env==="prod",cleanCSS()))
    .pipe(gulpif(env==="dev", sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}))
});

task('scripts', () => {
    return src([...JS_LIBS, 'src/scripts/*.js'])
    .pipe(gulpif(env==="dev",sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulpif(env==="dev",sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({stream: true}))
});

task('icons', () => {
    return src('src/content/*.svg') 
    .pipe(svgo({
        plugins: [
            {
                removeAttrs: {
                    attrs: "(fill|stroke|style|width|height|data.*)"
                }
            }
        ]
    })
    )
    .pipe(svgSprite({
        mode: {
            symbol: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/content/*'));

});

task('server', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        open: true
    });
});

task("watch", ()=> {
    watch('src/css/**/*.scss', series('styles'));
    watch('src/*.html', series('copy:html'));
    watch('src/*.js', series('scripts'));
    watch('src/content/*.svg', series('icons'));
    watch('src/content/**/*', series('copy'));
    watch('src/content/fonts/*', series('copy:fonts'));
});

task(
    'default', 
    series('clean', 
    parallel('copy:html', 'copy', 'copy:fonts', 'styles', 'scripts', 'icons'),
    parallel('watch', 'server')
    )
);

task(
    'build', 
    series('clean', parallel('copy:html', 'copy', 'copy:fonts', 'styles', 'scripts', 'icons'))
);