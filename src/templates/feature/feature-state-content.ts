export function feature_state_ts(
  featureNameClassName: string,
  featureNameVarName: string
): string {
  return `export interface ${featureNameClassName}ModuleState {
  ${featureNameVarName}: ${featureNameClassName}State;
}

export interface ${featureNameClassName}State {
    ${featureNameVarName}: any[];
    isLoading: boolean;
    selected${featureNameClassName}: any;
    error: any;
}

export const ${featureNameVarName}InitialState: ${featureNameClassName}State = {
    ${featureNameVarName}s: [],
    isLoading: true,
    selected${featureNameClassName}: null,
    error: null
}
`;
}
