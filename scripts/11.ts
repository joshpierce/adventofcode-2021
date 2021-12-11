import * as fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const gray = chalk.gray;
const red = chalk.red;

const run11 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/11.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    let steps = 100;

    let octopi = input.map((line) => {
        return line.split('').map(Number);
    });

    const printOctopi = (octopi: number[][]) => {
        octopi.forEach((row) => {
            console.log(row.map((x) => (x == 0 ? red(x) : gray(x))).join(' '));
        });
    };

    let flashes = 0;

    const doFlashes = (octopi: number[][]): void => {
        octopi.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell > 9) {
                    flashes++;
                    octopi[y][x] = 0;
                    // Can look up
                    if (y > 0 && octopi[y - 1][x] > 0) {
                        octopi[y - 1][x] += 1;
                    }
                    // Can look down
                    if (y < octopi.length - 1 && octopi[y + 1][x] > 0) {
                        octopi[y + 1][x] += 1;
                    }
                    // Can look left
                    if (x > 0 && octopi[y][x - 1] > 0) {
                        octopi[y][x - 1] += 1;
                    }
                    // Can look right
                    if (x < octopi[y].length - 1 && octopi[y][x + 1] > 0) {
                        octopi[y][x + 1] += 1;
                    }
                    // Can look up and left
                    if (y > 0 && x > 0 && octopi[y - 1][x - 1] > 0) {
                        octopi[y - 1][x - 1] += 1;
                    }
                    // Can look up and right
                    if (
                        y > 0 &&
                        x < octopi[y].length - 1 &&
                        octopi[y - 1][x + 1] > 0
                    ) {
                        octopi[y - 1][x + 1] += 1;
                    }
                    // Can look down and left
                    if (
                        y < octopi.length - 1 &&
                        x > 0 &&
                        octopi[y + 1][x - 1] > 0
                    ) {
                        octopi[y + 1][x - 1] += 1;
                    }
                    // Can look down and right
                    if (
                        y < octopi.length - 1 &&
                        x < octopi[y].length - 1 &&
                        octopi[y + 1][x + 1] > 0
                    ) {
                        octopi[y + 1][x + 1] += 1;
                    }
                }
            });
        });

        if (
            octopi
                .reduce((acc, val) => [...acc, ...val])
                .filter((oct) => oct > 9).length > 0
        ) {
            return doFlashes(octopi);
        } else {
            return;
        }
    };

    // Iterate for 100 steps, and count the number of times the octopi flash, while incrementing their energy level by 1 each iteration
    let i = 0;
    let allFlashed = false;

    while (!allFlashed) {
        // Increment each octopi's energy level by 1
        octopi.forEach((row, y) => {
            row.forEach((cell, x) => {
                octopi[y][x] += 1;
            });
        });

        doFlashes(octopi);

        // If the sum of all octopi is 0
        if (
            octopi.reduce(
                (acc, val) => acc + val.reduce((acc, val) => acc + val),
                0
            ) == 0
        ) {
            allFlashed = true;
        }

        if (i == steps - 1) {
            console.log(`Final Octopi State:`);
            printOctopi(octopi);

            // Display the number of flashes
            console.log(
                `The number of flashes that occurred over ${steps} steps was ${flashes}`
            );
        }

        i++;
    }

    console.log();
    printOctopi(octopi);

    console.log(`All octopi flashed simultaneously on step ${i}.`);
};

export { run11 };
