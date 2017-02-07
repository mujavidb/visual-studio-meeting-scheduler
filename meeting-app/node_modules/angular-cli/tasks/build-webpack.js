"use strict";
var rimraf = require('rimraf');
var path = require('path');
var Task = require('../ember-cli/lib/models/task');
var webpack = require('webpack');
var webpack_config_1 = require('../models/webpack-config');
var _1 = require('../models/');
var config_1 = require('../models/config');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task.extend({
    run: function (runTaskOptions) {
        var _this = this;
        var project = this.cliProject;
        var outputDir = runTaskOptions.outputPath || config_1.CliConfig.fromProject().config.apps[0].outDir;
        var deployUrl = runTaskOptions.deployUrl ||
            config_1.CliConfig.fromProject().config.apps[0].deployUrl;
        rimraf.sync(path.resolve(project.root, outputDir));
        var config = new webpack_config_1.NgCliWebpackConfig(project, runTaskOptions.target, runTaskOptions.environment, outputDir, runTaskOptions.baseHref, runTaskOptions.i18nFile, runTaskOptions.i18nFormat, runTaskOptions.locale, runTaskOptions.aot, runTaskOptions.sourcemap, runTaskOptions.vendorChunk, runTaskOptions.verbose, runTaskOptions.progress, deployUrl, runTaskOptions.outputHashing, runTaskOptions.extractCss).config;
        var webpackCompiler = webpack(config);
        var statsConfig = _1.getWebpackStatsConfig(runTaskOptions.verbose);
        return new Promise(function (resolve, reject) {
            var callback = function (err, stats) {
                if (err) {
                    return reject(err);
                }
                _this.ui.writeLine(stats.toString(statsConfig));
                if (runTaskOptions.watch) {
                    return;
                }
                if (stats.hasErrors()) {
                    reject();
                }
                else {
                    resolve();
                }
            };
            if (runTaskOptions.watch) {
                webpackCompiler.watch({}, callback);
            }
            else {
                webpackCompiler.run(callback);
            }
        })
            .catch(function (err) {
            if (err) {
                _this.ui.writeError('\nAn error occured during the build:\n' + ((err && err.stack) || err));
            }
            throw err;
        });
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/tasks/build-webpack.js.map