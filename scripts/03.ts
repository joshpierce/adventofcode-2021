import * as fs from 'fs';
import path from 'path';

const run03 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', ''), '/inputs/03.txt')
        )
        .toString()
        .split('\r\n');

    let ones = input.reduce((acc, val, idx) => {
        let bits = val.split('');
        return acc.map((x, ix) => {
            return x + +bits[ix];
        });
    }, Array(input[0].length).fill(0));

    let zeros = ones.map((x) => {
        return input.length - x;
    });

    let gamma: string = ones.reduce((acc, val, idx) => {
        return val > zeros[idx] ? acc + '1' : acc + '0';
    }, '');

    console.log(`The Gamma Rate is ${parseInt(gamma, 2)}`);

    let epsilon = gamma.split('').reduce((acc, val, idx) => {
        return acc + (val == '1' ? '0' : '1');
    }, '');

    console.log(`The Epsilon Rate is ${parseInt(epsilon, 2)}`);

    console.log(
        `The Power Consumption Rate is ${
            parseInt(gamma, 2) * parseInt(epsilon, 2)
        }`
    );

    // Part 2

    const getCommonBit = (vals: string[]): string => {
        let ones = vals.reduce((acc, val, idx) => {
            return val === '1' ? acc + 1 : acc;
        }, 0);
        let zeros = vals.length - ones;

        return ones >= zeros ? '1' : '0';
    };

    const getOxyRating: any = (vals: string[], idx: number) => {
        let commonBit = getCommonBit(vals.map((x) => x.split('')[idx]));
        let remainingVals = vals.filter((x) => x.split('')[idx] == commonBit);
        if (remainingVals.length == 1 || idx == vals.length - 1) {
            return remainingVals[0];
        } else {
            return getOxyRating(remainingVals, idx + 1);
        }
    };

    let oxyRating: string = getOxyRating(input, 0);

    console.log(`The Oxy Generator Rating is ${oxyRating}`);

    const getCO2Rating: any = (vals: string[], idx: number) => {
        // For this iteration we need the least common, so lets inverse our response from getCommonBit
        let leastCommonBit =
            getCommonBit(vals.map((x) => x.split('')[idx])) == '1' ? '0' : '1';
        let remainingVals = vals.filter(
            (x) => x.split('')[idx] == leastCommonBit
        );
        if (remainingVals.length == 1 || idx == vals.length - 1) {
            return remainingVals[0];
        } else {
            return getCO2Rating(remainingVals, idx + 1);
        }
    };

    let co2Rating: string = getCO2Rating(input, 0);

    console.log(`The CO2 Scrubber Rating is ${co2Rating}`);

    console.log(
        `The Life Support Rating is ${
            parseInt(oxyRating, 2) * parseInt(co2Rating, 2)
        }`
    );
};

export { run03 };
