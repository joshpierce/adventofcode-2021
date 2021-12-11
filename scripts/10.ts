import * as fs from 'fs';
import path from 'path';

const run10 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/10.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    type CharPair = {
        open: string;
        close: string;
        points: number;
    };

    const charPairs: CharPair[] = [
        { open: '(', close: ')', points: 3 },
        { open: '[', close: ']', points: 57 },
        { open: '{', close: '}', points: 1197 },
        { open: '<', close: '>', points: 25137 },
    ];
    const autocompletePoints = [
        { character: ')', points: 1 },
        { character: ']', points: 2 },
        { character: '}', points: 3 },
        { character: '>', points: 4 },
    ];

    const checkLine: (
        line: string,
        openToClose: string[]
    ) => { points: number; remainder: string } = (
        line: string,
        openToClose: string[]
    ) => {
        // Get the first character from a string
        let currentChar = line.charAt(0);
        // Figure out which pair the character belongs to
        let currentPair = charPairs.find(
            (pair) => pair.close === currentChar || pair.open === currentChar
        );
        // Determine if the character is an open or close character
        let isClosing = currentChar === currentPair?.close;

        // If the character is an open character, add it to the openToClose array
        if (currentPair?.open === currentChar) {
            openToClose.push(currentChar);
        }

        // If the character is a close character, and matches it's corresponding open character, remove it's corresponding open character from the openToClose array
        if (currentPair?.close === currentChar) {
            let openChar = openToClose.pop();
            if (openChar !== currentPair?.open) {
                return { points: currentPair.points, remainder: '' };
            }
        }

        // If there are still characters remaining in the line, recursively call the function
        if (line.length > 1) {
            return checkLine(line.substr(1), openToClose);
        } else {
            return { points: 0, remainder: openToClose.join('') };
        }
    };

    let results = input.map((line) => {
        return checkLine(line, []);
    });

    let errorSum = results.reduce((acc, val) => {
        return acc + val.points;
    }, 0);

    console.log(`The total error syntax score is ${errorSum}`);

    let acscores = results.reduce((acc, val) => {
        if (val.remainder) {
            return [
                ...acc,
                val.remainder
                    .split('')
                    .map((open) => charPairs.find((x) => x.open == open)?.close)
                    .reverse()
                    .reduce((acc, val) => {
                        let acpts = autocompletePoints.find(
                            (x) => x.character == val
                        )?.points;
                        if (acpts) {
                            acc *= 5;
                            return acc + acpts;
                        } else {
                            return acc;
                        }
                    }, 0),
            ];
        } else {
            return acc;
        }
    }, [] as number[]);

    acscores.sort((a, b) => a - b);

    console.log(acscores[Math.round((acscores.length - 1) / 2)]);
};

export { run10 };
