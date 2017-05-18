#!/usr/bin/env node

var rimraf = require('rimraf');
var execSync = require('child_process').execSync;

rimraf.sync('bower_components/content-editor*');
rimraf.sync('bower_components/renderer*');
rimraf.sync('node_modules/eslint-config-ekstep-content-plugin');
execSync('node node_modules/bower/bin/bower cache clean', { stdio: 'inherit' });
execSync('node node_modules/bower/bin/bower install', { stdio: 'inherit' });
execSync('npm install', { stdio: 'inherit' });
