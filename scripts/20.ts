import * as fs from 'fs';
import path from 'path';

const run20 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', '').replace('/scripts', ''), '/inputs/20.txt')
        )
        .toString()
        .split(/\r?\n/)

    //TODO: Write some code here
};

export { run20 };
