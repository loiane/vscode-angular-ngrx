import { TemplateUtils } from './templates/template-utils';
import * as fs from 'fs';
import * as path from 'path';

export class FileContents {
  public utilContent(): string {
    return `/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
const typeCache: { [label: string]: boolean } = {};
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(\`Action type "\${label}" is not unique"\`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}`;
  }

  public featureStateContent(inputName: string): string {
    const inputUpperCase = TemplateUtils.getInputNameCamelCase(inputName);
    const inputFeatureName = TemplateUtils.getInputFeatureName(inputName);

    return `export interface ${inputUpperCase}ModuleState {
  ${inputFeatureName}: ${inputUpperCase}State;
}

export interface ${inputUpperCase}State {
    ${inputFeatureName}s: any[];
    isLoading: boolean;
    selected${inputUpperCase}: any;
    error: any;
}

export const ${inputFeatureName}InitialState: ${inputUpperCase}State = {
    ${inputFeatureName}s: [],
    isLoading: true,
    selected${inputUpperCase}: null,
    error: null
}`;
  }

  public featureActionsContent(inputName: string): string {
    const inputUpperCase = TemplateUtils.getInputNameCamelCase(inputName);
    const inputFeatureName = TemplateUtils.getInputFeatureName(inputName);

    return `import { Injectable } from '@angular/core';
import { ActionCreator } from '../../store/action-creator';
import { type } from '../../store/util';

@Injectable()
export class ${inputUpperCase}Actions {

	static Types = {
		LOAD:           type('[${inputUpperCase}] LOAD Requested'),
    LOAD_SUCCESS:   type('[${inputUpperCase}] LOAD Success'),

    CREATE:         type('[${inputUpperCase}] CREATE Requested'),
    CREATE_SUCCESS: type('[${inputUpperCase}] CREATE Success'),

    UPDATE:         type('[${inputUpperCase}] UPDATE Requested'),
    UPDATE_SUCCESS: type('[${inputUpperCase}] UPDATE Success'),

    REMOVE:         type('[${inputUpperCase}] REMOVE Requested'),
    REMOVE_SUCCESS: type('[${inputUpperCase}] REMOVE Success'),

    ERROR: type('[${inputUpperCase}] Error')
	};

  loadAction = ActionCreator.create(${inputUpperCase}Actions.Types.LOAD);
  loadSuccessAction = ActionCreator.create<any[]>(${inputUpperCase}Actions.Types.LOAD_SUCCESS);

  createAction = ActionCreator.create<any>(${inputUpperCase}Actions.Types.CREATE);
  createSuccessAction = ActionCreator.create<any>(${inputUpperCase}Actions.Types.CREATE_SUCCESS);

  updateAction = ActionCreator.create<any>(${inputUpperCase}Actions.Types.UPDATE);
  updateSuccessAction = ActionCreator.create<any>(${inputUpperCase}Actions.Types.UPDATE_SUCCESS);

  removeAction = ActionCreator.create<{id}>(${inputUpperCase}Actions.Types.REMOVE);
  removeSuccessAction = ActionCreator.create(${inputUpperCase}Actions.Types.REMOVE_SUCCESS);

  errorAction = ActionCreator.create<any>(${inputUpperCase}Actions.Types.REMOVE_SUCCESS);
}`;
  }

  public featureReducerContent(inputName: string): string {
    const inputUpperCase = TemplateUtils.getInputNameCamelCase(inputName);
    const inputFeatureName = TemplateUtils.getInputFeatureName(inputName);

    return `import { Action } from '@ngrx/store';
import { ${inputUpperCase}State, ${inputFeatureName}InitialState } from './${inputName}.state';
import { ${inputUpperCase}Actions } from './${inputName}.actions';

export function ${inputFeatureName}Reducer(
  state = ${inputFeatureName}InitialState, action: Action): ${inputUpperCase}State {

  switch (action.type) {
    case ${inputUpperCase}Actions.Types.LOAD: {
      return Object.assign({}, state, {
        isLoading: true,
        isLoaded: false,
        hasError: false,
        error: null
      });
    }

    case ${inputUpperCase}Actions.Types.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        ${inputFeatureName}s: action.payload
      });
    }

    case ${inputUpperCase}Actions.Types.CREATE_SUCCESS: {
      return Object.assign({}, state, {
        error: null,
        ${inputFeatureName}s: [...state.${inputFeatureName}s, action.payload]
      });
    }

    case ${inputUpperCase}Actions.Types.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        error: null,
        ${inputFeatureName}s: state.${inputFeatureName}s.map((${inputFeatureName}: { id: any }) => {
          return ${inputFeatureName}.id === action.payload.id ? action.payload : ${inputFeatureName};
        })
      });
    }

    case ${inputUpperCase}Actions.Types.REMOVE_SUCCESS: {
      return Object.assign({}, state, {
        error: null,
        ${inputFeatureName}s: state.${inputFeatureName}s.filter((${inputFeatureName}: { id: any }) => {
          return ${inputFeatureName}.id !== action.payload.id;
        })
      });
    }

    case ${inputUpperCase}Actions.Types.ERROR: {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    default: {
      return state;
    }
  }
}`;
  }

  public featureEffectsContent(inputName: string): string {
    const inputUpperCase = TemplateUtils.getInputNameCamelCase(inputName);
    const inputFeatureName = TemplateUtils.getInputFeatureName(inputName);

    return `import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { ${inputUpperCase}Service } from './../services/${inputUpperCase}Service';
import { ${inputUpperCase}Actions } from './${inputFeatureName}.actions';

@Injectable()
export class ${inputUpperCase}Effects {

  constructor(
    private api: ${inputUpperCase}Service,
    private actions: ${inputUpperCase}Actions,
    private actions$: Actions
  ) {}

  @Effect()
  loadAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${inputUpperCase}Actions.Types.LOAD)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .load()
        .map(res => TemplateUtils.actions.loadSuccessAction(res))
        .catch(TemplateUtils.handleError)
    );

  @Effect()
  createAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${inputUpperCase}Actions.Types.CREATE)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .create(payload)
        .map(res => TemplateUtils.actions.createSuccessAction(res))
        .catch(TemplateUtils.handleError)
    );

  @Effect()
  updateAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${inputUpperCase}Actions.Types.UPDATE)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .update(payload)
        .map(res => TemplateUtils.actions.updateSuccessAction(res))
        .catch(TemplateUtils.handleError)
    );

  @Effect()
  removeAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${inputUpperCase}Actions.Types.REMOVE)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .remove(payload.id)
        .map(res => TemplateUtils.actions.removeSuccessAction())
        .catch(TemplateUtils.handleError)
    );

  private handleError(error) {
    return Observable.of(TemplateUtils.actions.errorAction);
  }

  private toPayload(action) {
    return action.payload;
  }
}
`;
  }

  public featureStoreServiceContent(inputName: string): string {
    const inputUpperCase = TemplateUtils.getInputNameCamelCase(inputName);
    const inputFeatureName = TemplateUtils.getInputFeatureName(inputName);

    return `import { ${inputUpperCase}State } from './${inputName}.state';
import { Injectable } from '@angular/core';
import { Store, State } from '@ngrx/store';
import { StoreService } from './../../store/store-service';
import { AppState } from './../../store/app.state';
import { ${inputUpperCase}Actions } from './${inputName}.actions';

@Injectable()
export class ${inputUpperCase}StoreService extends StoreService {

  protected readonly STATE = '${inputFeatureName}';

  constructor(
    protected store: Store<AppState>,
    private actions: ${inputUpperCase}Actions,
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
  get${inputUpperCase}s() {
    return TemplateUtils.storeSelect${inputUpperCase}State()
      .map((state: ${inputUpperCase}State) => state.${inputFeatureName}s);
  }

  getIsLoading() {
    return TemplateUtils.storeSelect${inputUpperCase}State()
      .map((state: ${inputUpperCase}State) => state.isLoading);
  }

  getError() {
    return TemplateUtils.storeSelect${inputUpperCase}State()
      .map((state: ${inputUpperCase}State) => state.error);
  }

  findById(record: {id}){
    return TemplateUtils.get${inputUpperCase}s()
      .filter(item => item.id === record.id);
  }
}`;
  }

  public featureStoreModuleContent(inputName: string): string {
    const inputUpperCase = TemplateUtils.getInputNameCamelCase(inputName);
    const inputFeatureName = TemplateUtils.getInputFeatureName(inputName);

    return `import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ${inputFeatureName}Reducer } from './${inputName}.reducer';
import { ${inputUpperCase}Actions } from './${inputName}.actions';
import { ${inputUpperCase}Effects } from './${inputName}.effects';
import { ${inputUpperCase}StoreService } from './${inputName}-store.service';

// import ${inputUpperCase}StoreModule.forRoot() in the ${inputUpperCase}Module
@NgModule({
  imports: [
    StoreModule.for${inputUpperCase}('${inputFeatureName}Module', {
      ${inputFeatureName}: ${inputFeatureName}Reducer // ${inputUpperCase}ModuleState
    }),
    EffectsModule.run(${inputUpperCase}Effects)
  ],
  exports: [StoreModule],
  providers: [${inputUpperCase}Actions, ${inputUpperCase}StoreService]
})
export class ${inputUpperCase}StoreModule {}
`;
  }

  public featureAppSotreModuleContent(): string {
    return `import { reducers, initialState } from './app.state';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ActionCreator } from './action-creator';

// import AppStoreModule.forRoot() in the AppModule
@NgModule({
  imports: [
    StoreModule.forRoot({ reducers }, initialState),
    EffectsModule.forRoot() // ,
    // not working yet - @ngrx/platform v4
    // !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  exports: [StoreModule]
})
export class AppStoreModule {
  static forRoot() {
    return {
      ngModule: AppStoreModule,
      providers: [ActionCreator]
    };
  }
}`;
  }

  public appActionCreatorContent(): string {
    return `import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class ActionCreator {
  static create?<T>(type: string, defaultPayloadValue?: any) {
    return (payload?: T): Action => {
      return <Action>{
        type: type,
        payload: payload || defaultPayloadValue
      };
    };
  }

  create?<T>(type: string, defaultPayloadValue?: any) {
    return ActionCreator.create<T>(type, defaultPayloadValue);
  }
}`;
  }

  public appStateContent(): string {
    return `export interface AppState {

};

export const reducers = {

};

export const initialState: AppState = {

};`;
  }

  public appStoreServiceContent(): string {
    return `import { Store, Action } from '@ngrx/store';
import { AppState } from './app.state';

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
}`;
  }
}
