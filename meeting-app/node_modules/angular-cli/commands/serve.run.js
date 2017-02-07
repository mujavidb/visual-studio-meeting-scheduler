"use strict";
var denodeify = require('denodeify');
var assign = require('lodash/assign');
var SilentError = require('silent-error');
var PortFinder = require('portfinder');
var serve_webpack_1 = require('../tasks/serve-webpack');
var version_1 = require('../upgrade/version');
PortFinder.basePort = 49152;
var getPort = denodeify(PortFinder.getPort);
function serveRun(commandOptions) {
    var _this = this;
    if (commandOptions.environment === '') {
        if (commandOptions.target === 'development') {
            commandOptions.environment = 'dev';
        }
        if (commandOptions.target === 'production') {
            commandOptions.environment = 'prod';
        }
    }
    // default to extractCss to true on prod target
    if (typeof commandOptions.extractCss === 'undefined') {
        commandOptions.extractCss = commandOptions.target === 'production';
    }
    // Check angular version.
    version_1.Version.assertAngularVersionIs2_3_1OrHigher(this.project.root);
    commandOptions.liveReloadHost = commandOptions.liveReloadHost || commandOptions.host;
    return checkExpressPort(commandOptions)
        .then(function () { return autoFindLiveReloadPort(commandOptions); })
        .then(function (opts) {
        commandOptions = assign({}, opts, {
            baseURL: _this.project.config(commandOptions.target).baseURL || '/'
        });
        var serve = new serve_webpack_1.default({
            ui: _this.ui,
            project: _this.project,
        });
        return serve.run(commandOptions);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = serveRun;
function checkExpressPort(commandOptions) {
    return getPort({ port: commandOptions.port, host: commandOptions.host })
        .then(function (foundPort) {
        if (commandOptions.port !== foundPort && commandOptions.port !== 0) {
            throw new SilentError("Port " + commandOptions.port + " is already in use.");
        }
        // otherwise, our found port is good
        commandOptions.port = foundPort;
        return commandOptions;
    });
}
function autoFindLiveReloadPort(commandOptions) {
    return getPort({ port: commandOptions.liveReloadPort, host: commandOptions.liveReloadHost })
        .then(function (foundPort) {
        // if live reload port matches express port, try one higher
        if (foundPort === commandOptions.port) {
            commandOptions.liveReloadPort = foundPort + 1;
            return autoFindLiveReloadPort(commandOptions);
        }
        // port was already open
        if (foundPort === commandOptions.liveReloadPort) {
            return commandOptions;
        }
        // use found port as live reload port
        commandOptions.liveReloadPort = foundPort;
        return commandOptions;
    });
}
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/serve.run.js.map