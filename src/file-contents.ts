import * as fs from 'fs';
import * as path from 'path';

export class FileContents {

	private camelCase(input: string): string {
		return input.replace(/-([a-z])/gi, function(all, letter) {
			return letter.toUpperCase();
		});
	}

    private readFile(fileName: string): string {
        return fs.readFileSync(path.join(__dirname, fileName), 'utf8');
    }

	public utilContent(): string {
		return this.readFile('templates/util.ts.tmpl');
	}
}