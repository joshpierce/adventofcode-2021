"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgs = void 0;
var getArgs = function () {
    // iterates the process arguments and sends back ones starting with =
    return process.argv
        .filter(function (x) { return x.startsWith('-'); })
        .map(function (x) {
        var parts = x.replace('-', '').split('=');
        return { key: parts[0], val: parts[1] };
    });
};
exports.getArgs = getArgs;
