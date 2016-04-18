Error.stackTraceLimit = Infinity;
require('phantomjs-polyfill');
require('es6-promise');
require('es6-shim');
require('reflect-metadata');
require('zone.js');
require('rxjs');

var jQuery = require('jquery/dist/jquery.js');
window.jQuery = jQuery;
window.$ = jQuery;

require('./test/lib/aui-5.9.15.js');
require('./test/lib/aui-experimental-5.9.15.js');

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