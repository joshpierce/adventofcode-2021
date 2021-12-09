import * as fs from 'fs';
import path from 'path';
import chalk from 'chalk';
const red = chalk.red;
const green = chalk.green;

type coordinate = {
    x: number;
    y: number;
};

type coordinatePair = {
    start: coordinate;
    finish: coordinate;
};

type line = {
    direction: 'horizontal' | 'vertical' | 'diagonal';
    coordinates: coordinatePair;
};

const run05 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/05.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    let maxX = 0;
    let maxY = 0;

    // Generate our coordinate pairs and gather information about the bounds of our grid
    let coordinatePairs: coordinatePair[] = input.map((line) => {
        let parts = line.split(' -> ');
        let [startX, startY] = parts[0].split(',').map(Number);
        let [finishX, finishY] = parts[1].split(',').map(Number);

        maxX = startX > maxX ? startX : maxX;
        maxX = finishX > maxX ? finishX : maxX;
        maxY = startY > maxY ? startY : maxY;
        maxY = finishY > maxY ? finishY : maxY;

        return {
            start: { x: startX, y: startY },
            finish: { x: finishX, y: finishY },
        };
    });

    // Because the positions are 0 based, our grid is 1 larger than the largest point in either direction
    maxX++;
    maxY++;

    // Find all the horizontal lines
    let allLines: line[] = coordinatePairs.map((coordinates) => {
        return {
            direction:
                coordinates.start.x == coordinates.finish.x
                    ? 'vertical'
                    : coordinates.start.y == coordinates.finish.y
                    ? 'horizontal'
                    : 'diagonal',
            coordinates,
        };
    });

    console.log(
        `Generating a ${maxX}x${maxY} grid and mapping ${allLines.length} lines`
    );

    // Generate the Grid
    let grid: number[][] = [];
    for (let i = 0; i < maxY; i++) {
        grid.push(new Array(maxX).fill(0));
    }

    // Mark all the spots
    for (let line of allLines.filter(
        (line) => line.direction == 'horizontal' || line.direction == 'vertical'
    )) {
        if (line.direction == 'horizontal') {
            let length = line.coordinates.finish.x - line.coordinates.start.x;
            if (length >= 0) {
                for (
                    let x = line.coordinates.start.x;
                    x <= line.coordinates.finish.x;
                    x++
                ) {
                    grid[line.coordinates.start.y][x] += 1;
                }
            } else {
                for (
                    let x = line.coordinates.start.x;
                    x >= line.coordinates.finish.x;
                    x--
                ) {
                    grid[line.coordinates.start.y][x] += 1;
                }
            }
        } else if (line.direction == 'vertical') {
            let length = line.coordinates.finish.y - line.coordinates.start.y;
            if (length >= 0) {
                for (
                    let y = line.coordinates.start.y;
                    y <= line.coordinates.finish.y;
                    y++
                ) {
                    grid[y][line.coordinates.start.x] += 1;
                }
            } else {
                for (
                    let y = line.coordinates.start.y;
                    y >= line.coordinates.finish.y;
                    y--
                ) {
                    grid[y][line.coordinates.start.x] += 1;
                }
            }
        }
    }

    let countMultiples = 0;

    for (let row of grid) {
        let rowString = '';
        for (let item of row) {
            if (item > 1) {
                countMultiples++;
            }
            rowString += (item == 0 ? red('.') : green(item)) + ' ';
        }
        // Can turn this on for visualizing the small examples, but large examples just spits out nonsense.
        //console.log(rowString);
    }

    console.log();
    console.log(
        `After plotting the lines, there were ${countMultiples} points where more than one line crossed.`
    );

    // Part 2

    console.log();
    console.log(
        `Generating a ${maxX}x${maxY} grid and mapping ${allLines.length} lines`
    );

    // Generate the Grid

    // Mark all the spots
    for (let line of allLines.filter((line) => line.direction == 'diagonal')) {
        let length = line.coordinates.finish.x - line.coordinates.start.x;
        if (length >= 0) {
            let count = 0;
            for (
                let x = line.coordinates.start.x;
                x <= line.coordinates.finish.x;
                x++
            ) {
                if (line.coordinates.start.y >= line.coordinates.finish.y) {
                    grid[line.coordinates.start.y - count][x] += 1;
                    count++;
                } else {
                    grid[line.coordinates.start.y + count][x] += 1;
                    count++;
                }
            }
        } else {
            let count = 0;
            for (
                let x = line.coordinates.start.x;
                x >= line.coordinates.finish.x;
                x--
            ) {
                if (line.coordinates.start.y >= line.coordinates.finish.y) {
                    grid[line.coordinates.start.y - count][x] += 1;
                    count++;
                } else {
                    grid[line.coordinates.start.y + count][x] += 1;
                    count++;
                }
            }
        }
    }

    let countMultiples2 = 0;

    for (let row of grid) {
        let rowString = '';
        for (let item of row) {
            if (item > 1) {
                countMultiples2++;
            }
            rowString += (item == 0 ? red('.') : green(item)) + ' ';
        }
        // Can turn this on for visualizing the small examples, but large examples just spits out nonsense.
        //console.log(rowString);
    }

    console.log();
    console.log(
        `After plotting the lines, there were ${countMultiples2} points where more than one line crossed.`
    );
};

export { run05 };
