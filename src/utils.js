const vscode = require('vscode');

/**
 * 
 * @returns the asctive tab object
 */
function getActiveTab() {
    let label = vscode.window.tabGroups.activeTabGroup.activeTab.label;
    let path = vscode.window.activeTextEditor.document.uri.fsPath;

    return { label, path };
}

module.exports = {
    getActiveTab
}