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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run01 = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var run01 = function () {
    var input = fs
        .readFileSync(path_1.default.join(__dirname.replace('\\scripts', ''), '/inputs/01.txt'))
        .toString()
        .split('\r\n')
        // This allows us to get a typed array of number[] for TS purposes
        .map(Number);
    // function for adding all numbers in an array together
    var sum = function (arr) {
        return arr.reduce(function (acc, curr) { return acc + curr; });
    };
    // We're using the array.reduce method to iterate our collection of depths and for
    // each measurement, decide whether or not we should increment our accumulator
    var count = input.reduce(function (cnt, currVal, idx, arr) {
        // We only run our check on the second depth measurement and beyond
        if (idx > 0 && currVal > arr[idx - 1]) {
            return cnt + 1;
        }
        return cnt;
    }, 0);
    console.log("The count of measurements larger than the previous one is " + count);
    // Similar logic to the above, except we're looking at a sliding 3 measurement window
    var slidingCount = input.reduce(function (cnt, _, idx, arr) {
        //Only attempt to accumulate if we have a sliding window left
        if (idx < arr.length - 3 &&
            sum(arr.slice(idx, idx + 3)) < sum(arr.slice(idx + 1, idx + 4))) {
            return cnt + 1;
        }
        return cnt;
    }, 0);
    console.log("The count of sliding window measurements larger than the previous one is " + slidingCount);
};
exports.run01 = run01;
