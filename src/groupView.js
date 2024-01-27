const vscode = require('vscode');

class GroupViewDataProvider {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    /**
     * updates the view
     */
    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (element === undefined) {
            // create group elements
            return this.createGroupItems();
        } else {
            // if not undefined
            const groupName = element.label; // use 'label' ad gropu ID
            return this.createTabItems(groupName);
        }
    }


    createGroupItems() {
        let groups = this.stateManager.groups;
        return Object.keys(groups).map(groupName =>
            new GroupViewItem(groupName, vscode.TreeItemCollapsibleState.Collapsed));
    }

    createTabItems(groupName) {
        const tabs = this.stateManager.getTabsForGroup(groupName);
        return tabs.map(tab => 
            new TabViewItem(tab.label, tab.path, vscode.TreeItemCollapsibleState.None));
    }

}

class TabViewItem extends vscode.TreeItem {
    constructor(label, path) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.path = path;
        this.tooltip = path; // opzionale, mostra il percorso come tooltip
        this.command = { // Quando l'elemento viene cliccato, apre il file
            command: 'groups-for-code.openTab',
            title: 'Open Tab',
            arguments: [path]
        };
    }
}
class GroupViewItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
        this.contextValue = 'group'; // Usa questo per mostrare il comando solo sugli elementi del gruppo
        this.command = {
            command: 'groups-for-code.openGroupTabs',
            title: "Open All Tabs",
            arguments: [label] // Passa il nome del gruppo al comando
        };

    }
}

module.exports = {
    GroupViewItem,
    GroupViewDataProvider
};