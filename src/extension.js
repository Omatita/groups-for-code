const stateManager = require('./stateManager.js');
const vscode = require('vscode');
const commands = require('./extensionCommmmands.js');
const groupView = require('./groupView.js');

let extensionContext;
let view;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    extensionContext = context;
    const state = new stateManager(extensionContext);
    view = new groupView.GroupViewDataProvider(state);
    state.setView(view);
    let comms = commands.registerCommands(context, state);

	context.subscriptions.push(...comms);
    vscode.window.createTreeView('groups-for-code.activeGroups', { treeDataProvider: view });

}

function deactivate(state) {
    state.saveState();
}

module.exports = {
	activate,
	deactivate,
    view
}
