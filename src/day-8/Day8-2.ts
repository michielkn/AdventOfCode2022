import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-8/data'));

const d = [];

for(const line of data.split('\n')) {
    d.push(line.split('').map((tree) => (Number(tree))));
}

let result = 0;
for(let row = 0; row < d.length ; row ++) {
    for(let column = 0; column < d[row].length; column ++) {
        const score = getScenicScore(row, column);
        if(score > result) {
            result = score;
        }
    }
}

console.error(result);

function getScenicScore(rowIndex: number, columnIndex: number) {
    const value = d[rowIndex][columnIndex];
    const row = d[rowIndex];
    const column = d.map((r) => (r[columnIndex]));

    let leftScore = 0
    let rightScore = 0
    let topScore = 0
    let bottomScore = 0

    for(let i = columnIndex - 1; i >= 0 && leftScore >=0 ;i--) {
        leftScore++
        if(row[i] >= value) {
            leftScore = leftScore * -1;
        }
    }

    for(let i = columnIndex + 1; i < row.length && rightScore >=0 ; i++){
        rightScore++
        if(row[i] >= value) {
            rightScore = rightScore * -1;
        }
    }

    for(let i = rowIndex - 1; i >= 0 && topScore >=0 ;i--) {
        topScore++
        if(column[i] >= value) {
            topScore = topScore * -1;
        }
    }

    for(let i = rowIndex + 1; i < column.length && bottomScore >=0 ; i++){
        bottomScore++
        if(column[i] >= value) {
            bottomScore = bottomScore * -1;
        }
    }

    //console.error(leftScore, rightScore, topScore, bottomScore)

    return Math.abs(leftScore * rightScore * topScore * bottomScore)

}
