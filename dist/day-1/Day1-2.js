import { readFileSync } from "fs";
// read the data file
const data = String(readFileSync('./data/day-1/data'));
let caloriesSum = 0;
let calorieCounter = 0;
let calorieArray = [];
// split the data in lines and loop
for (const line of data.split('\n')) {
    // if empty line, add it to the calorieArray
    if (line.length === 0) {
        calorieArray.push(calorieCounter);
        calorieCounter = 0;
    }
    else {
        // add the number to the calorieCounter
        calorieCounter += Number(line);
    }
}
// sort the array from big to small
calorieArray = calorieArray.sort((a, b) => (b - a));
console.log(calorieArray);
for (let i = 0; i < 3; i++) {
    caloriesSum += calorieArray[i];
}
console.error(caloriesSum);
