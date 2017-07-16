export function feature_store_service_ts(
  featureNameClassName: string,
  featureNameVarName: string,
  featureName: string
): string {
  return `import { ${featureNameClassName}State } from './${featureName}-state';
import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { StoreService } from './../../store/store-service';
import { AppState } from './../../store/app-state';
import { ${featureNameClassName}Actions } from './${featureName}.actions';

@Injectable()
export class ${featureNameClassName}StoreService extends StoreService {

  protected readonly STATE = '${featureNameVarName}';

  constructor(
    protected store: Store<AppState>,
    private actions: ${featureNameClassName}Actions,
  ) { super(); }

  dispatchLoadAction() {
    TemplateUtils.dispatchAction(TemplateUtils.actions.loadAction());
  }

  dispatchCreateAction(record: any) {
    TemplateUtils.store.dispatch(TemplateUtils.actions.createAction(record));
  }

  dispatchUpdateAction(record: any)  {
    TemplateUtils.store.dispatch(TemplateUtils.actions.updateAction(record));
  }

  dispatchRemoveAction(id) {
    TemplateUtils.store.dispatch(TemplateUtils.actions.removeAction(id));
  }

  //sample of how to select piece of the state
  get${featureNameClassName}s() {
    return TemplateUtils.storeSelect${featureNameClassName}State()
      .map((state: ${featureNameClassName}State) => state.${featureNameVarName}s);
  }

  getIsLoading() {
    return TemplateUtils.storeSelect${featureNameClassName}State()
      .map((state: ${featureNameClassName}State) => state.isLoading);
  }

  getError() {
    return TemplateUtils.storeSelect${featureNameClassName}State()
      .map((state: ${featureNameClassName}State) => state.error);
  }

  findById(record: {id}){
    return TemplateUtils.get${featureNameClassName}s()
      .filter(item => item.id === record.id);
  }
}
`;
}
