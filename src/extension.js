// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const stateManager = require('./stateManager.js');
const commands = require('./extensionCommmmands.js');


let extensionContext;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    extensionContext = context;
    const state = new stateManager(extensionContext);

    let comms = commands.registerCommands(context, state);

	context.subscriptions.push(...comms);

}

function deactivate(state) {
    state.saveState();
}

module.exports = {
	activate,
	deactivate
}
