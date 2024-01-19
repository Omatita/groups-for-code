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
     * TODO return error if the tab is already in a group or move it
     */
    let addGroupCommand = vscode.commands.registerCommand('groups-for-code.addToGroup', async () => {
        let activeTab = utils.getActiveTab();

        let value = await vscode.window.showInputBox({
            placeHolder: "group",
            prompt: "To what group do you want to add the active tab?"
        });

        if (value !== '') {
            if(state.addToGroup(activeTab.label, value))
                vscode.window.showInformationMessage(`${activeTab.label} added to group: ${value}`);
            else
                vscode.window.showErrorMessage(`${activeTab.label} not added to group: tab already in a group`);

        } else{
            vscode.window.showErrorMessage(`Error while adding the tab to group: group undefined`);
		}

    });

    return [addGroupCommand, showGroupsCommand, resetCommand];
}

module.exports = {
    registerCommands
};
