import * as fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const red = chalk.red;
const green = chalk.green;

type BingoNumber = {
    val: string;
    marked: boolean;
};

const run04 = () => {
    let input: string[] = fs
        .readFileSync(
            path.join(
                __dirname.replace('\\scripts', '').replace('/scripts', ''),
                '/inputs/04.txt'
            )
        )
        .toString()
        .split(/\r?\n/);

    // Retrieve the list of balls that will be called in the game from the first line of the input
    let numbers = input[0].split(',');

    // Create all of the boards that we'll be using for this game from the rest of the input file
    let boards = input.reduce((acc, val: string, idx) => {
        // Skip the Numbers line, and blank lines (board separators)
        if (idx > 0 && val !== '') {
            acc[acc.length - 1].push(
                val
                    // split out the board numbers
                    .split(' ')
                    // remove any blanks (numbers are right aligned on the input, so single digits have an extra space)
                    .filter((x) => x)
                    // create an object for each value to track marked numbers
                    .map((x) => {
                        return { val: x, marked: false };
                    })
            );
            return acc;
        }
        // If the line is blank, create a new board
        else if (val == '') {
            return [...acc, []];
        }
        return acc;
    }, [] as BingoNumber[][][]);

    console.log(
        `Starting a Game with ${numbers.length} balls to be called and ${boards.length} boards in play.`
    );

    // We'll use a recursive function to iterate through the balls being called and marking our boards to check for winners
    const findWinner = (
        numbersToCall: string[],
        cards: { winOrder: number; board: BingoNumber[][] }[],
        firstWinLastBall?: string
    ): {
        cards: { winOrder: number; board: BingoNumber[][] }[];
        firstWinLastBall: string;
        lastWinLastBall: string;
    } => {
        // Let's track how many boards have a match
        let boardsMatching = 0;
        let winners = cards.filter((x) => x.winOrder != 0).length;

        // Iterate Each Board and Mark Numbers
        cards
            .filter((x) => x.winOrder == 0)
            .forEach((card, bx) => {
                // Mark numbers if they were called
                card.board.forEach((row) => {
                    // See if a number in this row was called
                    let number = row.find((num) => {
                        return num.val == numbersToCall[0];
                    });
                    // If called, mark it
                    if (number) {
                        boardsMatching++;
                        number.marked = true;
                    }
                });
            });

        console.log(
            `The number ${numbersToCall[0]} was called and ${boardsMatching} boards had a match.`
        );

        // Check to see if we have any winners
        for (let card of cards.filter((x) => x.winOrder == 0)) {
            // Check for winners across rows
            for (let row of card.board) {
                // If we have a row on the card that has all 5 spots marked, we have a winner
                if (row.filter((x) => x.marked).length == 5) {
                    card.winOrder = winners + 1;
                    winners++;
                    // If this was the first winner, then store the first winning ball
                    if (winners == 1) {
                        firstWinLastBall = numbersToCall[0];
                    }
                    break;
                }
            }

            // Check for winners across columns, here we're transposing the card so we can easily check columns
            let columns: BingoNumber[][] = card.board.reduce(
                (acc, val, idx) => {
                    return [
                        ...acc,
                        [
                            card.board[0][idx],
                            card.board[1][idx],
                            card.board[2][idx],
                            card.board[3][idx],
                            card.board[4][idx],
                        ],
                    ];
                },
                [] as BingoNumber[][]
            );
            for (let col of columns) {
                if (col.filter((x) => x.marked).length == 5) {
                    // If the card didn't already win, then we can mark this as a winner and increment the card
                    if (!card.winOrder) {
                        card.winOrder = winners + 1;
                        winners++;
                        if (winners == 1) {
                            firstWinLastBall = numbersToCall[0];
                        }
                        break;
                    }
                }
            }
        }

        // Once all of the cards have won, return the results of the game
        if (winners == cards.length) {
            return {
                cards,
                firstWinLastBall: firstWinLastBall || '',
                lastWinLastBall: numbersToCall[0],
            };
        } else {
            // If we still have cards that haven't won, iterate through the next number
            return findWinner(numbersToCall.slice(1), cards, firstWinLastBall);
        }
    };

    // Our winner is determined
    let results = findWinner(
        numbers,
        boards.map((board) => {
            return { winOrder: 0, board };
        })
    );

    // Find our first winner from the game
    let firstWinner = results.cards.find((board) => {
        return board.winOrder == 1;
    });

    console.log();
    if (firstWinner) {
        // Print out the Winning Board
        console.log(`The First Winning Board`);
        for (let row of firstWinner.board) {
            let rowString = '';
            for (let number of row) {
                if (number.marked) {
                    rowString += green((' ' + number.val).slice(-2));
                } else {
                    rowString += red((' ' + number.val).slice(-2));
                }
                rowString += ' ';
            }
            console.log(rowString);
        }
        console.log(
            `The last ball to be called for the first winner was ${results.firstWinLastBall}`
        );

        let sumOfUnmarked: number = firstWinner.board.reduce((acc, row) => {
            let sumOfRow = row.reduce((acc2, number) => {
                return !number.marked ? acc2 + +number.val : acc2;
            }, 0);
            return acc + sumOfRow;
        }, 0);

        console.log(
            `The sum of the unmarked spots from the winning board is ${sumOfUnmarked}`
        );

        console.log(
            `The final score of the winning board is ${
                sumOfUnmarked * +results.firstWinLastBall
            }`
        );
    }

    let lastWinner = results.cards.find((board) => {
        return board.winOrder == results.cards.length;
    });

    console.log();
    if (lastWinner) {
        // Print out the Winning Board
        console.log(`The Last Winning Board`);
        for (let row of lastWinner.board) {
            let rowString = '';
            for (let number of row) {
                if (number.marked) {
                    rowString += green((' ' + number.val).slice(-2));
                } else {
                    rowString += red((' ' + number.val).slice(-2));
                }
                rowString += ' ';
            }
            console.log(rowString);
        }
        console.log(
            `The last ball to be called for the first winner was ${results.lastWinLastBall}`
        );

        let sumOfUnmarked: number = lastWinner.board.reduce((acc, row) => {
            let sumOfRow = row.reduce((acc2, number) => {
                return !number.marked ? acc2 + +number.val : acc2;
            }, 0);
            return acc + sumOfRow;
        }, 0);

        console.log(
            `The sum of the unmarked spots from the winning board is ${sumOfUnmarked}`
        );

        console.log(
            `The final score of the winning board is ${
                sumOfUnmarked * +results.lastWinLastBall
            }`
        );
    }
};

export { run04 };
