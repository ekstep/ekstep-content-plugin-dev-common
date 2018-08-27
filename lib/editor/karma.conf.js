var _ = require("lodash");
var pluginManifest = require("../plugin-manifest").load();
var pluginComponentKarmaConfig = require("../plugin-component-karma-config");

module.exports = function(config) {
    var coverageDir = 'coverage/editor';
    var files = _.concat(
        [
            __dirname + "/dom-simulation.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "bower_components/content-editor/index.js"
        ],
        [
            "test/mocks/editor/*.js"
        ],
        pluginManifest.getEditorSrcFiles(),
        [
            "test/editor/**/*.js"
        ]
    );
    var filesForCoverage = ["editor/**/*.js"];
    var karmaServePort = 9876;

    pluginComponentKarmaConfig(config, karmaServePort, files, filesForCoverage, coverageDir);
}
