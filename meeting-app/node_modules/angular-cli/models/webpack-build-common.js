"use strict";
var webpack = require('webpack');
var path = require('path');
var glob_copy_webpack_plugin_1 = require('../plugins/glob-copy-webpack-plugin');
var package_chunk_sort_1 = require('../utilities/package-chunk-sort');
var base_href_webpack_1 = require('@angular-cli/base-href-webpack');
var webpack_build_utils_1 = require('./webpack-build-utils');
var autoprefixer = require('autoprefixer');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SilentError = require('silent-error');
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('source-map-loader')
 * require('raw-loader')
 * require('script-loader')
 * require('json-loader')
 * require('url-loader')
 * require('file-loader')
 */
function getWebpackCommonConfig(projectRoot, environment, appConfig, baseHref, sourcemap, vendorChunk, verbose, progress, outputHashing) {
    var appRoot = path.resolve(projectRoot, appConfig.root);
    var nodeModules = path.resolve(projectRoot, 'node_modules');
    var extraPlugins = [];
    var extraRules = [];
    var entryPoints = {};
    // figure out which are the lazy loaded entry points
    var lazyChunks = webpack_build_utils_1.lazyChunksFilter(webpack_build_utils_1.extraEntryParser(appConfig.scripts, appRoot, 'scripts').concat(webpack_build_utils_1.extraEntryParser(appConfig.styles, appRoot, 'styles')));
    if (appConfig.main) {
        entryPoints['main'] = [path.resolve(appRoot, appConfig.main)];
    }
    // determine hashing format
    var hashFormat = webpack_build_utils_1.getOutputHashFormat(outputHashing);
    // process global scripts
    if (appConfig.scripts.length > 0) {
        var globalScripts = webpack_build_utils_1.extraEntryParser(appConfig.scripts, appRoot, 'scripts');
        // add script entry points
        globalScripts.forEach(function (script) {
            return entryPoints[script.entry]
                ? entryPoints[script.entry].push(script.path)
                : entryPoints[script.entry] = [script.path];
        });
        // load global scripts using script-loader
        extraRules.push({
            include: globalScripts.map(function (script) { return script.path; }), test: /\.js$/, loader: 'script-loader'
        });
    }
    if (vendorChunk) {
        extraPlugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['main'],
            minChunks: function (module) { return module.userRequest && module.userRequest.startsWith(nodeModules); }
        }));
    }
    // process environment file replacement
    if (appConfig.environments) {
        if (!('source' in appConfig.environments)) {
            throw new SilentError("Environment configuration does not contain \"source\" entry.");
        }
        if (!(environment in appConfig.environments)) {
            throw new SilentError("Environment \"" + environment + "\" does not exist.");
        }
        extraPlugins.push(new webpack.NormalModuleReplacementPlugin(
        // This plugin is responsible for swapping the environment files.
        // Since it takes a RegExp as first parameter, we need to escape the path.
        // See https://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
        new RegExp(path.resolve(appRoot, appConfig.environments['source'])
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')), path.resolve(appRoot, appConfig.environments[environment])));
    }
    // process asset entries
    if (appConfig.assets) {
        extraPlugins.push(new glob_copy_webpack_plugin_1.GlobCopyWebpackPlugin({
            patterns: appConfig.assets,
            globOptions: { cwd: appRoot, dot: true, ignore: '**/.gitkeep' }
        }));
    }
    if (progress) {
        extraPlugins.push(new ProgressPlugin({ profile: verbose, colors: true }));
    }
    return {
        devtool: sourcemap ? 'source-map' : false,
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [nodeModules],
        },
        resolveLoader: {
            modules: [nodeModules]
        },
        context: projectRoot,
        entry: entryPoints,
        output: {
            path: path.resolve(projectRoot, appConfig.outDir),
            publicPath: appConfig.deployUrl,
            filename: "[name]" + hashFormat.chunk + ".bundle.js",
            sourceMapFilename: "[name]" + hashFormat.chunk + ".bundle.map",
            chunkFilename: "[id]" + hashFormat.chunk + ".chunk.js"
        },
        module: {
            rules: [
                { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [nodeModules] },
                { test: /\.json$/, loader: 'json-loader' },
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.(eot|svg)$/, loader: "file-loader?name=[name]" + hashFormat.file + ".[ext]" },
                {
                    test: /\.(jpg|png|gif|otf|ttf|woff|woff2)$/,
                    loader: "url-loader?name=[name]" + hashFormat.file + ".[ext]&limit=10000"
                }
            ].concat(extraRules)
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(appRoot, appConfig.index),
                filename: path.resolve(appConfig.outDir, appConfig.index),
                chunksSortMode: package_chunk_sort_1.packageChunkSort(['inline', 'styles', 'scripts', 'vendor', 'main']),
                excludeChunks: lazyChunks,
                xhtml: true
            }),
            new base_href_webpack_1.BaseHrefWebpackPlugin({
                baseHref: baseHref
            }),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: Infinity,
                name: 'inline'
            })
        ].concat(extraPlugins),
        node: {
            fs: 'empty',
            global: true,
            crypto: 'empty',
            tls: 'empty',
            net: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
}
exports.getWebpackCommonConfig = getWebpackCommonConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-build-common.js.map