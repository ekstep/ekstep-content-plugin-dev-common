var _ = require("lodash");
var fs = require('fs');


module.exports = (function() {
    var PluginFrameworkConfig = function(config) {
        var self = this;
        self.config = config || {};

        self.getAllSrcFiles = function() {
            var dependencySrcFiles = _.map(_.filter(self.config["dependencies"], { type: "js" }), "src");
            var mainSrcFile = self.config["main"];
            return _.compact(_.concat(dependencySrcFiles, [mainSrcFile]));
        }
    }

    var PluginManifest = function(manifestData) {
        var self = this;
        self.manifestData = manifestData;

        self.getAllSrcFiles = function() {
            var editorSrcFiles = new PluginFrameworkConfig(self.manifestData["editor"]).getAllSrcFiles();
            var rendererSrcFiles = new PluginFrameworkConfig(self.manifestData["renderer"]).getAllSrcFiles();
            return _.concat(editorSrcFiles, rendererSrcFiles);
        }
    }

    PluginManifest.load = function(filePath) {
        filePath = filePath || "manifest.json";
        var manifestData = JSON.parse(fs.readFileSync(filePath));
        return new PluginManifest(manifestData);
    }

    return PluginManifest;
})();
