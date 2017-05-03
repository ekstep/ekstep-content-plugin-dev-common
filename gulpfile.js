var gulp = require('gulp');
var eslint = require('gulp-eslint');
var eslintIfFixed = require('gulp-eslint-if-fixed');
var clean = require('gulp-clean');
var jasmineNode = require('gulp-jasmine-node');
var jasmine = require('jasmine-node');
var exec = require('child_process').exec;


gulp.task('clean', function() {
    return gulp.src(['coverage'], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('jslint', function() {
    var fix = (process.argv.slice(2).indexOf('--fix') >= 0);
    return gulp
        .src(['**/*.js', '!node_modules/**', '!bower_components/**', '!coverage/**', '!docs/**'])
        .pipe(eslint({
            fix: fix,
        }))
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(eslint.failAfterError())
        .pipe(eslintIfFixed('.'));
});

gulp.task('test', ['clean'], function() {
    return gulp.src(['test/**/*.js']).pipe(jasmineNode({
        timeout: 10000,
        reporter: [
            new jasmine.TerminalVerboseReporter({ color: true, includeStackTrace: true })
        ]
    }));
});

gulp.task('test:watch', ['clean', 'test'], function() {
    return gulp.watch(['lib/**/*.js', 'test/**/*.js'], function() {
        return exec('node_modules/gulp/bin/gulp.js test', function(err, stdout, stderr) {
            /*eslint-disable no-console */
            console.log(stdout);
            console.log(stderr);
        });
    });
});

gulp.task('lint', ['jslint'], function() {});

gulp.task('default', ['lint', 'test'], function() {});
