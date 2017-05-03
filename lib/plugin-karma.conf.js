var _ = require("lodash");
var pluginManifest = require("./plugin-manifest").load();

var normalizedBrowserName = function(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0]; // normalization process to keep a consistent browser name across different OS
};

module.exports = function(config) {
    var isDebugMode = process.argv.slice(2).indexOf('--debug') >= 0;
    var conditionalCoveragePreprocessors = isDebugMode ? [] : ["coverage"];
    var conditionalReporters = isDebugMode ? ["progress", "kjhtml"] : ["progress", "coverage", "junit", "html"];

    config.set({
        basePath: process.cwd(),
        frameworks: ["jasmine-ajax", "jasmine"],
        files: _.concat(
            [
                "bower_components/content-editor-dependency/index.js",
                "bower_components/angular-mocks/angular-mocks.js",
                __dirname + "/content-editor-dom-simulation.js",
                "bower_components/content-editor/index.js",
                "bower_components/renderer/index.js"
            ],
            pluginManifest.getAllSrcFiles(), [
                "test/**/*.js"
            ]
        ),
        exclude: [],
        preprocessors: {
            "editor/**/*.js": conditionalCoveragePreprocessors,
            "renderer/**/*.js": conditionalCoveragePreprocessors
        },
        reporters: conditionalReporters,
        coverageReporter: {
            check: {
                global: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    excludes: []
                },
                each: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                    excludes: [],
                    overrides: {}
                }
            },
            reporters: [
                { type: 'text-summary' },
                { type: 'html', dir: 'coverage/', subdir: normalizedBrowserName },
                { type: 'cobertura', dir: 'coverage/', subdir: normalizedBrowserName }
            ]
        },
        junitReporter: {
            outputDir: 'coverage',
            outputFile: 'junit-test-report.xml',
            useBrowserName: false
        },
        htmlReporter: {
            outputDir: 'coverage',
            focusOnFailures: true,
            reportName: 'html-test-report',
            preserveDescribeNesting: true
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        browsers: ["PhantomJS"]
    })
}
