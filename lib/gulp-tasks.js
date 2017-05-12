var gulp = require('gulp');
var eslint = require('gulp-eslint');
var eslintIfFixed = require('gulp-eslint-if-fixed');
var karma = require('karma');
var bower = require('gulp-bower');
var jsdoc = require('gulp-jsdoc3');
var jsonlint = require("gulp-jsonlint");
var zip = require('gulp-zip');
var fs = require('fs');
var clean = require('gulp-clean');
var git = require('git-rev')
var manifest = JSON.parse(fs.readFileSync('manifest.json'));
var _ = require("lodash");
var gutil = require('gulp-util');

module.exports = function(gulpTasksOptions) {
    gulpTasksOptions = gulpTasksOptions || {};

    gulp.task('clean', function() {
        return gulp.src(['dist', 'coverage', 'doc'], { read: false })
            .pipe(clean({ force: true }));
    });

    gulp.task('dist', ['clean'], function(cb) {
        git.short(function(gitShortCommitId) {
            gulp.src(['editor/**', 'renderer/**', 'assets/**', 'manifest.json'], { base: '.' })
                .pipe(zip(manifest.id + '-' + manifest.ver + '-' + gitShortCommitId + '.zip'))
                .pipe(gulp.dest('dist'))
                .on('en', cb);
        });
    });

    gulp.task('bower', function() {
        return bower();
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

    gulp.task('jsonlint', function() {
        return gulp.src(['**/*.json', '!node_modules/**', '!bower_components/**', '!coverage/**', '!docs/**'])
            .pipe(jsonlint())
            .pipe(jsonlint.reporter());
    });

    // component -> can be 'editor' or renderer
    var addIfTestsExists = function(component, testRunner) {
        if (fs.existsSync('test/' + component)) {
            testRunner();
        } else {
            gutil.log('There are no tests for', component);
        }
    }

    // component -> can be 'editor' or renderer
    var defineTestTasks = function(component) {
        var componentKarmaServerOptionOverrides = gulpTasksOptions[component + 'KarmaServerOptions'];

        gulp.task(component + ':test', ['clean', 'bower'], function(done) {
            addIfTestsExists(component, function() {
                var karmaServerOptions = _.merge({
                    configFile: __dirname + '/' + component + '/karma.conf.js',
                    singleRun: true
                }, componentKarmaServerOptionOverrides);
                new karma.Server(karmaServerOptions, function(exitCode) {
                    done();
                    process.exit(exitCode);
                }).start();
            });
        });

        gulp.task(component + ':test:watch', ['clean', 'bower'], function(done) {
            addIfTestsExists(component, function() {
                var karmaServerOptions = _.merge({
                    configFile: __dirname + '/' + component + '/karma.conf.js',
                    singleRun: false
                }, componentKarmaServerOptionOverrides);
                new karma.Server(karmaServerOptions, done).start();
            });
        });
    }

    defineTestTasks('editor');
    defineTestTasks('renderer');

    gulp.task('test', ['editor:test', 'renderer:test']);

    gulp.task('test:watch', ['editor:test:watch', 'renderer:test:watch']);

    gulp.task('doc', ['clean'], function(cb) {
        gulp.src(['README.md', './**/*.js', '!node_modules/**', '!bower_components/**', '!coverage/**', '!docs/**', '!test/**', '!testSupport/**'], { read: false })
            .pipe(jsdoc(cb));
    });

    gulp.task('lint', ['jslint', 'jsonlint'], function() {});

    gulp.task('default', ['lint', 'test', 'dist', 'doc'], function() {});
}
