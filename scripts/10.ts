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
        console.log(`line ${line.length} to change}`);
        let currentChar = line.split('')[0];
        let currentPair = charPairs.find(
            (pair) => pair.close === currentChar || pair.open === currentChar
        );
        let isClosing = currentChar === currentPair?.close;
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
                return currentPair?.points;
            }
        } else if (openToClose.length == 1) {
            line = line.split('').slice(1).join('');
            openToClose = [...openToClose, currentChar];
            return checkLine(line, openToClose);
        }

        if (openToClose.length === 0) {
            return 0;
        }

        return -1;
    };
};

export { run10 };
