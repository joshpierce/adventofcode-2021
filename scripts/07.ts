import * as fs from 'fs';
import path from 'path';

const run07 = () => {
    let input: number[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', '').replace('/scripts', ''), '/inputs/07.txt')
        )
        .toString()
        .split(',')
        .map(Number);

    let maxPos = input.reduce((acc, val) => {
        if (val > acc) {
            return val;
        } else {
            return acc;
        }
    }, 0);

    console.log(`Total number of positions range from 0 to ${maxPos}`);

    let endPosFuelCosts = new Array(maxPos + 1).fill(0);
    let linearEndPosFuelCosts = new Array(maxPos + 1).fill(0);

    for (let pos = 0; pos < maxPos + 1; pos++) {
        for (let crab of input) {
            endPosFuelCosts[pos] += Math.abs(crab - pos);
            let cost = 0;
            for (let i = 0; i < Math.abs(crab-pos); i++) {
                cost += i + 1;
            }
            linearEndPosFuelCosts[pos] += cost;
        }
    };

    let minFuelCost = endPosFuelCosts.reduce((acc, val) => {
        if (!acc || val < acc) {
            return val;
        } else {
            return acc;
        }
    }, undefined);

    let minLinearFuelCost = linearEndPosFuelCosts.reduce((acc, val) => {
        if (!acc || val < acc) {
            return val;
        } else {
            return acc;
        }
    }, undefined);

    console.log(`The minimum fuel cost is ${minFuelCost}`);
    console.log(`The minimum fuel cost with linear growth of fuel consumption is ${minLinearFuelCost}`);
};

export { run07 };
