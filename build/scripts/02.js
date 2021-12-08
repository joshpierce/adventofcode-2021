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
exports.run02 = void 0;
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var run02 = function () {
    var input = fs
        .readFileSync(path_1.default.join(__dirname.replace('\\scripts', ''), '/inputs/02.txt'))
        .toString()
        .split('\r\n');
    // We're going to use the array.reduce function to iterate our collection of instructions
    // and keep track (acc) of the x,y coordinates of our submarine
    var position = input.reduce(function (acc, val) {
        // We'll split the instruction into it's two components, the direction, and the number of units.
        var instruction = val.split(' ');
        var direction = instruction[0];
        var units = +instruction[1];
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
    }, [0, 0]);
    var answer01 = position[0] * position[1];
    console.log("Answer 1 " + answer01);
    // Similar logic with different reactions to the individual instructions
    var position2 = input.reduce(function (acc, val) {
        var instruction = val.split(' ');
        var direction = instruction[0];
        var units = +instruction[1];
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
    }, [0, 0, 0]);
    var answer02 = position2[0] * position2[1];
    console.log("Answer 2 " + answer02);
};
exports.run02 = run02;
