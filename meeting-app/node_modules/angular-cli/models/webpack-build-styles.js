"use strict";
var webpack = require('webpack');
var path = require('path');
var suppress_entry_chunks_webpack_plugin_1 = require('../plugins/suppress-entry-chunks-webpack-plugin');
var webpack_build_utils_1 = require('./webpack-build-utils');
var postcssDiscardComments = require('postcss-discard-comments');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * Enumerate loaders and their dependencies from this file to let the dependency validator
 * know they are used.
 *
 * require('raw-loader')
 * require('style-loader')
 * require('postcss-loader')
 * require('css-loader')
 * require('stylus')
 * require('stylus-loader')
 * require('less')
 * require('less-loader')
 * require('node-sass')
 * require('sass-loader')
 */
function getWebpackStylesConfig(projectRoot, appConfig, target, sourcemap, outputHashing, extractCss) {
    var appRoot = path.resolve(projectRoot, appConfig.root);
    var entryPoints = {};
    var globalStylePaths = [];
    var extraPlugins = [];
    // discard comments in production
    var extraPostCssPlugins = target === 'production' ? [postcssDiscardComments] : [];
    // determine hashing format
    var hashFormat = webpack_build_utils_1.getOutputHashFormat(outputHashing);
    // use includePaths from appConfig
    var includePaths = [];
    if (appConfig.stylePreprocessorOptions
        && appConfig.stylePreprocessorOptions.includePaths
        && appConfig.stylePreprocessorOptions.includePaths.length > 0) {
        appConfig.stylePreprocessorOptions.includePaths.forEach(function (includePath) {
            return includePaths.push(path.resolve(appRoot, includePath));
        });
    }
    // process global styles
    if (appConfig.styles.length > 0) {
        var globalStyles = webpack_build_utils_1.extraEntryParser(appConfig.styles, appRoot, 'styles');
        // add style entry points
        globalStyles.forEach(function (style) {
            return entryPoints[style.entry]
                ? entryPoints[style.entry].push(style.path)
                : entryPoints[style.entry] = [style.path];
        });
        // add global css paths
        globalStylePaths.push.apply(globalStylePaths, globalStyles.map(function (style) { return style.path; }));
    }
    // set base rules to derive final rules from
    var baseRules = [
        { test: /\.css$/, loaders: [] },
        { test: /\.scss$|\.sass$/, loaders: ['sass-loader'] },
        { test: /\.less$/, loaders: ['less-loader'] },
        // stylus-loader doesn't support webpack.LoaderOptionsPlugin properly,
        // so we need to add options in it's query
        { test: /\.styl$/, loaders: [("stylus-loader?" + JSON.stringify({
                    sourceMap: sourcemap,
                    paths: includePaths
                }))] }
    ];
    var commonLoaders = ['postcss-loader'];
    // load component css as raw strings
    var rules = baseRules.map(function (_a) {
        var test = _a.test, loaders = _a.loaders;
        return ({
            exclude: globalStylePaths, test: test, loaders: ['raw-loader'].concat(commonLoaders, loaders)
        });
    });
    // load global css as css files
    if (globalStylePaths.length > 0) {
        rules.push.apply(rules, baseRules.map(function (_a) {
            var test = _a.test, loaders = _a.loaders;
            return ({
                include: globalStylePaths, test: test, loaders: ExtractTextPlugin.extract({
                    remove: false,
                    loader: ['css-loader'].concat(commonLoaders, loaders),
                    fallbackLoader: 'style-loader',
                    // publicPath needed as a workaround https://github.com/angular/angular-cli/issues/4035
                    publicPath: ''
                })
            });
        }));
    }
    // supress empty .js files in css only entry points
    if (extractCss) {
        extraPlugins.push(new suppress_entry_chunks_webpack_plugin_1.SuppressExtractedTextChunksWebpackPlugin());
    }
    return {
        entry: entryPoints,
        module: { rules: rules },
        plugins: [
            // extract global css from js files into own css file
            new ExtractTextPlugin({
                filename: "[name]" + hashFormat.extract + ".bundle.css",
                disable: !extractCss
            }),
            new webpack.LoaderOptionsPlugin({
                options: {
                    postcss: [autoprefixer()].concat(extraPostCssPlugins),
                    cssLoader: { sourceMap: sourcemap },
                    sassLoader: { sourceMap: sourcemap, includePaths: includePaths },
                    // less-loader doesn't support paths
                    lessLoader: { sourceMap: sourcemap },
                    // stylus-loader doesn't support LoaderOptionsPlugin properly, options in query instead
                    // context needed as a workaround https://github.com/jtangelder/sass-loader/issues/285
                    context: projectRoot,
                },
            })
        ].concat(extraPlugins)
    };
}
exports.getWebpackStylesConfig = getWebpackStylesConfig;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/models/webpack-build-styles.js.map