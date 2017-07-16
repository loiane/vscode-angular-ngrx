export function feature_reducer_ts(
  featureNameClassName: string,
  featureNameVarName: string,
  featureName: string
): string {
  return `import { Action } from '@ngrx/store';
import { ${featureNameClassName}State, ${featureNameVarName}InitialState } from './${featureName}.state';
import { ${featureNameClassName}Actions } from './${featureName}.actions';

export function ${featureNameVarName}Reducer(
  state = ${featureNameVarName}InitialState, action: Action): ${featureNameClassName}State {

  switch (action.type) {
    case ${featureNameClassName}Actions.Types.LOAD: {
      return Object.assign({}, state, {
        isLoading: true,
        isLoaded: false,
        hasError: false,
        error: null
      });
    }

    case ${featureNameClassName}Actions.Types.LOAD_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        error: null,
        ${featureNameVarName}s: action.payload
      });
    }

    case ${featureNameClassName}Actions.Types.CREATE_SUCCESS: {
      return Object.assign({}, state, {
        error: null,
        ${featureNameVarName}s: [...state.${featureNameVarName}s, action.payload]
      });
    }

    case ${featureNameClassName}Actions.Types.UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        error: null,
        ${featureNameVarName}s: state.${featureNameVarName}s.map((${featureNameVarName}: { id: any }) => {
          return ${featureNameVarName}.id === action.payload.id ? action.payload : ${featureNameVarName};
        })
      });
    }

    case ${featureNameClassName}Actions.Types.REMOVE_SUCCESS: {
      return Object.assign({}, state, {
        error: null,
        ${featureNameVarName}s: state.${featureNameVarName}s.filter((${featureNameVarName}: { id: any }) => {
          return ${featureNameVarName}.id !== action.payload.id;
        })
      });
    }

    case ${featureNameClassName}Actions.Types.ERROR: {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
`;
}
