import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-4/data'));

let result = 0;
for(const line of data.split('\n')) {
    const [part1String, part2String] = line.split(',')
    const [start1, end1] = getStartAndEnd(part1String);
    const [start2, end2] = getStartAndEnd(part2String);
    if(hasOverlap(start1, end1, start2, end2) || hasOverlap(start2, end2, start1, end1)) {
        result ++;
    }
}
console.error(result);

function getStartAndEnd(partString) {
    const [startString, endString] = partString.split('-');
    return [Number(startString), Number(endString)];
}


function hasOverlap(aStart: number, aEnd: number, bStart: number, bEnd: number) {
    return aStart <= bStart && bStart <= aEnd;
}



