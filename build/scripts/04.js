"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run04 = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var red = chalk_1.default.red;
var green = chalk_1.default.green;
var run04 = function () {
    var _a;
    var input = fs
        .readFileSync(path_1.default.join(__dirname.replace('\\scripts', ''), '/inputs/04.txt'))
        .toString()
        .split('\r\n');
    // Retrieve the list of balls that will be called in the game from the first line of the input
    var numbers = input[0].split(',');
    // Create all of the boards that we'll be using for this game from the rest of the input file
    var boards = input.reduce(function (acc, val, idx) {
        // Skip the Numbers line, and blank lines (board separators)
        if (idx > 0 && val !== '') {
            acc[acc.length - 1].push(val
                // split out the board numbers
                .split(' ')
                // remove any blanks (numbers are right aligned on the input, so single digits have an extra space)
                .filter(function (x) { return x; })
                // create an object for each value to track marked numbers
                .map(function (x) {
                return { val: x, marked: false };
            }));
            return acc;
        }
        // If the line is blank, create a new board
        else if (val == '') {
            return __spreadArray(__spreadArray([], acc), [[]]);
        }
        return acc;
    }, []);
    console.log("Starting a Game with " + numbers.length + " balls to be called and " + boards.length + " boards in play.");
    var findWinner = function (numbersToCall, cards, firstWinLastBall) {
        // Let's track how many boards have a match
        var boardsMatching = 0;
        var winners = cards.filter(function (x) { return x.winOrder != 0; }).length;
        // Iterate Each Board and Mark Numbers
        cards
            .filter(function (x) { return x.winOrder == 0; })
            .forEach(function (card, bx) {
            // Mark numbers if they were called
            card.board.forEach(function (row) {
                // See if a number in this row was called
                var number = row.find(function (num) {
                    return num.val == numbersToCall[0];
                });
                // If called, mark it
                if (number) {
                    boardsMatching++;
                    number.marked = true;
                }
            });
        });
        console.log("The number " + numbersToCall[0] + " was called and " + boardsMatching + " boards had a match.");
        var _loop_1 = function (card) {
            // Check for winners across rows
            for (var _b = 0, _c = card.board; _b < _c.length; _b++) {
                var row = _c[_b];
                if (row.filter(function (x) { return x.marked; }).length == 5) {
                    card.winOrder = winners + 1;
                    winners++;
                    if (winners == 1) {
                        firstWinLastBall = numbersToCall[0];
                    }
                    break;
                }
            }
            // Check for winners across columns
            var columns = card.board.reduce(function (acc, val, idx) {
                return __spreadArray(__spreadArray([], acc), [
                    [
                        card.board[0][idx],
                        card.board[1][idx],
                        card.board[2][idx],
                        card.board[3][idx],
                        card.board[4][idx],
                    ],
                ]);
            }, []);
            for (var _d = 0, columns_1 = columns; _d < columns_1.length; _d++) {
                var col = columns_1[_d];
                if (col.filter(function (x) { return x.marked; }).length == 5) {
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
        };
        // Check to see if we have any winners
        for (var _i = 0, _a = cards.filter(function (x) { return x.winOrder == 0; }); _i < _a.length; _i++) {
            var card = _a[_i];
            _loop_1(card);
        }
        if (winners == cards.length) {
            return {
                cards: cards,
                firstWinLastBall: firstWinLastBall || '',
                lastWinLastBall: numbersToCall[0],
            };
        }
        else {
            return findWinner(numbersToCall.slice(1), cards, firstWinLastBall);
        }
    };
    // Our winner is determined
    var results = findWinner(numbers, boards.map(function (board) {
        return { winOrder: 0, board: board };
    }));
    console.log(results.cards.map(function (x) { return x.winOrder; }));
    console.log((_a = results.cards.find(function (x) { return x.winOrder == 100; })) === null || _a === void 0 ? void 0 : _a.board);
    var firstWinner = results.cards.find(function (board) {
        return board.winOrder == 1;
    });
    console.log();
    if (firstWinner) {
        // Print out the Winning Board
        console.log("The First Winning Board");
        for (var _i = 0, _b = firstWinner.board; _i < _b.length; _i++) {
            var row = _b[_i];
            var rowString = '';
            for (var _c = 0, row_1 = row; _c < row_1.length; _c++) {
                var number = row_1[_c];
                if (number.marked) {
                    rowString += green((' ' + number.val).slice(-2));
                }
                else {
                    rowString += red((' ' + number.val).slice(-2));
                }
                rowString += ' ';
            }
            console.log(rowString);
        }
        console.log("The last ball to be called for the first winner was " + results.firstWinLastBall);
        var sumOfUnmarked = firstWinner.board.reduce(function (acc, row) {
            var sumOfRow = row.reduce(function (acc2, number) {
                return !number.marked ? acc2 + +number.val : acc2;
            }, 0);
            return acc + sumOfRow;
        }, 0);
        console.log("The sum of the unmarked spots from the winning board is " + sumOfUnmarked);
        console.log("The final score of the winning board is " + sumOfUnmarked * +results.firstWinLastBall);
    }
    var lastWinner = results.cards.find(function (board) {
        return board.winOrder == results.cards.length;
    });
    console.log();
    if (lastWinner) {
        // Print out the Winning Board
        console.log("The Last Winning Board");
        for (var _d = 0, _e = lastWinner.board; _d < _e.length; _d++) {
            var row = _e[_d];
            var rowString = '';
            for (var _f = 0, row_2 = row; _f < row_2.length; _f++) {
                var number = row_2[_f];
                if (number.marked) {
                    rowString += green((' ' + number.val).slice(-2));
                }
                else {
                    rowString += red((' ' + number.val).slice(-2));
                }
                rowString += ' ';
            }
            console.log(rowString);
        }
        console.log("The last ball to be called for the first winner was " + results.lastWinLastBall);
        var sumOfUnmarked = lastWinner.board.reduce(function (acc, row) {
            var sumOfRow = row.reduce(function (acc2, number) {
                return !number.marked ? acc2 + +number.val : acc2;
            }, 0);
            return acc + sumOfRow;
        }, 0);
        console.log("The sum of the unmarked spots from the winning board is " + sumOfUnmarked);
        console.log("The final score of the winning board is " + sumOfUnmarked * +results.lastWinLastBall);
    }
};
exports.run04 = run04;
