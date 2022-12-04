import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-3/data'));

let result = 0;
for(const line of data.split('\n')) {
    const [items1, items2] = splitItems(line);
    const duplicateItem = getItemInBothArrays(items1, items2);
    const value = getValueOfItem(duplicateItem);
    result += value;
}

console.info(result);

function splitItems(input: string) {
    const sub1 = input.substring(0, input.length/2);
    const sub2 = input.substring(input.length/2, input.length);
    return [sub1.split(''), sub2.split('')];
}

function getItemInBothArrays(items1, items2) {
    for(const item of items1) {
        if(items2.includes(item)) {
            return item;
        }
    }
    throw new Error('no item found');
}

function getValueOfItem(item: string) {
    const charCode = item.charCodeAt(0);
    // uppercase
    if(item.toUpperCase() === item) {
        return charCode - 38;
    } else {
        // lowercase
        return charCode - 96
    }


}