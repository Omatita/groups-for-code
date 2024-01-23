const vscode = require('vscode');

function getActiveTab() {
    let label = vscode.window.tabGroups.activeTabGroup.activeTab.label;
    let path = vscode.window.activeTextEditor.document.uri.fsPath;
    
    vscode.window.showInformationMessage("active tab: " + label);
    vscode.window.showInformationMessage("path: " + path);


    return { label, path };
}

module.exports = {
    getActiveTab
}