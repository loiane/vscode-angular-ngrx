import { IFiles } from './models/file';
import { IPath } from './models/path';
import { window } from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class FileUtils {
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

  private writeFiles(files: IFiles[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      const errors: string[] = [];
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

  public createFiles(loc: IPath, files: IFiles[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.writeFiles(files).then(errors => {
        if (errors.length > 0) {
          window.showErrorMessage(
            `${errors.length} file(s) could not be created.`
          );
        } else {
          resolve(loc.dirPath);
        }
      });
    });
  }

  public static getFileName(loc: IPath, fileName: string): string {
    return path.join(loc.dirPath, fileName)
  }
}
