import {readFileSync} from "fs";

const data = String(readFileSync('data/day-10/data'));
const normalizedData = [];
let xRegisterValue = 1;
let result = 0;

// add noop line before every addx line to normilize data to cycles
for(const line of data.split('\n')){
    if(line.startsWith('addx')) {
        normalizedData.push('noop');
    }
    normalizedData.push(line);
}

for(let i = 0; i < normalizedData.length; i++) {
    const cycle = i + 1;
    const line = normalizedData[i];
    if(cycle === 20 || (cycle - 20)%40 === 0) {
        result += cycle*xRegisterValue;
    }
    if(line.startsWith('addx')) {
        const value = Number(line.split(' ')[1]);
        xRegisterValue += value;
    }
}

console.error(result);


