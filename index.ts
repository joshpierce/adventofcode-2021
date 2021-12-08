import { getArgs } from './helpers/get-process-args';
import {
    run01,
    run02,
    run03,
    run04,
    run05,
    run06,
    run07,
    run08,
    run09,
    run10,
    run11,
    run12,
    run13,
    run14,
    run15,
    run16,
    run17,
    run18,
    run19,
    run20,
    run21,
    run22,
    run23,
    run24,
    run25,
} from './scripts';

let day = getArgs().find((arg) => {
    return arg.key == 'day';
})?.val;

if (day) {
    switch (day) {
        case '1':
            run01();
            break;
        case '2':
            run02();
            break;
        case '3':
            run03();
            break;
        case '4':
            run04();
            break;
        case '5':
            run05();
            break;
        case '6':
            run06();
            break;
        case '7':
            run07();
            break;
        case '8':
            run08();
            break;
        case '9':
            run09();
            break;
        case '10':
            run10();
            break;
        case '11':
            run11();
            break;
        case '12':
            run12();
            break;
        case '13':
            run13();
            break;
        case '14':
            run14();
            break;
        case '15':
            run15();
            break;
        case '16':
            run16();
            break;
        case '17':
            run17();
            break;
        case '18':
            run18();
            break;
        case '19':
            run19();
            break;
        case '20':
            run20();
            break;
        case '21':
            run21();
            break;
        case '22':
            run22();
            break;
        case '23':
            run23();
            break;
        case '24':
            run24();
            break;
        case '25':
            run25();
            break;
    }
} else {
    console.error(
        'There was no day paramter passed, please run the program like `npm run start -- -day=1`'
    );
}
