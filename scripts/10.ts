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

    const checkLine: (line: string, openToClose: string[]) => number = (
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
                return currentPair.points;
            }
        }

        // If there are still characters remaining in the line, recursively call the function
        if (line.length > 1) {
            return checkLine(line.substr(1), openToClose);
        } else {
            return 0;
        }
    };

    let errorSum = input
        .map((line) => {
            return checkLine(line, []);
        })
        .reduce((acc, val) => {
            return acc + val;
        });

    console.log(`The total error syntax score is ${errorSum}`);
};

export { run10 };
