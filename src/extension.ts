'use strict';
import { NgrxCli } from './ngrx-cli';
import { ExtensionContext, commands, window, workspace } from 'vscode';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const ngrxCli = new NgrxCli();

	const commandsMap = {
		'extension.addNgRxUtil': {
			template: 'util',
			fileName: 'util.ts',
			callback: ngrxCli.generateUtil
		},
		'extension.addNgRxFeatureStore': {
			template: 'feature store',
			fileName: 'feature-name',
			callback: ngrxCli.generateFeatureStore
		}
	};

	const showDynamicDialog = (args, template, fileName, callback) => {
		ngrxCli
			.showFileNameDialog(args, template, fileName)
			.then(loc => callback(loc))
			.catch(err => window.showErrorMessage(err));
	};

	for (let [key, value] of Object.entries(commandsMap)) {
		const command = commands.registerCommand(key, args =>
			showDynamicDialog(
				args,
				value.template,
				value.fileName,
				value.callback
			)
		);
		context.subscriptions.push(command);
	}
}
