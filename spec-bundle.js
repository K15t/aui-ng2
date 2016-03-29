Error.stackTraceLimit = Infinity;
require('phantomjs-polyfill');
require('es6-promise');
require('es6-shim');
require('reflect-metadata');
require('./lib/jquery-1.8.3');
require('./lib/aui-5.9.15');
require('./lib/aui-experimental-5.9.15');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');
testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
var testContext = require.context('./src', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);