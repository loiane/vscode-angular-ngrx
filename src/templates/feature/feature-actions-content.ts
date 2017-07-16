export function feature_actions_ts(featureNameClassName: string): string {
  return `import { Injectable } from '@angular/core';
import { ActionCreator } from '../../store/action-creator';
import { type } from '../../store/util';

@Injectable()
export class ${featureNameClassName}Actions {

	static Types = {
		LOAD:           type('[${featureNameClassName}] LOAD Requested'),
    LOAD_SUCCESS:   type('[${featureNameClassName}] LOAD Success'),

    CREATE:         type('[${featureNameClassName}] CREATE Requested'),
    CREATE_SUCCESS: type('[${featureNameClassName}] CREATE Success'),

    UPDATE:         type('[${featureNameClassName}] UPDATE Requested'),
    UPDATE_SUCCESS: type('[${featureNameClassName}] UPDATE Success'),

    REMOVE:         type('[${featureNameClassName}] REMOVE Requested'),
    REMOVE_SUCCESS: type('[${featureNameClassName}] REMOVE Success'),

    ERROR: type('[${featureNameClassName}] Error')
	};

  loadAction = ActionCreator.create(${featureNameClassName}Actions.Types.LOAD);
  loadSuccessAction = ActionCreator.create<any[]>(${featureNameClassName}Actions.Types.LOAD_SUCCESS);

  createAction = ActionCreator.create<any>(${featureNameClassName}Actions.Types.CREATE);
  createSuccessAction = ActionCreator.create<any>(${featureNameClassName}Actions.Types.CREATE_SUCCESS);

  updateAction = ActionCreator.create<any>(${featureNameClassName}Actions.Types.UPDATE);
  updateSuccessAction = ActionCreator.create<any>(${featureNameClassName}Actions.Types.UPDATE_SUCCESS);

  removeAction = ActionCreator.create<{id}>(${featureNameClassName}Actions.Types.REMOVE);
  removeSuccessAction = ActionCreator.create(${featureNameClassName}Actions.Types.REMOVE_SUCCESS);

  errorAction = ActionCreator.create<any>(${featureNameClassName}Actions.Types.ERROR);
}
`;
}
