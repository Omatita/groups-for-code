// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('groups-for-code.addToGroup', async () => {
        let activeTab = getActiveTab();
        let value = await vscode.window.showInputBox({
            placeHolder: "group",
            prompt: "To what group do you want to add the active tab?"
        });

        if (value !== '') {
            
            vscode.window.showInformationMessage(`${activeTab.label} added to group: ${value}`);
        } else{
            vscode.window.showErrorMessage(`Error while adding the tab to group: group undefined`);
		}

    });

	context.subscriptions.push(disposable);
}

function getActiveTab(){ return vscode.window.tabGroups.activeTabGroup.activeTab; }

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
