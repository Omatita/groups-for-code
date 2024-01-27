const vscode = require('vscode');

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
            const groupName = element.label; // Utilizza 'label' dell'elemento come identificativo del gruppo
            return this.createTabItems(groupName);
        }
    }


    createGroupItems() {
        let groups = this.stateManager.groups;
        return Object.keys(groups).map(groupName =>
            new GroupViewItem(groupName, vscode.TreeItemCollapsibleState.Collapsed));
    }

    // createGroupItems() {
    //     // Ottieni i gruppi dallo stateManager
    //     const groups = this.stateManager.groups;
        
    //     // Assicurati che 'groups' sia un array prima di chiamare 'map'
    //     if (Array.isArray(groups)) {
    //         return groups.map(group => ({
    //             label: group.name,
    //             icon: "$(eye)",
    //             contextValue: 'group'
    //             // Aggiungi altre proprietà necessarie
    //         }));
    //     } else {
    //         // Se 'groups' non è un array, restituisci un array vuoto o gestisci l'errore come preferisci
    //         return [];
    //     }
    // }

    // createTabItems(tabs) {
    //     return tabs.map((tab) => {
    //         // Assumi che ogni 'tab' abbia proprietà 'label' e 'path'
    //         return {
    //             label: tab.label, // Usa la proprietà 'label' del tab per l'etichetta
    //             path: tab.path, // Includi il 'path' per poterlo utilizzare successivamente
    //             // Aggiungi altre proprietà necessarie per il tuo elemento
    //             tooltip: tab.label, // Opzionale: mostra la label come tooltip
    //             icon: tab.icon, // Opzionale: se i tab hanno icone
    //             command: { // Opzionale: se vuoi associare un comando quando un elemento viene cliccato
    //                 command: 'groups-for-code.openTab', // Sostituisci 'estensione.openTab' con il comando effettivo
    //                 title: 'Open Tab', // Titolo del comando
    //                 arguments: [tab.path] // Argomenti da passare al comando, come il percorso del tab
    //             }
    //         };
    //     });
    // }

    createTabItems(groupName) {
        // let tabs = this.stateManager.groups[groupName]; // Assumendo che ogni chiave corrisponda a un array di tab
        const tabs = this.stateManager.getTabsForGroup(groupName);
        return tabs.map(tab => 
            new TabViewItem(tab.label, tab.path, vscode.TreeItemCollapsibleState.None));
    }
    
    // createTabItems(groupName) {
    //     const tabs = this.stateManager.getTabsForGroup(groupName);
    //     if (Array.isArray(tabs)) {
    //         return tabs.map((tab) => {
    //             new TabViewItem(tab.label, tab.path, vscode.TreeItemCollapsibleState.None);
    //         });
    //     }
    //     return []; // Restituisce un array vuoto se tabs non è definito o non è un array
    // }
    

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