import * as fs from 'fs';
import path from 'path';

type FishCount = {
    age: number;
    count: number;
}

const run06 = () => {
    let input: number[] = fs
        .readFileSync(
            path.join(__dirname.replace('\\scripts', '').replace('/scripts', ''), '/inputs/06.txt')
        )
        .toString()
        .split(',')
        .map(Number);

    let numberOfDays = 256;
    let fishies = input.reduce((acc, val, idx) => {
        let match = acc.find(f => f.age == val);
        if (match) {
            match.count++;
            return acc;
        } else {
            return [...acc, { age: val, count: 1 }];
        }
    }, [] as FishCount[]);

    for (let day = 1; day <= numberOfDays; day++) {
        
        let newFishies: FishCount[] = [];
        for (let fish of fishies) {
            if (fish.age == 0) {
                newFishies.push({ age: 8, count: fish.count });
                newFishies.push({ age: 6, count: fish.count });
            } else {
                newFishies.push({ age: fish.age - 1, count: fish.count });
            }
        }


        fishies = newFishies.reduce((acc, val, idx) => {
            let match = acc.find(f => f.age == val.age);
            if (match) {
                match.count += val.count;
                return acc;
            } else {
                return [...acc, { age: val.age, count: val.count }];
            }
        }, [] as FishCount[]);

        fishies.sort((a,b) => a.age - b.age);
    }

    let sumOfFish = fishies.reduce((acc, val) => {
        return acc + val.count;
    }, 0);
    
    console.log(`After ${numberOfDays} days there were ${sumOfFish} Lanterfish`);
};

export { run06 };
