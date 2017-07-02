import * as fs from 'fs';
import * as path from 'path';

export class FileContents {
	private camelCase(input: string): string {
		return input.replace(/-([a-z])/gi, function(all, letter) {
			return letter.toUpperCase();
		});
	}

	private getInputNameCamelCase(inputName): string {
		let inputUpperCase: string;
		inputUpperCase = inputName.charAt(0).toUpperCase() + inputName.slice(1);
		return this.camelCase(inputUpperCase);
	}

	private getInputFeatureName(inputName): string {
		let inputUpperCase: string;
		inputUpperCase = inputName.charAt(0) + inputName.slice(1);
		return this.camelCase(inputUpperCase);
	}

	public utilContent = () => `/**
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

	public featureStateContent(inputName: string): string {
		const inputUpperCase = this.getInputNameCamelCase(inputName);
		const inputFeatureName = this.getInputFeatureName(inputName);

		const content: string = `export interface ${inputUpperCase}ModuleState {
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
		return content;
	}
}
