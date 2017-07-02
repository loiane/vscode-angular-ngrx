import { IFiles } from './models/file';
import { IPath } from './models/path';
import { FileContents } from './file-contents';
import { FileUtils } from './file-utils';
import { window, workspace, TextEditor } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class NgrxCli {
	private fc = new FileContents();
	private fileUtils = new FileUtils();

	public showFileNameDialog(args, type, defaultTypeName): Promise<IPath> {
		return new Promise((resolve, reject) => {
			let clickedFolderPath: string;

			if (args) {
				clickedFolderPath = args.fsPath;
			} else {
				if (!window.activeTextEditor) {
					reject(
						'Please right-click on a file/folder and use the context menu!'
					);
				} else {
					clickedFolderPath = path.dirname(
						window.activeTextEditor.document.fileName
					);
				}
			}

			var newFolderPath: string = fs
				.lstatSync(clickedFolderPath)
				.isDirectory()
				? clickedFolderPath
				: path.dirname(clickedFolderPath);

			if (workspace.rootPath === undefined) {
				reject('Please open a project first.');
			} else {
				window
					.showInputBox({
						prompt: `Type the name of the new ${type}`,
						value: `${defaultTypeName}`
					})
					.then(
						fileName => {
							if (!fileName) {
								reject(
									'Please enter a valid name: no whitespaces or special characters'
								);
							} else {
								let params = fileName.split(' ');
								let dirName = '';
								let dirPath = '';
								let fullPath = path.join(
									newFolderPath,
									fileName
								);
								if (fileName.indexOf('\\') != -1) {
									let pathParts = fileName.split('\\');
									dirName = pathParts[0];
									fileName = pathParts[1];
								}
								dirPath = path.join(newFolderPath, dirName);
								resolve({
									fullPath: fullPath,
									fileName: fileName,
									dirName: dirName,
									dirPath: dirPath,
									rootPath: newFolderPath,
									params: []
								});
							}
						},
						error => console.error(error)
					);
			}
		});
	}

	public generateUtil = async (loc?: IPath) => {
		loc.fileName = 'util';
		loc.dirName = 'store';
		loc.dirPath = path.join(loc.dirPath, loc.dirName);

		var files: IFiles[] = [
			{
				name: path.join(loc.dirPath, `${loc.fileName}.ts`),
				content: this.fc.utilContent()
			}
		];

		await this.fileUtils.createFolder(loc);
		await this.fileUtils.createFiles(loc, files);
	};

	public generateFeatureStore = async (loc?: IPath) => {
		loc.dirName = 'store';
		loc.dirPath = path.join(loc.dirPath, loc.dirName);

		var files: IFiles[] = [
			{
				name: path.join(loc.dirPath, `${loc.fileName}.actions.ts`),
				content: this.fc.featureStateContent(loc.fileName)
			},
			{
				name: path.join(loc.dirPath, `${loc.fileName}.state.ts`),
				content: this.fc.featureStateContent(loc.fileName)
			},
			{
				name: path.join(loc.dirPath, `${loc.fileName}.reducer.ts`),
				content: this.fc.featureStateContent(loc.fileName)
			},
			{
				name: path.join(loc.dirPath, `${loc.fileName}.effects.ts`),
				content: this.fc.featureStateContent(loc.fileName)
			},
			{
				name: path.join(loc.dirPath, `${loc.fileName}.store.service.ts`),
				content: this.fc.featureStateContent(loc.fileName)
			}
		];

		await this.fileUtils.createFolder(loc);
		await this.fileUtils.createFiles(loc, files);
	};
}
