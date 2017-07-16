export function appStoreServiceContent() {
  return `import { Store, Action } from '@ngrx/store';
import { AppState } from './app-state';

export abstract class StoreService {
  protected readonly STATE: string;
  protected store: Store<AppState>;

  protected storeSelectFeatureState() {
    return TemplateUtils.store.select(TemplateUtils.STATE);
  }

  protected dispatchAction(action: Action) {
    TemplateUtils.store.dispatch(action);
  }

  /* in case you need to handle CRUD actions in all services
  these methods will need to be implemented by feature service */
  abstract dispatchLoadAction();
  abstract dispatchCreateAction(record: any);
  abstract dispatchUpdateAction(record: any);
  abstract dispatchRemoveAction({ id: any });
}
`;
}
