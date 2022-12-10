import {readFileSync} from "fs";

const data = String(readFileSync('data/day-10/data'));
const normalizedData = [];
let xRegisterValue = 1;
let pixelsArray = '';

// add noop line before every addx line to normilize data to cycles
for(const line of data.split('\n')){
    if(line.startsWith('addx')) {
        normalizedData.push('noop');
    }
    normalizedData.push(line);
}

for(let i = 0; i < normalizedData.length; i++) {
    const line = normalizedData[i];
    let normilizedCycle = i;
    while (normilizedCycle >= 40) {
        normilizedCycle-=40;
    }
    if(normilizedCycle === xRegisterValue -1 || normilizedCycle === xRegisterValue || normilizedCycle == xRegisterValue + 1) {
        pixelsArray +='#'
    }  else {
        pixelsArray +='.'
    }
    if(line.startsWith('addx')) {
        const value = Number(line.split(' ')[1]);
        xRegisterValue += value;
    }
}

for(let i = 0 ; i < pixelsArray.length / 40; i ++) {
    console.log(pixelsArray.substring(40*i, 40*(i+1)));
}


