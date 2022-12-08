import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-8/data'));

// create the data structure
const d = [];

for(const line of data.split('\n')) {
    d.push(line.split('').map((tree) => (Number(tree))));
}


let counter = 0;
for(let row = 0; row < d.length ; row ++) {
    for(let column = 0; column < d[row].length; column ++) {
        if(isTreeVisible(row, column)) {
            counter++
        }
    }
}
console.error(counter);


function isTreeVisible(rowIndex: number, columnIndex: number) {
    const value = d[rowIndex][columnIndex];
    const row = d[rowIndex];
    const column = d.map((r) => (r[columnIndex]));

    let rowBeforeInvisible = false;
    let rowAfterInvisible = false;
    let columnBeforeInvisible = false;
    let columnAfterInvisible = false;
    for(let i = 0 ; i < columnIndex ; i++) {
        if(row[i] >= value) {
            rowBeforeInvisible = true
        }
    }
    for(let i = columnIndex + 1 ; i < row.length ; i++) {
        if(row[i] >= value) {
            rowAfterInvisible = true
        }
    }
    for(let i = 0 ; i < rowIndex ; i++) {
        if(column[i] >= value) {
            columnBeforeInvisible = true
        }
    }
    for(let i = rowIndex + 1 ; i < column.length ; i++) {
        if(column[i] >= value) {
            columnAfterInvisible = true
        }
    }

    return !(rowBeforeInvisible && rowAfterInvisible && columnBeforeInvisible && columnAfterInvisible)
}