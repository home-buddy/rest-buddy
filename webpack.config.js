/*eslint no-mixed-requires:0*/

'use strict';

var _ = require('ls-lodash'),
    webpack = require('webpack'),
    path = require('path'),
    fs = require('fs'),
    nodeModules = _(fs.readdirSync('node_modules'))
        .without('.bin')
        .map(function(modName) { return [modName, 'commonjs ' + modName]; })
        .zipObject()
        .valueOf();

module.exports = {
    entry: './lib/index.js',
    target: 'node',
    node: {
        console: false,
        process: false,
        global: false,
        Buffer: false,
        __filename: true,
        __dirname: true
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'rest-buddy.js'
    },
    externals: nodeModules,
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            { raw: true, entryOnly: false }
        )
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loaders: ['json']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    stage: 1,
                    optional: ['runtime']
                }
            }
        ]
    }
};
