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
  const ngrxCli = new NgrxCli();
  const fc = new FileContents();

  suite('generating util.ts file...', () => {
    suiteTeardown(done => {
      checkIfStoreFolderExistsAndDelete(done);
    });

    test('should create store folder', done => {
      ngrxCli.generateUtil(testPath).then(
        () => {
          assert.strictEqual(fs.existsSync(storeDirPath), true);
          done();
        },
        err => {
          handleError(err);
          done();
        }
      );
    });

    test('should create util.ts file', done => {
      fs.readdir(storeDirPath, (err, files) => {
        assert.strictEqual(files.length, 1);
      });
      done();
    });

    test('should have the content of util.ts', done => {
      fs.readFile(
        path.join(storeDirPath, `${testPath.fileName}.ts`),
        'utf8',
        (err, contents) => {
          assert.strictEqual(contents, fc.utilContent());
          done();
        }
      );
    });

    /*test('should create feature store files', done => {
      ngrxCli.generateFeatureStore(testPath).then(
        () => {
          assert.strictEqual(fs.existsSync(storeDirPath), true);
          fs.readdir(storeDirPath, (err, files) => {
              files.map(file => path.join(storeDirPath, file))
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
