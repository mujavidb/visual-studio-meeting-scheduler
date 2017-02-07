"use strict";
var version_1 = require('../upgrade/version');
var build_webpack_1 = require('../tasks/build-webpack');
function buildRun(commandOptions) {
    if (commandOptions.environment === '') {
        if (commandOptions.target === 'development') {
            commandOptions.environment = 'dev';
        }
        if (commandOptions.target === 'production') {
            commandOptions.environment = 'prod';
        }
    }
    if (!commandOptions.outputHashing) {
        if (commandOptions.target === 'development') {
            commandOptions.outputHashing = 'none';
        }
        if (commandOptions.target === 'production') {
            commandOptions.outputHashing = 'all';
        }
    }
    if (typeof commandOptions.sourcemap === 'undefined') {
        if (commandOptions.target == 'development') {
            commandOptions.sourcemap = true;
        }
        if (commandOptions.target == 'production') {
            commandOptions.sourcemap = false;
        }
    }
    var project = this.project;
    // Check angular version.
    version_1.Version.assertAngularVersionIs2_3_1OrHigher(project.root);
    var buildTask = new build_webpack_1.default({
        cliProject: project,
        ui: this.ui,
        outputPath: commandOptions.outputPath,
        target: commandOptions.target,
        environment: commandOptions.environment,
    });
    return buildTask.run(commandOptions);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildRun;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/build.run.js.map