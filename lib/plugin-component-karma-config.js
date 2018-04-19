var normalizedBrowserName = function(browser) {
    return browser.toLowerCase().split(/[ /-]/)[0]; // normalization process to keep a consistent browser name across different OS
};

module.exports = function(config, karmaServePort, files, filesForCoverage, coverageDir) {
    var isDebugMode = process.argv.slice(2).indexOf('--debug') >= 0;
    var conditionalCoveragePreprocessors = isDebugMode ? [] : ["coverage"];
    var conditionalReporters = isDebugMode ? ["progress", "kjhtml"] : ["progress", "coverage", "junit", "html", "kjhtml"];
    var preprocessors = {};
    filesForCoverage.forEach(function(file) {
        preprocessors[file] = conditionalCoveragePreprocessors;
    });

    config.set({
        basePath: process.cwd(),
        frameworks: ["jasmine-ajax", "jasmine"],
        files: files,
        exclude: [],
        preprocessors: preprocessors,
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
                { type: 'html', dir: coverageDir, subdir: normalizedBrowserName },
                { type: 'cobertura', dir: coverageDir, subdir: normalizedBrowserName }
            ]
        },
        junitReporter: {
            outputDir: coverageDir,
            outputFile: 'junit-test-report.xml',
            useBrowserName: false
        },
        htmlReporter: {
            outputDir: coverageDir,
            focusOnFailures: true,
            reportName: 'html-test-report',
            preserveDescribeNesting: true
        },
        port: karmaServePort,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        browsers: ["PhantomJS"],
        browserNoActivityTimeout: 60000
    })
}
