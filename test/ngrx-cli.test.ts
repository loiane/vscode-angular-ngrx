import { FileContents } from './../src/file-contents';
import { NgrxCli } from './../src/ngrx-cli';
import { IFiles } from './../src/models/file';
import { IPath } from './../src/models/path';
import * as myExtension from '../src/extension';
import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

const testPath: IPath = {
  fileName: 'util',
  dirName: 'store',
  dirPath: __dirname
};
const storeDirPath = path.join(__dirname, 'store');

suite('NgrxCli Tests', () => {
  suite('generating ngrx files...', () => {
    suiteTeardown(done => {
      checkIfStoreFolderExistsAndDelete(done);
    });

    const ngrxCli = new NgrxCli();
    const fc = new FileContents();

    test('should create util.ts file', done => {
      ngrxCli.generateUtil(testPath).then(
        () => {
          assert.strictEqual(fs.existsSync(storeDirPath), true);
          fs.readdir(storeDirPath, (err, files) => {
            assert.strictEqual(files.length, 1);
            fs.readFile(
              path.join(storeDirPath, `${testPath.fileName}.ts`),
              'utf8',
              (err, contents) => {
                assert.strictEqual(contents, fc.utilContent());
                checkIfStoreFolderExistsAndDelete();
                done();
              }
            );
          });
        },
        err => {
          handleError(err);
          done();
        }
      );
    });
  });
});

function checkIfStoreFolderExistsAndDelete(done?: MochaDone) {
  if (fs.exists(storeDirPath) || storeDirPath !== '/') {
    rimraf(storeDirPath, () => {
      if (done) done();
    });
  }
}

function handleError(error) {
  checkIfStoreFolderExistsAndDelete();
  console.log(error);
}
