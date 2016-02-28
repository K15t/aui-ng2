var master = require('k15t-webpack-build/webpack-master-config.js');
var utils = require('k15t-webpack-build/utils.js');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

if (!!process.env.testMode) {
    module.exports = master({
        basePath: '',
        autoWatch: true,
        autoWatchBatchDelay: 300,
        module: {
            noParse: [
                utils.getAbsolutePath('zone.js/dist'),
                utils.getAbsolutePath('angular2/bundles')
            ]
        }
    });
} else {
    module.exports = master({
        entry: {
            main: './demo/main.ts',
            vendor: ['./demo/vendor.ts'],
            'aui-ng2-dialog': ['./src/dialog/index.ts']
        },
        output: {
            filename: '[name].min.js',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id].chunk.js',
            path: !!process.env.release ? './dist' : './target'
        },
        plugins: !!process.env.release ? [
            new CopyWebpackPlugin([{
                from: 'src',
                to: '.'
            }])
        ] : [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './demo/index.html',
                inject: false
            })
        ]
    });
}
