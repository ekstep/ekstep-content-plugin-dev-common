## ekstep-content-plugin-dev-common

Common development files for writing ekstep content plugin. Provides gulp tasks for developing a ekstep content plugin

#### Usage

* Add this package as dev dependency in `package.json`

```json
"devDependencies": {
    "ekstep-content-plugin-dev-common": "ekstep/ekstep-content-plugin-dev-common"
}
```

* Add this package as dependency in `bower.json`. This will ensure the dependency files from content-editor and renderer are installed into `bower_components` folder on `bower install`. These files are included in karma configuration for running tests for the plugin

```json
    "dependencies": {
        "ekstep-content-plugin-dev-common": "ekstep/ekstep-content-plugin-dev-common"
    }
```


* Including the default gulp tasks with default options


```js
//gulpfile.js
require('ekstep-content-plugin-dev-common/lib/gulp-tasks')();
```

* Overriding options available in karma for running tests: `gulpfile.js` should contain

```js
//gulpfile.js
require('ekstep-content-plugin-dev-common/lib/gulp-tasks')({
    karmaServerOptions: {
        exclude: ["path/to/*.js"]
    }
});
```

The `karmaServerOptions` supports options listed in [karma configuration documentation](http://karma-runner.github.io/1.0/config/configuration-file.html)


### Development

* Run Following command to verify changes

```
npm install
gulp
```