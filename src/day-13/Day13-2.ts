import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-13/data'))
const lines = [];

let dividerPackets =[[[2]], [[6]]]

lines.push(dividerPackets[0], dividerPackets[1]);

for(const line of data.split('\n\n').join('\n').split('\n')){
    lines.push(JSON.parse(line));
}

type CompareResult = {
    hasResult: boolean;
    isInOrder?: boolean;
}


function compare(left: any, right: any): CompareResult{
    // console.error('comparing', left, right);
    if(typeof left === 'number' && typeof right === 'number') {
        if(left === right) {
            return {
                hasResult: false
            }
        }
        return {
            hasResult: true,
            isInOrder: left < right,
        }
    }
    if(Array.isArray(left) && Array.isArray(right)) {
        const longestArraySize = left.length > right.length ? left.length : right.length
        for(let i = 0 ; i<longestArraySize; i++) {
            if(i > left.length - 1) {
                return {hasResult: true, isInOrder: true}
            }
            if(i > right.length - 1) {
                return {hasResult: true, isInOrder: false}
            }
            const compareResult = compare(left[i], right[i]);
            if(compareResult.hasResult){
                return compareResult;
            }
        }
        return {
            hasResult: false,
        }
    }
    if(Array.isArray(left)) {
        return compare(left, [right]);
    }
    return compare([left], right);
}

const sortedLines = lines.sort((a, b) => (
    compare(a, b).isInOrder ? -1 : 1
))

let result = 1;

for(let i = 0 ; i < lines.length; i++) {
    if(JSON.stringify(lines[i]) === JSON.stringify(dividerPackets[0])) {
        result = result * (i+1)
    } else if(JSON.stringify(lines[i]) === JSON.stringify(dividerPackets[1])) {
        result = result * (i+1)
    }
}

console.error(result);
