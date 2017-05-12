var PluginManifest = require("../lib/plugin-manifest");
var fs = require('fs');

describe("PluginManifest", function() {
    describe("#getEditorSrcFiles", function() {
        it("should return js dependency files followed by main js file listed in editor section of the manifest", function() {
            var pluginManifest = new PluginManifest({
                "editor": {
                    "main": "editor/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "editor/init.js" },
                        { "type": "js", "src": "editor/my-editor-app.js" }
                    ]
                },
                "renderer": {
                    "main": "renderer/plugin.js"
                }
            });

            var srcFiles = pluginManifest.getEditorSrcFiles();

            expect(srcFiles).toEqual([
                "editor/init.js",
                "editor/my-editor-app.js",
                "editor/plugin.js"
            ]);
        });

        it("should return zero files when there is no editor section in manifest", function() {
            var pluginManifest = new PluginManifest({});

            var srcFiles = pluginManifest.getEditorSrcFiles();

            expect(srcFiles).toEqual([]);
        });

        it("should not return dependencies of type plugin in manifest", function() {
            var pluginManifest = new PluginManifest({
                "editor": {
                    "main": "editor/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "editor/init.js" },
                        { "type": "plugin", "src": "another-plugin" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getEditorSrcFiles();

            expect(srcFiles).toEqual([
                "editor/init.js",
                "editor/plugin.js"
            ]);
        });
    });

    describe("#getRendererSrcFiles", function() {
        it("should return js dependency files followed by main js file listed in renderer section of the manifest", function() {
            var pluginManifest = new PluginManifest({
                "editor": {
                    "main": "editor/plugin.js"
                },
                "renderer": {
                    "main": "renderer/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "renderer/init.js" },
                        { "type": "js", "src": "renderer/my-renderer-app.js" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getRendererSrcFiles();

            expect(srcFiles).toEqual([
                "renderer/init.js",
                "renderer/my-renderer-app.js",
                "renderer/plugin.js"
            ]);
        });

        it("should return zero files when there is no renderer section in manifest", function() {
            var pluginManifest = new PluginManifest({});

            var srcFiles = pluginManifest.getRendererSrcFiles();

            expect(srcFiles).toEqual([]);
        });

        it("should not return dependencies of type plugin in manifest", function() {
            var pluginManifest = new PluginManifest({
                "renderer": {
                    "main": "renderer/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "renderer/init.js" },
                        { "type": "plugin", "src": "another-plugin" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getRendererSrcFiles();

            expect(srcFiles).toEqual([
                "renderer/init.js",
                "renderer/plugin.js"
            ]);
        });
    });

    describe("#getAllSrcFiles", function() {
        it("should return js dependency files followed by main js file listed in editor and renderer section of the manifest", function() {
            var pluginManifest = new PluginManifest({
                "editor": {
                    "main": "editor/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "editor/init.js" },
                        { "type": "js", "src": "editor/my-editor-app.js" }
                    ]
                },
                "renderer": {
                    "main": "renderer/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "renderer/init.js" },
                        { "type": "js", "src": "renderer/my-renderer-app.js" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getAllSrcFiles();

            expect(srcFiles).toEqual([
                "editor/init.js",
                "editor/my-editor-app.js",
                "editor/plugin.js",
                "renderer/init.js",
                "renderer/my-renderer-app.js",
                "renderer/plugin.js"
            ]);
        });

        it("should return only editor files when there is no renderer section in manifest", function() {
            var pluginManifest = new PluginManifest({
                "editor": {
                    "main": "editor/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "editor/init.js" },
                        { "type": "js", "src": "editor/my-editor-app.js" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getAllSrcFiles();

            expect(srcFiles).toEqual([
                "editor/init.js",
                "editor/my-editor-app.js",
                "editor/plugin.js"
            ]);
        });

        it("should return only renderer files when there is no editor section in manifest", function() {
            var pluginManifest = new PluginManifest({
                "renderer": {
                    "main": "renderer/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "renderer/init.js" },
                        { "type": "js", "src": "renderer/my-renderer-app.js" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getAllSrcFiles();

            expect(srcFiles).toEqual([
                "renderer/init.js",
                "renderer/my-renderer-app.js",
                "renderer/plugin.js"
            ]);
        });

        it("should return zero files when there is no editor and renderer section in manifest", function() {
            var pluginManifest = new PluginManifest({});

            var srcFiles = pluginManifest.getAllSrcFiles();

            expect(srcFiles).toEqual([]);
        });

        it("should not return dependencies of type plugin in manifest", function() {
            var pluginManifest = new PluginManifest({
                "editor": {
                    "main": "editor/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "editor/init.js" },
                        { "type": "plugin", "src": "another-plugin" }
                    ]
                },
                "renderer": {
                    "main": "renderer/plugin.js",
                    "dependencies": [
                        { "type": "js", "src": "renderer/init.js" },
                        { "type": "plugin", "src": "another-plugin" }
                    ]
                }
            });

            var srcFiles = pluginManifest.getAllSrcFiles();

            expect(srcFiles).toEqual([
                "editor/init.js",
                "editor/plugin.js",
                "renderer/init.js",
                "renderer/plugin.js"
            ]);
        });
    });

    describe('load', function() {
        it('should load manifest from given file path when path is provided', function() {
            spyOn(fs, 'readFileSync').andReturn(JSON.stringify({}));

            PluginManifest.load('/path/to/manifest.json')

            expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/manifest.json');
        });

        it('should load manifest from manifest.json in current directory when path is not provided', function() {
            spyOn(fs, 'readFileSync').andReturn(JSON.stringify({}));

            PluginManifest.load()

            expect(fs.readFileSync).toHaveBeenCalledWith('manifest.json');
        });

        it('should return pluginManifest created from content read from manifest.json', function() {
            var manifestDataInFile = {
                "editor": {
                    "main": "editor/plugin.js"
                },
                "renderer": {
                    "main": "renderer/plugin.js"
                }

            };
            spyOn(fs, 'readFileSync').andReturn(JSON.stringify(manifestDataInFile));

            var pluginManifest = PluginManifest.load()

            expect(pluginManifest.manifestData).toEqual(manifestDataInFile);
            expect(pluginManifest.getAllSrcFiles()).toEqual([
                "editor/plugin.js",
                "renderer/plugin.js",
            ]);
        });
    });
});
