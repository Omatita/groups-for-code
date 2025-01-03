class StateManager {
    /**
     * 
     * @param {vscode.context} context: the context of the extension
     */
    constructor(context) {
        this.context = context;
        this.tabGroups = {};
        this.view = null;
        this.loadState();
    }


    // Methods
    // .---.---.---.---.---.---.---.---.---.---.---.---


    /**
     * Loads the states of all groups and tabs
     */
    loadState() {
        const serializedData = this.context.globalState.get('tabGroups'); // retrieve groups data

        if (serializedData) {
            this.tabGroups = JSON.parse(serializedData);
        } else {
            this.tabGroups = {};
        }
    }


    /**
     * Saves the states of all groups and refreshes the view
     */
    saveState() {
        const serializedData = JSON.stringify(this.tabGroups);

        this.context.globalState.update('tabGroups', serializedData); // update global state and refresh the view
        this.view.refresh();
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
     * @param {string} tabLabel name of the label usually taken from the active tab
     * @returns true if the tab is grouped
     */
    isTabGrouped(tabPath) {
        for (let groupName in this.tabGroups) { // for each group check if the tab is grouped
            if (this.tabGroups.hasOwnProperty(groupName)) {
                if (this.tabGroups[groupName].some(tab => tab.path === tabPath)) {

                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Removes a group 
     * @param {string} groupName 
     * @returns true if the group gets removed succesfully
     */
    removeGroup(groupName) {
        if (groupName) {
            if (this.tabGroups[groupName]) {
                delete this.tabGroups[groupName];
                this.saveState();
                return true;
            } else return false;
        } else
            return false;
    }

    /**
     * removes a trab from any group
     * @param {string} tabName 
     * @returns true if no error occurs
     */
    removeTab(tabName) {
        try {
            Object.keys(this.tabGroups).forEach(groupName => {
                this.tabGroups[groupName] = this.tabGroups[groupName].filter(tab => tab.label !== tabName);
            });
            this.saveState(); // Save the updated state and refresh the view
        }catch(e){
            return false;
        }
        

        return true;
    }


    /**
     * Adds an empty group
     * @param {string} tabLabel the name of the tab
     * @param {string} tabPath the path of the tab
     * @param {string} groupName the name of the group
     * @returns true if the tab is succesfully added to the group
     */
    addToGroup(tabLabel, tabPath, groupName) {
        // Controllo se la scheda è già raggruppata
        if (this.isTabGrouped(tabPath))
            return false;

        const tab = { label: tabLabel, path: tabPath };

        if (!this.tabGroups[groupName]) {
            this.tabGroups[groupName] = [tab];
        } else if (!this.tabGroups[groupName].find(t => t.label === tabLabel)) {
            this.tabGroups[groupName].push(tab);
        } else {
            return false;
        }

        this.saveState();
        return true;
    }

    /**
     * Adds a tab to a group and saves the state
     * @param {string} groupName name of the group taken from the user
     * @returns true if the group is created succesfully, false otherwise
     */
    addGroup(groupName) {
        if (groupName)
            if (!this.tabGroups[groupName]) {
                this.tabGroups[groupName] = [];
                this.saveState();
                return true;
            } else
                return false;
        else
            return false;
    }

    /**
     * Sets the view 
     * @param {GroupViewItem} view 
     */
    setView(view) {
        this.view = view;
    }

    /**
     * returns all the tabs belonging to a given group
     * @param {string} groupId, the group's ID
     * @returns all tabs belonging to a group
     */
    getTabsForGroup(groupId) {
        if (this.tabGroups[groupId]) {
            return this.tabGroups[groupId].map(tab => {
                return { label: tab.label, path: tab.path };
            });
        } else {
            return [];
        }
    }


    // Properties
    // .---.---.---.---.---.---.---.---.---.---.---.---


    /**
     * @returns the list of all groups
     */
    get groups() {
        return this.tabGroups;
    }


}

module.exports = StateManager;
