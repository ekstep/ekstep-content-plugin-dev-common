#!/usr/bin/env node

var rimraf = require('rimraf');
var execSync = require('child_process').exec;

rimraf.sync('bower_components/content-editor*');
rimraf.sync('bower_components/content-player*');

execSync('node node_modules/bower/bin/bower cache clean', { stdio: 'inherit' });
execSync('node node_modules/bower/bin/bower install', { stdio: 'inherit' });
execSync('npm install', { stdio: 'inherit' });
