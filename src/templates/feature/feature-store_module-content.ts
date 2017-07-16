export function feature_store_module_ts(
  featureNameClassName: string,
  featureNameVarName: string,
  featureName: string
): string {
  return `import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ${featureNameClassName}Reducer } from './${featureName}.reducer';
import { ${featureNameClassName}Actions } from './${featureName}.actions';
import { ${featureNameClassName}Effects } from './${featureName}.effects';
import { ${featureNameClassName}StoreService } from './${featureName}-store.service';

// import ${featureNameClassName}StoreModule.forRoot() in the ${featureNameClassName}Module
@NgModule({
  imports: [
    StoreModule.for${featureNameClassName}('${featureNameClassName}Module', {
      ${featureNameClassName}: ${featureNameClassName}Reducer // ${featureNameClassName}ModuleState
    }),
    EffectsModule.run(${featureNameClassName}Effects)
  ],
  exports: [StoreModule],
  providers: [${featureNameClassName}Actions, ${featureNameClassName}StoreService]
})
export class ${featureNameClassName}StoreModule {}
`;
}
