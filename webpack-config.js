var master = require('k15t-webpack-build/webpack-master-config.js');
var utils = require('k15t-webpack-build/utils.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var path = require('path');

if (process.env.testMode === 'true') {
    module.exports = master({
        metadata: {
            appPrefix: 'auiNg'
        },
        basePath: '',
        autoWatch: true,
        autoWatchBatchDelay: 300,
        output: {
            path: './target'
        },
        module: {
            noParse: [
                utils.getAbsolutePath('zone.js/dist')
            ]
        }
    });
} else {

    var targetDir;

    var testingEnabled = (process.env.testMode === 'true' || process.env.testMode === true) || false;
    var devModeEnabled = (process.env.devMode === 'true' || process.env.devMode === true) || false;

    if (process.env.release === 'true') {
        targetDir = './dist';
    } else if (process.env.npm_config_releasedemo === 'true') {
        targetDir = './public';
    } else {
        targetDir = './target';
    }

    module.exports = master({
        metadata: {
            contextPath: process.env.npm_config_releasedemo === 'true' ? '/aui-ng2' : '',
            appPrefix: 'auiNg'
        },
        module: {
            preLoaders: [
                {
                    test: /\.ts$/,
                    loader: 'tslint-loader',
                    exclude: [
                        /node_modules/
                    ]
                },
                {
                    test: /\.ts|\.js$/,
                    loader: 'string-replace',
                    query: {
                        search: '"use strict";',
                        replace: '',
                        flags: 'i'
                    }
                }],
            loaders: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    query: {
                        // remove TypeScript helpers to be injected below by DefinePlugin
                        'compilerOptions': {
                            'removeComments': !devModeEnabled,
                            'noEmitHelpers': !devModeEnabled
                        },
                        'ignoreDiagnostics': [
                            2403, // 2403 -> Subsequent variable declarations
                            2300, // 2300 -> Duplicate identifier
                            2374, // 2374 -> Duplicate number index signature
                            2375  // 2375 -> Duplicate string index signature
                        ]
                    },
                    compilerOptions: './tsconfig.json',
                    exclude: testingEnabled ? [] : [/\.(spec)\.ts$/]
                },

                {test: /\.json$/, loader: 'json-loader'},
                {test: /\.css$/, loader: 'raw-loader'},
                {test: /\.html$/, loader: 'raw-loader'}
            ]
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
