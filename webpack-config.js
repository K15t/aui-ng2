var master = require('k15t-webpack-build/webpack-master-config.js');
var utils = require('k15t-webpack-build/utils.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');

if (process.env.testMode === 'true') {
    module.exports = master({
        basePath: '',
        autoWatch: true,
        autoWatchBatchDelay: 300,
        output: {
            path: './target'
        },
        module: {
            noParse: [
                utils.getAbsolutePath('zone.js/dist'),
                utils.getAbsolutePath('angular2/bundles')
            ]
        }
    });
} else {

    var targetDir;

    if (process.env.release === 'true') {
        targetDir = './dist';
    } else if (process.env.npm_config_releaseDemo === 'true') {
        targetDir = './public';
    } else {
        targetDir = './target';
    }

    module.exports = master({
        metadata: {
            contextPath: process.env.npm_config_releaseDemo === 'true' ? '/aui-ng2/' : ''
        },
        entry: {
            main: './demo/main.ts',
            vendor: './demo/vendor.ts'
        },
        envProperties: {
            PRODUCT_VERSION: require("./package.json").version,
            BUILD_TIME: (new Date).toLocaleString()
        },
        output: {
            filename: './demo/[name].min.js',
            sourceMapFilename: './demo/[name].map',
            chunkFilename: './demo/[id].chunk.js',
            path: targetDir,
            publicPath: process.env.npm_config_releaseDemo === 'true' ? 'http://k15t.github.io/aui-ng2/' : ''
        },
        addPlugins: function(devModeEnabled, testingEnabled, debugModeEnabled) {

            var plugins = [];

            if (process.env.release === 'true') {
                plugins.push(new CopyWebpackPlugin([{
                    from: 'src',
                    to: '.'
                }]));
            }

            plugins.push(new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './demo/index.html',
                inject: false
            }));

            plugins.push(new CommonsChunkPlugin({
                name: 'vendor',
                filename: './demo/[name].min.js',
                minChunks: Infinity
            }));

            return plugins;
        }
    });
}
