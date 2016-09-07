Error.stackTraceLimit = Infinity;

require('phantomjs-polyfill');
require('es6-shim');
require('reflect-metadata');
require('zone.js');
require('rxjs');
require('zone.js/dist/async-test.js');


var jQuery = require('jquery/dist/jquery.js');
window.jQuery = jQuery;
window.$ = jQuery;

require('./test/lib/aui-5.9.15.js');
require('./test/lib/aui-experimental-5.9.15.js');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');
testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
var testContext = require.context('./src', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);