var _ = require("lodash");
var pluginManifest = require("../plugin-manifest").load();
var pluginComponentKarmaConfig = require("../plugin-component-karma-config");

module.exports = function(config) {
    var coverageDir = 'coverage/renderer';
    var files = _.concat(
        [
            // TODO: Remove this hack to get jquery, angular etc till renderer exposes bundled dependency file
            // https://github.com/ekstep/Contributed-Plugins/issues/136
            "bower_components/pollyfill/index.js",
            "bower_components/renderer-createjs/index.js",
            "bower_components/renderer-cordovaplugin/index.js",
            "bower_components/renderer-creatine/index.js",
            "bower_components/renderer-dependency-toastr/index.js",
            "bower_components/renderer-angular-mocks/index.js",
            "bower_components/renderer-telemetry/index.js",
            "bower_components/renderer-dependency-appconfig/index.js",
            "bower_components/renderer/index.js",
            __dirname + "/dom-simulation.js",
        ],
        [
          "test/mocks/renderer/*.js"
        ],
        pluginManifest.getRendererSrcFiles(),
        [
            "test/renderer/**/*.js"
        ]
    );
    var filesForCoverage = ["renderer/**/*.js"];
    var karmaServePort = 9877;

    pluginComponentKarmaConfig(config, karmaServePort, files, filesForCoverage, coverageDir);
}
