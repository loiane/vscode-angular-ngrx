import { FeatureStoreFileContents } from './ngrx-cli-files/feature-store-file-contents';
import { AppStoreFileContents } from './ngrx-cli-files/app-store-file-contents';
import { IFiles } from './models/file';
import { IPath } from './models/path';
import { FileUtils } from './file-utils';
import * as fs from 'fs';
import * as path from 'path';

export class NgrxCli {
  private fileUtils = new FileUtils();
  private appStoreFc = new AppStoreFileContents();
  private featureStoreFc = new FeatureStoreFileContents();

  private readonly DIR_NAME = 'store';

  private getLoc(loc: IPath) {
    loc.dirName = this.DIR_NAME;
    loc.dirPath = path.join(loc.dirPath, loc.dirName);
    return loc;
  }

  public generateAppStoreFolder = async (loc: IPath) => {
    loc = this.getLoc(loc);

    const files: IFiles[] = [
      {
        name: path.join(loc.dirPath, 'util.ts'),
        content: this.appStoreFc.util_ts()
      },
      {
        name: path.join(loc.dirPath, 'action-creator.ts'),
        content: this.appStoreFc.action_creator_ts()
      },
      {
        name: path.join(loc.dirPath, 'app-store.module.ts'),
        content: this.appStoreFc.app_store_module_ts()
      },
      {
        name: path.join(loc.dirPath, 'app-state.ts'),
        content: this.appStoreFc.app_state_ts()
      },
      {
        name: path.join(loc.dirPath, 'store.service.ts'),
        content: this.appStoreFc.app_store_service_ts()
      }
    ];

    await this.fileUtils.createFolder(loc);
    await this.fileUtils.createFiles(loc, files);
  }

  public generateFeatureStore = async (loc: IPath) => {
    loc = this.getLoc(loc);

    const files: IFiles[] = this.featureStoreFc.getFeatureModuleFiles(loc);

    await this.fileUtils.createFolder(loc);
    await this.fileUtils.createFiles(loc, files);
  }
}
