import * as fs from 'fs';
import path from 'path';

const run02 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', '').replace('/scripts', ''), '/inputs/02.txt')
        )
        .toString()
        .split(/\r?\n/)

    // We're going to use the array.reduce function to iterate our collection of instructions
    // and keep track (acc) of the x,y coordinates of our submarine
    let position: number[] = input.reduce(
        (acc, val) => {
            // We'll split the instruction into it's two components, the direction, and the number of units.
            let instruction = val.split(' ');
            let direction = instruction[0];
            let units = +instruction[1];
            // Based on the direction of the submarine, we'll increment/decrement the x,y coordinates
            switch (direction) {
                case 'forward':
                    // Increases horizontal by units
                    return [acc[0] + units, acc[1]];
                case 'down':
                    // Increases depth by units
                    return [acc[0], acc[1] + units];
                case 'up':
                    // Decreases depth by units
                    return [acc[0], acc[1] - units];
            }
            // Returns the current state of the submarine to our iterator
            return acc;
        },
        [0, 0]
    );

    let answer01 = position[0] * position[1];
    console.log(`Answer 1 ${answer01}`);

    // Similar logic with different reactions to the individual instructions
    let position2: number[] = input.reduce(
        (acc, val) => {
            let instruction = val.split(' ');
            let direction = instruction[0];
            let units = +instruction[1];
            switch (direction) {
                case 'forward':
                    // Increases the horizontal position by units
                    // Increases the depth by (aim * units)
                    return [acc[0] + units, acc[1] + acc[2] * units, acc[2]];
                case 'down':
                    // Increases the aim by units
                    return [acc[0], acc[1], acc[2] + units];
                case 'up':
                    // Decreases the aim by units
                    return [acc[0], acc[1], acc[2] - units];
            }
            return acc;
        },
        [0, 0, 0]
    );

    let answer02 = position2[0] * position2[1];
    console.log(`Answer 2 ${answer02}`);
};

export { run02 };
