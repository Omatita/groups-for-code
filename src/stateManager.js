class StateManager {
    constructor(context) {
        this.context = context;
        this.tabGroups = {};
        this.loadState();
    }

    loadState() {
        const serializedData = this.context.globalState.get('tabGroups');
        if (serializedData) {
            this.tabGroups = JSON.parse(serializedData);
        } else {
            this.tabGroups = {};
        }
    }

    saveState() {
        const serializedData = JSON.stringify(this.tabGroups);
        this.context.globalState.update('tabGroups', serializedData);
    }

    resetState() {
        this.tabGroups = {};
        this.saveState();
    }

    get groups() {
        return this.tabGroups;
    }

    addToGroup(tabLabel, groupName) {
        if (!this.tabGroups[groupName]) {
            this.tabGroups[groupName] = [];
        }
        if (this.tabGroups[groupName].indexOf(tabLabel) === -1) {
            this.tabGroups[groupName].push(tabLabel);
        }
        this.saveState();
    }
}

module.exports = StateManager;
