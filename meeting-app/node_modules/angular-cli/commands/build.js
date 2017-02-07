"use strict";
var Command = require('../ember-cli/lib/models/command');
var BuildCommand = Command.extend({
    name: 'build',
    description: 'Builds your app and places it into the output path (dist/ by default).',
    aliases: ['b'],
    availableOptions: [
        {
            name: 'target',
            type: String,
            default: 'development',
            aliases: ['t', { 'dev': 'development' }, { 'prod': 'production' }]
        },
        { name: 'environment', type: String, default: '', aliases: ['e'] },
        { name: 'output-path', type: 'Path', default: null, aliases: ['o'] },
        { name: 'watch', type: Boolean, default: false, aliases: ['w'] },
        { name: 'watcher', type: String },
        { name: 'suppress-sizes', type: Boolean, default: false },
        { name: 'base-href', type: String, default: null, aliases: ['bh'] },
        { name: 'aot', type: Boolean, default: false },
        { name: 'sourcemap', type: Boolean, aliases: ['sm'] },
        { name: 'vendor-chunk', type: Boolean, default: true },
        { name: 'verbose', type: Boolean, default: false },
        { name: 'progress', type: Boolean, default: true },
        { name: 'i18n-file', type: String, default: null },
        { name: 'i18n-format', type: String, default: null },
        { name: 'locale', type: String, default: null },
        { name: 'deploy-url', type: String, default: null, aliases: ['d'] },
        {
            name: 'output-hashing',
            type: String,
            values: ['none', 'all', 'media', 'bundles'],
            description: 'define the output filename cache-busting hashing mode'
        },
        { name: 'extract-css', type: Boolean, default: true }
    ],
    run: function (commandOptions) {
        return require('./build.run').default.call(this, commandOptions);
    }
});
BuildCommand.overrideCore = true;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BuildCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/build.js.map