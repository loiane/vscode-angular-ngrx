export function feature_effects_ts(
  featureNameClassName: string,
  featureNameVarName: string
): string {
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

import { ${featureNameClassName}Service } from './../services/${featureNameClassName}Service';
import { ${featureNameClassName}Actions } from './${featureNameVarName}.actions';

@Injectable()
export class ${featureNameClassName}Effects {

  constructor(
    private api: ${featureNameClassName}Service,
    private actions: ${featureNameClassName}Actions,
    private actions$: Actions
  ) {}

  @Effect()
  loadAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${featureNameClassName}Actions.Types.LOAD)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .load()
        .map(res => TemplateUtils.actions.loadSuccessAction(res))
        .catch(TemplateUtils.handleError)
    );

  @Effect()
  createAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${featureNameClassName}Actions.Types.CREATE)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .create(payload)
        .map(res => TemplateUtils.actions.createSuccessAction(res))
        .catch(TemplateUtils.handleError)
    );

  @Effect()
  updateAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${featureNameClassName}Actions.Types.UPDATE)
    .map(TemplateUtils.toPayload)
    .switchMap(payload =>
      TemplateUtils.api
        .update(payload)
        .map(res => TemplateUtils.actions.updateSuccessAction(res))
        .catch(TemplateUtils.handleError)
    );

  @Effect()
  removeAction$: Observable<Action> = TemplateUtils.actions$
    .ofType(${featureNameClassName}Actions.Types.REMOVE)
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
