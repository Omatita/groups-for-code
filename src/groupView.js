const vscode = require('vscode');

class GroupViewItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
    }
}

class GroupViewDataProvider {
    constructor(stateManager) {
        this.stateManager = stateManager;
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (element === undefined) {
            // Creare elementi group
            return this.createGroupItems();
        } else {
            // Creare elementi tab per un gruppo specifico
            return this.createTabItems(element.label);
        }
    }

    createGroupItems() {
        let groups = this.stateManager.groups;
        return Object.keys(groups).map(groupName =>
            new GroupViewItem(groupName, vscode.TreeItemCollapsibleState.Collapsed));
    }

    createTabItems(groupName) {
        let tabs = this.stateManager.getTabsForGrup(groupName);
        return tabs.map(tabLabel =>
            new GroupViewItem(tabLabel, vscode.TreeItemCollapsibleState.None));
    }
}


module.exports = {
    GroupViewItem,
    GroupViewDataProvider
};