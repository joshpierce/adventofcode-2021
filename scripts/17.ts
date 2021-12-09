import * as fs from 'fs';
import path from 'path';

const run17 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/17.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    //TODO: Write some code here
};

export { run17 };
