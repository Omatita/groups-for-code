class StateManager {
    constructor(context) {
        this.context = context;
        this.tabGroups = {};
        this.loadState();
    }


    // Methods
    // .---.---.---.---.---.---.---.---.---.---.---.---

    
    /**
     * Loads the states of all groups and tabs
     */
    loadState() {
        const serializedData = this.context.globalState.get('tabGroups');
        if (serializedData) {
            this.tabGroups = JSON.parse(serializedData);
        } else {
            this.tabGroups = {};
        }
    }


    /**
     * Saves the states of all groups
     */
    saveState() {
        const serializedData = JSON.stringify(this.tabGroups);
        this.context.globalState.update('tabGroups', serializedData);
    }


    /**
     * Eliminates all groups and saves the state, it will not be possible to restore them afterwards
     */
    resetState() {
        this.tabGroups = {};
        this.saveState();
    }


    /**
     * checks if the tab is already in other groups
     * @param {*} tabLabel name of the label usually taken from the active tab
     * @returns true if the tab is grouped
     */
    isTabGrouped(tabLabel) {
        for (let groupName in this.tabGroups) {
            if (this.tabGroups.hasOwnProperty(groupName)) {
                if (this.tabGroups[groupName].includes(tabLabel)) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * Adds a tab to a group and saves the state
     * @param {*} tabLabel name of the label usually taken from the active tab
     * @param {*} groupName name of the group taken from the user
     * @returns true if the tab is added succesfully to the group, false otherwise
     */
    addToGroup(tabLabel, groupName) {
        if(this.isTabGrouped(tabLabel))
            return false;
        else{
            if (!this.tabGroups[groupName]) {
                this.tabGroups[groupName] = [];
                this.tabGroups[groupName].push(tabLabel);
    
            }else if(!this.tabGroups[groupName].includes(tabLabel))
                this.tabGroups[groupName].push(tabLabel);
            else 
                return false;
        }

        this.saveState();

        return true;
    }

    /**
     * 
     * @param {*} groupId, the group's ID
     * @returns all tabs belonging to a group
     */
    getTabsForGrup(groupId) {
        return this.tabs[groupId] || [];
    }

    // Properties
    // .---.---.---.---.---.---.---.---.---.---.---.---
    get groups() {
        return this.tabGroups;
    }


}

module.exports = StateManager;
