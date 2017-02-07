"use strict";
var Command = require('../ember-cli/lib/models/command');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Command.extend({
    name: 'lint',
    description: 'Lints code in existing project',
    works: 'insideProject',
    run: function () {
        var LintTask = require('../tasks/lint').default;
        var lintTask = new LintTask({
            ui: this.ui,
            project: this.project
        });
        return lintTask.run();
    }
});
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/commands/lint.js.map