import * as fs from 'fs';
import path from 'path';

const run08 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/08.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    let inputs = input.map((i) => {
        let parts = i.split(' | ');
        return { entries: parts[0].split(' '), outputs: parts[1].split(' ') };
    });

    let uniqueOutputs = inputs.reduce((acc, val) => {
        return (
            acc +
            val.outputs.reduce((acc, val) => {
                if ([2, 3, 4, 7].indexOf(val.length) != -1) {
                    return acc + 1;
                } else {
                    return acc;
                }
            }, 0)
        );
    }, 0);

    console.log(uniqueOutputs);

    inputs.forEach((input, vx) => {
        input.outputs.forEach((output, ox) => {});
    });
};

export { run08 };
