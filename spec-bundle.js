Error.stackTraceLimit = Infinity;
require('phantomjs-polyfill');
require('es6-promise');
require('es6-shim');
require('reflect-metadata');

var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');
testing.setBaseTestProviders(
  browser.TEST_BROWSER_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_APPLICATION_PROVIDERS);

console.log('CALL SPEC BUNDLE');

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
var testContext = require.context('./src', true, /\.spec\.ts/);

console.log(testContext);
console.log(testContext.length);

testContext.keys().forEach(testContext);