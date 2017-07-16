/*import { IFiles } from './../src/models/file';
import { FileUtils } from './../src/file-utils';
import { IPath } from './../src/models/path';
import * as myExtension from '../src/extension';
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

const testPath: IPath = {
  fileName: 'util.ts',
  dirName: 'store',
  dirPath: path.join(__dirname, 'store'),
};
const fileNames: IFiles[] = [
  {
    name: path.join(testPath.dirPath, testPath.fileName),
    content: 'let myVar = 1;',
  },
];

suite('FileUtils Tests', () => {
  suite('generating files command', () => {
    suiteTeardown(done => {
      checkIfTestFolderExistsAndDelete(done);
    });

    const fileUtils = new FileUtils();

    test('should create a new folder ', done => {
      fileUtils.createFolder(testPath).then(pathResolved => {
        assert.strictEqual(pathResolved.dirPath, testPath.dirPath);
        assert.strictEqual(fs.existsSync(testPath.dirPath), true);
        checkIfTestFolderExistsAndDelete();
        done();
      });
    });

    test('should alert if folder already exists', done => {
      fileUtils.createFolder(testPath).then(
        pathResolved => {
          fileUtils.createFolder(testPath).then(
            createdFolder => {
              checkIfTestFolderExistsAndDelete();
              done();
            },
            err => {
              assert.strictEqual(err, 'Folder already exists');
              checkIfTestFolderExistsAndDelete();
              done();
            }
          );
        },
        err => {
          handleError(err);
          done();
        }
      );
    });

    test('should create a folder and file', done => {
      fileUtils.createFolder(testPath).then(pathResolved => {
        fileUtils
          .createFiles(pathResolved, fileNames)
          .then(folderName => {
            assert.strictEqual(folderName, testPath.dirPath);
            assert.strictEqual(fs.existsSync(testPath.dirPath), true);
            fs.readdir(testPath.dirPath, (err, files) => {
              assert.strictEqual(files.length, 1);
              checkIfTestFolderExistsAndDelete();
              done();
            });
          })
          .catch(err => {
            handleError(err);
            done();
          });
      });
    });
  });
});

function checkIfTestFolderExistsAndDelete(done?: MochaDone) {
  const fullTestPathFolder = path.join(__dirname, 'store');
  if (fs.exists(fullTestPathFolder) || fullTestPathFolder !== '/') {
    rimraf(fullTestPathFolder, () => {
      if (done) { done(); }
    });
  }
}

function handleError(error) {
  checkIfTestFolderExistsAndDelete();
  console.error(error);
}*/
