import * as fs from 'fs';
import { networkInterfaces } from 'os';
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

    //     0: 6    1: 2    2: 5   3: 5    4: 4
    //     aaaa    ....    aaaa    aaaa    ....
    //    b    c  .    c  .    c  .    c  b    c
    //    b    c  .    c  .    c  .    c  b    c
    //     ....    ....    dddd    dddd    dddd
    //    e    f  .    f  e    .  .    f  .    f
    //    e    f  .    f  e    .  .    f  .    f
    //     gggg    ....    gggg    gggg    ....

    //     5: 5    6: 6    7: 3    8: 7    9: 6
    //     aaaa    aaaa    aaaa    aaaa    aaaa
    //    b    .  b    .  .    c  b    c  b    c
    //    b    .  b    .  .    c  b    c  b    c
    //     dddd    dddd    ....    dddd    dddd
    //    .    f  e    f  .    f  e    f  .    f
    //    .    f  e    f  .    f  e    f  .    f
    //     gggg    gggg    ....    gggg    gggg

    const digits = [
        { bits: '1110111', digit: '0' },
        { bits: '0000011', digit: '1' },
        { bits: '0111110', digit: '2' },
        { bits: '0011111', digit: '3' },
        { bits: '1001011', digit: '4' },
        { bits: '1011101', digit: '5' },
        { bits: '1111101', digit: '6' },
        { bits: '0010011', digit: '7' },
        { bits: '1111111', digit: '8' },
        { bits: '1011111', digit: '9' },
    ];

    let sumOfOutputs = 0;

    inputs.forEach((input, vx) => {
        let grid: string[][] = new Array(7).fill(new Array());
        //Identify the one
        let one = input.entries.find((e) => e.length === 2);
        one?.split('').forEach((seg) => {
            grid[5] = [...grid[5], seg];
            grid[6] = [...grid[6], seg];
        });
        //Identify the seven
        let seven = input.entries.find((e) => e.length === 3);
        seven?.split('').forEach((seg) => {
            if (grid[5].indexOf(seg) == -1 && grid[6].indexOf(seg) == -1) {
                grid[2] = [...grid[2], seg];
            }
        });
        //Identify the four
        let four = input.entries.find((e) => e.length === 4);
        four?.split('').forEach((seg) => {
            if (grid[5].indexOf(seg) == -1 && grid[6].indexOf(seg) == -1) {
                grid[0] = [...grid[0], seg];
                grid[3] = [...grid[3], seg];
            }
        });
        //Identify the zero
        let zero = input.entries.find((e) => {
            //Must be 6 in length, and not contain both elements in index 3 of the grid (middle middle)
            return (
                e.length === 6 &&
                e.split('').filter((seg) => grid[3].indexOf(seg) != -1)
                    .length == 1
            );
        });
        grid[0] = [
            ...grid[0].filter((seg) => zero?.split('').indexOf(seg) !== -1),
        ];
        grid[3] = [...grid[3].filter((seg) => seg !== grid[0][0])];
        //Identify the six
        let six = input.entries.find((e) => {
            return (
                e.length === 6 &&
                e != zero &&
                e.split('').filter((seg) => grid[5].indexOf(seg) != -1)
                    .length === 1
            );
        });
        grid[6] = [
            ...grid[6].filter((seg) => six?.split('').indexOf(seg) !== -1),
        ];
        grid[5] = [...grid[5].filter((seg) => seg !== grid[6][0])];
        //Identify the nine
        let nine = input.entries.find((e) => {
            return e.length === 6 && [zero, six].indexOf(e) === -1;
        });
        let bottomLeft = six?.split('').find((seg) => {
            return nine?.indexOf(seg) === -1 && seg != grid[5][0];
        });
        if (bottomLeft) {
            grid[1] = [bottomLeft];
        }
        let bottomMiddle = 'abcdefg'.split('').find((seg) => {
            return grid.map((g) => g[0]).indexOf(seg) === -1;
        });
        if (bottomMiddle) {
            grid[4] = [bottomMiddle];
        }

        let consolidatedGrid = grid.map((g) => g[0]);

        let outDigits: string[] = [];
        input.outputs.forEach((out, ox) => {
            outDigits = [
                ...outDigits,
                digits.find((d) => {
                    let bitCheck = '0000000'.split('');
                    out.split('').forEach((o, x) => {
                        bitCheck[consolidatedGrid.indexOf(o)] = '1';
                    });
                    return d.bits === bitCheck.join('');
                })?.digit as string,
            ];
        });

        console.log(`The output digits are ${outDigits.join('')}`);

        sumOfOutputs += parseInt(outDigits.join(''));
    });

    console.log();
    console.log(`The sum of all the outputs is ${sumOfOutputs}`);
};

export { run08 };
