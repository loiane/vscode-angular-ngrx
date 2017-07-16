import { IPath } from './models/path';
import { window, workspace, TextEditor } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class VsCodePrompt {
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

      const newFolderPath: string = fs
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
                const params = fileName.split(' ');
                let dirName = '';
                let dirPath = '';
                const fullPath = path.join(newFolderPath, fileName);
                if (fileName.indexOf('\\') !== -1) {
                  const pathParts = fileName.split('\\');
                  dirName = pathParts[0];
                  fileName = pathParts[1];
                }
                dirPath = path.join(newFolderPath, dirName);
                resolve({
                  fullPath,
                  fileName: fileName,
                  dirName,
                  dirPath,
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
}
