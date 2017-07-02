import { IFiles } from './models/file';
import { IPath } from './models/path';
import { FileContents } from './file-contents';
import { window, workspace, TextEditor } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class NgrxCli {
	private fc = new FileContents();

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

	// Create the new folder
	public createFolder(loc: IPath): Promise<IPath> {
		return new Promise<IPath>((resolve, reject) => {
			if (loc.dirName) {
				fs.exists(loc.dirPath, exists => {
					if (!exists) {
						fs.mkdirSync(loc.dirPath);
						resolve(loc);
					} else {
						reject('Folder already exists');
					}
				});
			} else {
				resolve(loc);
			}
		});
	}

	public writeFiles(files: IFiles[]): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			var errors: string[] = [];
			files.forEach(file => {
				fs.writeFile(file.name, file.content, err => {
					if (err) {
						errors.push(err.message);
					}
					resolve(errors);
				});
			});
		});
	}

	// Get file contents and create the new files in the folder
	public createFiles(loc: IPath, files: IFiles[]): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			// write files
			this.writeFiles(files).then(errors => {
				if (errors.length > 0) {
					window.showErrorMessage(
						`${errors.length} file(s) could not be created. I'm sorry :-(`
					);
				} else {
					resolve(loc.dirPath);
				}
			});
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

		await this.createFolder(loc);
		await this.createFiles(loc, files);
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

		await this.createFolder(loc);
		await this.createFiles(loc, files);
	};
}
