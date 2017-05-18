#!/usr/bin/env node

var rimraf = require('rimraf');
var spawnSync = require('child_process').spawnSync;


rimraf.sync('bower_components/content-editor*');
rimraf.sync('bower_components/renderer*');
rimraf.sync('node_modules/eslint-config-ekstep-content-plugin');
spawnSync('node_modules/bower/bin/bower', ['cache', 'clean'], { stdio: 'inherit' });
spawnSync('node_modules/bower/bin/bower', ['install'], { stdio: 'inherit' });
spawnSync('npm', ['install'], { stdio: 'inherit' });