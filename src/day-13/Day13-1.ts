import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-13/data'))

const pairs = [];

for(const pair of data.split('\n\n')){
    const [line1, line2] = pair.split('\n');
    pairs.push({
        line1: JSON.parse(line1),
        line2: JSON.parse(line2)
    })
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

let result = 0;
for(let i = 0 ; i < pairs.length ; i++) {
    if(compare(pairs[i].line1, pairs[i].line2).isInOrder) {
        result+=(i+1)
    }
}
console.error(result);