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
    const openTabs = vscode.window.tabGroups.all[0].tabs;

    const tabsInfo = openTabs
        .filter(tab => tab.label && tab.input.uri )
        .map(tab => ({
            label: tab.label || 'Untitled',
            path: tab.input.uri.fsPath
        }));

    return tabsInfo;
}

module.exports = {
    getActiveTab,
    getOpenTabs
}
