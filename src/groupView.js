const vscode = require('vscode');

class GroupViewItem extends vscode.TreeItem {
    constructor(label, collapsibleState) {
        super(label, collapsibleState);
    }
}

class GroupViewDataProvider {
    constructor(stateManager) {
        this.stateManager = stateManager;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;

    }

    refresh() {
        this._onDidChangeTreeData.fire();
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
            // Assicurati che questo sia un array
            const tabs = this.stateManager.getTabsForGroup(element.label); // Modifica qui
            return this.createTabItems(tabs);
        }
    }


    createGroupItems() {
        let groups = this.stateManager.groups;
        return Object.keys(groups).map(groupName =>
            new GroupViewItem(groupName, vscode.TreeItemCollapsibleState.Collapsed));
    }

    createTabItems(groupName) {
        let tabs = this.stateManager.getTabsForGroup(groupName);
    
        if (!Array.isArray(tabs)) {
            // Se 'tabs' non è un array, restituisci un array vuoto o gestisci l'errore
            return [];
        }
    
        return tabs.map(tab =>
            new GroupViewItem(tab.label, vscode.TreeItemCollapsibleState.None)
        );
    }

}


module.exports = {
    GroupViewItem,
    GroupViewDataProvider
};