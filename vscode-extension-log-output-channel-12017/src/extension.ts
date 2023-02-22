import {
    commands,
    Disposable,
    ExtensionContext,
    LogLevel,
    LogOutputChannel,
    window
} from 'vscode';

export function activate(context: ExtensionContext) {
    new TestLogOutputChannelExtension(context);
}

export function deactivate() {
    // no-op
}

export class TestLogOutputChannelExtension {

    protected logOutput: LogOutputChannel;

    constructor(readonly context: ExtensionContext) {

        const disposables: Disposable[] = [];
        context.subscriptions.push(new Disposable(() => Disposable.from(...disposables).dispose()));

        this.logOutput = window.createOutputChannel('LogOutputChannel-Test-12017', { log: true });
        disposables.push(this.logOutput);

        const onDidChangeLogLevel = (logLevel: LogLevel) => {
            this.logOutput.appendLine(`LogLevel set to: ${LogLevel[logLevel]}`);
        };
        disposables.push(this.logOutput.onDidChangeLogLevel(onDidChangeLogLevel));
        onDidChangeLogLevel(this.logOutput.logLevel);

        // register commands to trigger logging messages
        this.registerCommands();

        // show LogOutputChannel-Test-12017 in output widget
        this.logOutput.show(true);
    }

    protected registerCommands(): void {
        this.context.subscriptions.push(
            commands.registerCommand(this.getLogMessageCommandId('trace'), () => {
                this.logOutput.trace('Logging a TRACE message via LogOutputChannel');
            }),
            commands.registerCommand(this.getLogMessageCommandId('debug'), () => {
                this.logOutput.debug('Logging a DEBUG message via LogOutputChannel');
            }),
            commands.registerCommand(this.getLogMessageCommandId('info'), () => {
                this.logOutput.info('Logging an INFO message via LogOutputChannel');
            }),
            commands.registerCommand(this.getLogMessageCommandId('warning'), () => {
                this.logOutput.warn('Logging a WARNING message via LogOutputChannel');
            }),
            commands.registerCommand(this.getLogMessageCommandId('error'), () => {
                this.logOutput.error('Logging an ERROR message via LogOutputChannel');
            })
        );
    }

    private getLogMessageCommandId(logLevel: string): string {
        return `logoutputview.message.${logLevel}`;
    }
}