import {readFileSync} from "fs";

// read the data file
const data = String(readFileSync('./data/day-1/data'));

let activeElf = 1;

let elfWithMostCalories = 0;
let mostCalories = 0
let calorieCounter = 0;

// split the data in lines and loop
for(const line of data.split('\n')) {
    // if empty line, check if the calorieCounter is more then the most calories found
    if(line.length === 0) {
        //console.log(`Elf: ${activeElf}: ${calorieCounter}`);
        if(calorieCounter > mostCalories) {
            mostCalories = calorieCounter;
            elfWithMostCalories = activeElf;
        }

        calorieCounter = 0
        activeElf++;
    } else {
        // add the number to the caloryCounter
        calorieCounter+= Number(line);
    }
}

console.log(`Elf ${elfWithMostCalories} has collected the most calories: ${mostCalories}`);