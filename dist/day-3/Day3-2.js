import { readFileSync } from "fs";
const data = String(readFileSync('./data/day-3/data'));
let result = 0;
const lines = data.split('\n');
for (let i = 0; i < lines.length / 3; i++) {
    const items1 = lines[i * 3].split('');
    const items2 = lines[i * 3 + 1].split('');
    const items3 = lines[i * 3 + 2].split('');
    const item = getItemInAllArrays([items1, items2, items3]);
    const value = getValueOfItem(item);
    result += value;
}
console.info(result);
function getItemInAllArrays(itemsArray) {
    for (const item of itemsArray[0]) {
        let foundItem = true;
        for (let i = 1; i < itemsArray.length; i++) {
            if (!itemsArray[i].includes(item)) {
                foundItem = false;
            }
        }
        if (foundItem) {
            return item;
        }
    }
    throw new Error('no item found');
}
function getValueOfItem(item) {
    const charCode = item.charCodeAt(0);
    // uppercase
    if (item.toUpperCase() === item) {
        return charCode - 38;
    }
    else {
        // lowercase
        return charCode - 96;
    }
}
