# vscode-extensions

Repository that provides VSCode extensions for testing purposes

- `vscode-extension-terminal-message-11145`: Simple VSCode extension that allows to test the optional message property on startup of a terminal (background <https://github.com/eclipse-theia/theia/issues/11145>)
- `vscode-extension-evaluatable-expression-provider-10027`: Simple VSCode extension to test a plugin that provides evaluatable expressions (background <https://github.com/eclipse-theia/theia/issues/10027>)
- `vscode-extension-log-output-channel-12017`: Simple VSCode extension that allows to test a plugin that uses the LogOutputChannel (background <https://github.com/eclipse-theia/theia/issues/12017>)

## Build and package

To build and package as `*.vsix` extension run

    cd vscode-extension-*
    yarn && yarn package
