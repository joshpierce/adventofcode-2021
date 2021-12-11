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
        console.log(`${line.length} characters left to check for Errors.`);
        let currentChar = line.split('')[0];
        console.log(`Check character ${currentChar}`);
        let currentPair = charPairs.find(
            (pair) => pair.close === currentChar || pair.open === currentChar
        );
        console.log('found current pair', currentPair);
        let isClosing = currentChar === currentPair?.close;
        // We're either breaking, or returning openToClose with one less element
        if (isClosing) {
            console.log(`Found a Closing Character ${currentChar}`);
            if (openToClose.slice(-1)[0] == currentPair?.open) {
                console.log(
                    'Correct Closing Character for currently open Chunk'
                );
                line = line.split('').slice(1).join('');
                openToClose = openToClose.slice(0, openToClose.length - 1);
                return checkLine(line, openToClose);
            } else {
                console.log(
                    'Wrong Closing Character for current Chunk, Returning.'
                );
                if (currentPair) {
                    return currentPair.points;
                } else {
                    return -1;
                }
            }
        } else if (openToClose.length == 1) {
            line = line.split('').slice(1).join('');
            openToClose = [...openToClose, currentChar];
            console.log(`New backlog contains ${openToClose}`);
            return checkLine(line, openToClose);
        }

        if (line.length === 0) {
            console.log('zero');
            return 0;
        }

        return -1;
    };

    let errorSum = input.map((line) => {
        checkLine(line, []);
    });

    console.log(errorSum);
};

export { run10 };
