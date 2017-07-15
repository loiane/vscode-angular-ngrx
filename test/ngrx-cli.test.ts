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

const storeDirPath = path.join(__dirname, 'store');

suite('NgrxCli Tests', () => {
  const ngrxCli = new NgrxCli();
  const fc = new FileContents();

  suiteTeardown(done => {
    checkIfStoreFolderExistsAndDelete(done);
  });

  /*test('should create util.ts file', done => {
    const testPath = getIPath();
    ngrxCli.generateAppStoreFolder(testPath).then(
      () => {
        assert.strictEqual(fs.existsSync(testPath.dirName), true);
        fs.readdir(testPath.dirName, (err, files) => {
          //assert.strictEqual(files.length, 1);
          //fs.readFile(
          //  path.join(testPath.dirName, `${testPath.fileName}.ts`),
          //  'utf8',
          //  (err, contents) => {
          //    assert.strictEqual(contents, fc.utilContent());
              checkIfStoreFolderExistsAndDelete();
              done();
           // }
          //);
        });
      },
      err => {
        handleError(err);
        done();
      }
    );
  });*/

  /*test('should create feature store files', done => {
    const testPath = getIPath();
    ngrxCli.generateFeatureStore(testPath).then(
      () => {
        assert.strictEqual(fs.existsSync(testPath.dirName), true);
        fs.readdir(testPath.dirName, (err, files) => {
          files
            .map(file => path.join(testPath.dirName, file))
            .forEach(file => console.log(file));
          assert.strictEqual(files.length, 6);
          checkIfStoreFolderExistsAndDelete();
          done();
        });
      },
      err => {
        handleError(err);
        done();
      }
    );
  });*/
});

function getIPath() {
  return {
    fileName: '',
    dirName: 'store',
    dirPath: __dirname
  };
}

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
