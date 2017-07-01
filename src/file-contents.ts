import * as fs from 'fs';
import * as path from 'path';

export class FileContents {
	private camelCase(input: string): string {
		return input.replace(/-([a-z])/gi, function(all, letter) {
			return letter.toUpperCase();
		});
	}

	public utilContent = `/**
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
