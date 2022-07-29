import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    new TestEvaluatableExpressionExtension(context);
}

export function deactivate() {
    // no-op
}

export class TestEvaluatableExpressionExtension {

    constructor(readonly context: vscode.ExtensionContext) {
        const msg = '[TestEvaluatableExpressionExtension] register provider';
        vscode.window.showInformationMessage(msg);
        this.registerProvider();
    }

    protected registerProvider(): void {
        // override VS Code's default implementation of the debug hover for Java
        const provideEvaluatableExpression = {
            provideEvaluatableExpression(document: vscode.TextDocument, position: vscode.Position): vscode.ProviderResult<vscode.EvaluatableExpression> {
                const wordRange = document.getWordRangeAtPosition(position);
                const evaluatableExpression = wordRange ? new vscode.EvaluatableExpression(wordRange) : undefined;
                const msg = '[TestEvaluatableExpressionExtension] provide word range for position ' + JSON.stringify(position, undefined, 2) + ' > ' + JSON.stringify(wordRange, undefined, 2);
                vscode.window.showInformationMessage(msg);
                return evaluatableExpression;
            }
        };
        vscode.languages.registerEvaluatableExpressionProvider('java', provideEvaluatableExpression);
    }

}