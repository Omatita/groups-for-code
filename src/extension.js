const stateManager = require('./stateManager.js');
const vscode = require('vscode');
const commands = require('./extensionCommmmands.js');
const groupView = require('./groupView.js');

let extensionContext;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    extensionContext = context;
    const state = new stateManager(extensionContext);

    let comms = commands.registerCommands(context, state);

	context.subscriptions.push(...comms);

    const view = new groupView.GroupViewDataProvider(state);
    vscode.window.createTreeView('groups-for-code.activeGroups', { treeDataProvider: view });

}

function deactivate(state) {
    state.saveState();
}

module.exports = {
	activate,
	deactivate
}
