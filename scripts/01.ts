import * as fs from 'fs';
import path from 'path';

const run01 = () => {
    let input: number[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', '').replace('/scripts', ''), '/inputs/01.txt')
        )
        .toString()
        .split(/\s+$/)
        // This allows us to get a typed array of number[] for TS purposes
        .map(Number);

    // function for adding all numbers in an array together
    let sum = (arr: number[]) => {
        return arr.reduce((acc: number, curr: number) => acc + curr);
    };

    // We're using the array.reduce method to iterate our collection of depths and for
    // each measurement, decide whether or not we should increment our accumulator
    let count: number = input.reduce((cnt, currVal, idx, arr) => {
        // We only run our check on the second depth measurement and beyond
        if (idx > 0 && currVal > arr[idx - 1]) {
            return cnt + 1;
        }
        return cnt;
    }, 0);

    console.log(
        `The count of measurements larger than the previous one is ${count}`
    );

    // Similar logic to the above, except we're looking at a sliding 3 measurement window
    let slidingCount: number = input.reduce((cnt, _, idx, arr) => {
        //Only attempt to accumulate if we have a sliding window left
        if (
            idx < arr.length - 3 &&
            sum(arr.slice(idx, idx + 3)) < sum(arr.slice(idx + 1, idx + 4))
        ) {
            return cnt + 1;
        }
        return cnt;
    }, 0);

    console.log(
        `The count of sliding window measurements larger than the previous one is ${slidingCount}`
    );
};

export { run01 };
