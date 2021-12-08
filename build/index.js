"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var get_process_args_1 = require("./helpers/get-process-args");
var scripts_1 = require("./scripts");
var day = (_a = get_process_args_1.getArgs().find(function (arg) {
    return arg.key == 'day';
})) === null || _a === void 0 ? void 0 : _a.val;
if (day) {
    switch (day) {
        case '1':
            scripts_1.run01();
            break;
        case '2':
            scripts_1.run02();
            break;
        case '3':
            scripts_1.run03();
            break;
        case '4':
            scripts_1.run04();
            break;
        case '5':
            scripts_1.run05();
            break;
        case '6':
            scripts_1.run06();
            break;
        case '7':
            scripts_1.run07();
            break;
        case '8':
            scripts_1.run08();
            break;
        case '9':
            scripts_1.run09();
            break;
        case '10':
            scripts_1.run10();
            break;
        case '11':
            scripts_1.run11();
            break;
        case '12':
            scripts_1.run12();
            break;
        case '13':
            scripts_1.run13();
            break;
        case '14':
            scripts_1.run14();
            break;
        case '15':
            scripts_1.run15();
            break;
        case '16':
            scripts_1.run16();
            break;
        case '17':
            scripts_1.run17();
            break;
        case '18':
            scripts_1.run18();
            break;
        case '19':
            scripts_1.run19();
            break;
        case '20':
            scripts_1.run20();
            break;
        case '21':
            scripts_1.run21();
            break;
        case '22':
            scripts_1.run22();
            break;
        case '23':
            scripts_1.run23();
            break;
        case '24':
            scripts_1.run24();
            break;
        case '25':
            scripts_1.run25();
            break;
    }
}
else {
    console.error('There was no day paramter passed, please run the program like `npm run start -- -day=1`');
}
