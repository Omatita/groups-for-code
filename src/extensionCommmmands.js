const vscode = require('vscode');
const utils = require('./utils');

function registerCommands(context, state) {

    /**
     * Resets all groups, all groups will be eliminated
     */
    let resetCommand = context.subscriptions.push(vscode.commands.registerCommand('groups-for-code.resetGroups', () => {
        state.resetState();
        vscode.window.showInformationMessage(`All groups have been reset.`);
    }));
    let removeGroupCommand = context.subscriptions.push(vscode.commands.registerCommand('groups-for-code.removeGroup', async () => {
        let groupOptions = Object.keys(state.groups).map(groupName => {
            return { label: groupName };
        });

        vscode.window.showQuickPick(groupOptions, {
            placeHolder: 'Chose a group'
        }).then(selectedGroupName => {
            if (selectedGroupName) {
                state.removeGroup(selectedGroupName.label);
                vscode.window.showInformationMessage(`'${selectedGroupName.label}' has been succesfully removed from the groups.`);
            }
        });
    }));
    

    let addGroupCommand = context.subscriptions.push(vscode.commands.registerCommand('groups-for-code.newGroup', async () => {
        let value = await vscode.window.showInputBox({
            placeHolder: "group",
            prompt: "To what group do you want to add the active tab?"
        });

        if(value)
            if(state.addGroup(value))
                vscode.window.showInformationMessage(`Group: ${value}, created correctly`);
            else
                vscode.window.showInformationMessage(`Error: group already existing`);
        else 
            vscode.window.showInformationMessage(`Error: undefined grouo name`);


        
    }));

    /**
     * shows all groups created
     */
    let showGroupsCommand = vscode.commands.registerCommand('groups-for-code.showGroups', async () => {
        let groups = state.groups;

        if (groups != null) {
            let displayText = 'Groups and their Tabs:\n';
            for (const group in groups) {
                displayText += `\nGroup: ${group.valueOf()}\nTabs: ${groups[group].join(', ')}\n\n`;
            }
            vscode.window.showInformationMessage(displayText);

        } else{
            vscode.window.showErrorMessage(`No group assigned`);
		}

    });


    /**
     * Adds a tab into a group
     */
    let addActiveToGroupCommand = vscode.commands.registerCommand('groups-for-code.addActiveToGroup', async () => {
        let activeTab = utils.getActiveTab();
        
        let value = await vscode.window.showInputBox({
            placeHolder: "group",
            prompt: "To what group do you want to add the active tab?"
        });
    
        // Get value from user's input
        if (value) {
            if (state.addToGroup(activeTab.label, activeTab.path, value))
                vscode.window.showInformationMessage(`${activeTab.label} added to group: ${value}`);
            else
                vscode.window.showErrorMessage(`${activeTab.label} not added to group: tab already in a group`);
        } else {
            vscode.window.showErrorMessage(`Error while adding the tab to group: no group selected`);
        }
    });
    return [removeGroupCommand, addActiveToGroupCommand, addGroupCommand, showGroupsCommand, resetCommand];
}

module.exports = {
    registerCommands
};
