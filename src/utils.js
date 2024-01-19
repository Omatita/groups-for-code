const vscode = require('vscode');

function getActiveTab(){ return vscode.window.tabGroups.activeTabGroup.activeTab; }

module.exports = {
    getActiveTab
}