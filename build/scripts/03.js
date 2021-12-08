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
exports.run03 = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var run03 = function () {
    var input = fs
        .readFileSync(path_1.default.join(__dirname.replace('\\scripts', ''), '/inputs/03.txt'))
        .toString()
        .split('\r\n');
    var ones = input.reduce(function (acc, val, idx) {
        var bits = val.split('');
        return acc.map(function (x, ix) {
            return x + +bits[ix];
        });
    }, Array(input[0].length).fill(0));
    var zeros = ones.map(function (x) {
        return input.length - x;
    });
    var gamma = ones.reduce(function (acc, val, idx) {
        return val > zeros[idx] ? acc + '1' : acc + '0';
    }, '');
    console.log("The Gamma Rate is " + parseInt(gamma, 2));
    var epsilon = gamma.split('').reduce(function (acc, val, idx) {
        return acc + (val == '1' ? '0' : '1');
    }, '');
    console.log("The Epsilon Rate is " + parseInt(epsilon, 2));
    console.log("The Power Consumption Rate is " + parseInt(gamma, 2) * parseInt(epsilon, 2));
    // Part 2
    var getCommonBit = function (vals) {
        var ones = vals.reduce(function (acc, val, idx) {
            return val === '1' ? acc + 1 : acc;
        }, 0);
        var zeros = vals.length - ones;
        return ones >= zeros ? '1' : '0';
    };
    var getOxyRating = function (vals, idx) {
        var commonBit = getCommonBit(vals.map(function (x) { return x.split('')[idx]; }));
        var remainingVals = vals.filter(function (x) { return x.split('')[idx] == commonBit; });
        if (remainingVals.length == 1 || idx == vals.length - 1) {
            return remainingVals[0];
        }
        else {
            return getOxyRating(remainingVals, idx + 1);
        }
    };
    var oxyRating = getOxyRating(input, 0);
    console.log("The Oxy Generator Rating is " + oxyRating);
    var getCO2Rating = function (vals, idx) {
        // For this iteration we need the least common, so lets inverse our response from getCommonBit
        var leastCommonBit = getCommonBit(vals.map(function (x) { return x.split('')[idx]; })) == '1' ? '0' : '1';
        var remainingVals = vals.filter(function (x) { return x.split('')[idx] == leastCommonBit; });
        if (remainingVals.length == 1 || idx == vals.length - 1) {
            return remainingVals[0];
        }
        else {
            return getCO2Rating(remainingVals, idx + 1);
        }
    };
    var co2Rating = getCO2Rating(input, 0);
    console.log("The CO2 Scrubber Rating is " + co2Rating);
    console.log("The Life Support Rating is " + parseInt(oxyRating, 2) * parseInt(co2Rating, 2));
};
exports.run03 = run03;
