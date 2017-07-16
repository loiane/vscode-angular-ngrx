'use strict';
import { NgrxCli } from './ngrx-cli';
import { ExtensionContext, commands, window, workspace } from 'vscode';
import { VsCodePrompt } from './vs-code-prompt';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const ngrxCli = new NgrxCli();
  const vsCodePrompt = new VsCodePrompt();

  const commandsMap = {
    'extension.addNgRxUtil': {
      template: 'util',
      fileName: 'util.ts',
      callback: ngrxCli.generateAppStoreFolder
    },
    'extension.addNgRxFeatureStore': {
      template: 'feature store',
      fileName: 'feature-name',
      callback: ngrxCli.generateFeatureStore
    }
  };

  const showDynamicDialog = (args, template, fileName, callback) => {
    vsCodePrompt
      .showFileNameDialog(args, template, fileName)
      .then(loc => callback(loc))
      .catch(err => window.showErrorMessage(err));
  };

  for (const [key, value] of Object.entries(commandsMap)) {
    const command = commands.registerCommand(key, args =>
      showDynamicDialog(args, value.template, value.fileName, value.callback)
    );
    context.subscriptions.push(command);
  }
}
