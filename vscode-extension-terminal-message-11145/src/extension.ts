import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	new TestTerminalExtension(context);
}

export function deactivate() {
    // no-op
 }

export const OpenTerminalWithMessageCommand = { id: 'openTerminal.with' };
export const OpenTerminalWithMessageAndLineBreakCommand = { id: 'openTerminal.withlinebreak' };
export const OpenTerminalWithMessageAndTabCommand = { id: 'openTerminal.withtab' };
export const OpenTerminalWithoutMessageCommand = { id: 'openTerminal.without' };

export class TestTerminalExtension {

    constructor(readonly context: vscode.ExtensionContext) {
        this.registerCommands();
    }

    protected registerCommands(): void {
        this.context.subscriptions.push(
            vscode.commands.registerCommand(OpenTerminalWithMessageCommand.id, () => {
                const options: vscode.TerminalOptions = {
                    name : 'TestTerminal1',
                    message : 'Initial test message for TestTerminal'
                };
                const terminal = vscode.window.createTerminal(options);
                terminal.show();
            })
        );

        this.context.subscriptions.push(
            vscode.commands.registerCommand(OpenTerminalWithMessageAndLineBreakCommand.id, () => {
                const options: vscode.TerminalOptions = {
                    name : 'TestTerminal2',
                    message : '== Welcome ==\nInitial test message for TestTerminal'
                };
                const terminal = vscode.window.createTerminal(options);
                terminal.show();
            })
        );

        this.context.subscriptions.push(
            vscode.commands.registerCommand(OpenTerminalWithMessageAndTabCommand.id, () => {
                const options: vscode.TerminalOptions = {
                    name : 'TestTerminal3',
                    message : '== Welcome ==\tInitial test message for TestTerminal'
                };
                const terminal = vscode.window.createTerminal(options);
                terminal.show();
            })
        );

        this.context.subscriptions.push(
            vscode.commands.registerCommand(OpenTerminalWithoutMessageCommand.id, () => {
                const options: vscode.TerminalOptions = {
                    name : 'TestTerminal4'
                };
                const terminal = vscode.window.createTerminal(options);
                terminal.show();
            })
        );
    }

}