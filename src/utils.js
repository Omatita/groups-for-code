const vscode = require('vscode');

/**
 * @returns the asctive tab object
 */
function getActiveTab() {
    let label = vscode.window.tabGroups.activeTabGroup.activeTab.label;
    let path = vscode.window.activeTextEditor.document.uri.fsPath;

    return { label, path };
}


/**
 * @returns all open tabs 
 */
function getOpenTabs() {
    let tabs = vscode.window.tabGroups.activeTabGroup.tabs;
    let docs = vscode.workspace.textDocuments;
    let open = []; 

    let tabMap = [];

    tabs.forEach(tab => {
        tabMap.push(tab.label);
    });

    //TODO get paths and add them to `open` with the tab labels
}

module.exports = {
    getActiveTab,
    getOpenTabs
}