import {readFileSync} from "fs";

// ==> part 1
//const amount = 4;

// ==> part 2
const amount = 14;

const data = String(readFileSync('./data/day-6/data'));

for(const line of data.split('\n')) {
    let result = null;
    for(let i = 3; i < line.length ; i++) {
        const set = new Set();
        for(let j = 0 ; j < amount ; j++) {
            set.add(line[i - j]);
        }
        if(set.size === amount) {
            result = i;
            break;
        }
    }
    console.error(line, result + 1);
}