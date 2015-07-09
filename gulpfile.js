/*eslint no-mixed-requires:0*/

'use strict';

var q = require('q'),
    _ = require('ls-lodash'),
    del = require('del'),
    path = require('path'),
    qWebpack = q.denodeify(require('webpack')),

    gulp = require('gulp'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),

    webpackConfig = require('./webpack.config.js'),
    buildDir = path.resolve(__dirname, 'dist'),
    libGlob = path.join('lib', '**', '*.js'),
    testGlob = path.join('test', '**', '*.js');

function printWebpackStats(taskName) {
    return function(stats) {
        gutil.log('[' + taskName + ']', stats.toString({colors: true}));
    };
}

gulp.task('default', [
    'test',
    'watch'
]);

gulp.task('test', [
    'lint',
    'build',
    'mocha'
]);

gulp.task('build', [
    'webpack'
]);

gulp.task('watch', function() {
    gulp.watch([libGlob, testGlob], ['test']);
});

gulp.task('lint', function() {
    return gulp.src([testGlob, libGlob, './*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('mocha', ['build'], function() {
    return gulp.src(testGlob)
        .pipe(mocha({
            reporter: process.env.CI ? 'spec' : 'nyan',
            compilers: {js: require('babel/register')}
        }));
});

gulp.task('clean', _.once(function() {
    gutil.log('[clean]', 'First and ONLY run.');
    return q.nfcall(del, [path.join(buildDir, '**')]);
}));

gulp.task('webpack', ['clean'], function() {
    var taskName = 'webpack';
    return qWebpack(webpackConfig)
        .then(printWebpackStats(taskName))
        .fail(function(err) {
            throw new gutil.PluginError(taskName, err);
        });
});
