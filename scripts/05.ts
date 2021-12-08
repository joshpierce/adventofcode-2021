import * as fs from 'fs';
import path from 'path';

const run05 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', ''), '/inputs/05.txt')
        )
        .toString()
        .split('\r\n');

    //TODO: Write some code here
};

export { run05 };
