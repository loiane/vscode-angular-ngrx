import { FileUtils } from './../file-utils';
import { IPath } from './../models/path';
import { IFiles } from './../models/file';
import { TemplateUtils } from './../templates/template-utils';
import { feature_actions_ts } from '../templates/feature/feature-actions-content';
import { feature_state_ts } from '../templates/feature/feature-state-content';
import { feature_reducer_ts } from '../templates/feature/feature-reducer-content';
import { feature_effects_ts } from '../templates/feature/feature-effects-content';
import { feature_store_service_ts } from '../templates/feature/feature-store_service-content';
import { feature_store_module_ts } from '../templates/feature/feature-store_module-content';

export class FeatureStoreFileContents {

  public getFeatureModuleFiles(loc: IPath) {
    const featureNameClassName = TemplateUtils.getInputNameCamelCase(loc.fileName);
    const featureNameVarName = TemplateUtils.getInputFeatureName(loc.fileName);

    const files: IFiles[] = [
      {
        name: FileUtils.getFileName(loc, `${loc.fileName}.actions.ts`),
        content: feature_actions_ts(featureNameClassName)
      },
      {
        name: FileUtils.getFileName(loc, `${loc.fileName}.state.ts`),
        content: feature_state_ts(featureNameClassName, featureNameVarName)
      },
      {
        name: FileUtils.getFileName(loc, `${loc.fileName}.reducer.ts`),
        content: feature_reducer_ts(featureNameClassName, featureNameVarName, loc.fileName)
      },
      {
        name: FileUtils.getFileName(loc, `${loc.fileName}.effects.ts`),
        content: feature_effects_ts(featureNameClassName, featureNameVarName)
      },
      {
        name: FileUtils.getFileName(loc, `${loc.fileName}-store.service.ts`),
        content: feature_store_service_ts(featureNameClassName, featureNameVarName, loc.fileName)
      },
      {
        name: FileUtils.getFileName(loc, `${loc.fileName}-store.module.ts`),
        content: feature_store_module_ts(featureNameClassName, featureNameVarName, loc.fileName)
      },
    ];

    return files;
  }
}
