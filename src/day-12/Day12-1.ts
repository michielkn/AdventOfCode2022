import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-12/data'));
const lines = data.split('\n');
const map = [];

let startLocationX = 0;
let startLocationY = 0;
let endLocationX = 0;
let endLocationY = 0;

for(let y = 0; y < lines.length ; y++){
    const chars = lines[y].split('');
    let a = [];
    for(let x = 0; x < chars.length; x++) {
        let value = chars[x].charCodeAt(0) - 96;
        if(chars[x] === 'S') {
            value = 1;
            startLocationX = x;
            startLocationY = y
        } else if(chars[x] === 'E') {
            value = 26;
            endLocationX = x;
            endLocationY = y;
        }
        a.push(value)
    }
    map.push(a);
}

let visitedLocations = [{x: startLocationX, y: startLocationY}];
let paths = [[{x: startLocationX, y: startLocationY}]];
let solved = false;
while(!solved) {
    let newPaths = [];
    for(const path of paths) {
        const lastNode = path[path.length -1];

        const adjacentLocations = [
            {x: lastNode.x - 1, y: lastNode.y},
            {x: lastNode.x + 1, y: lastNode.y},
            {x: lastNode.x, y: lastNode.y - 1},
            {x: lastNode.x, y: lastNode.y + 1},
        ];

        for(const possibleNextLocation of adjacentLocations) {
            if(possibleNextLocation.x >= 0
                && possibleNextLocation.y >= 0
                && possibleNextLocation.x < map[0].length
                && possibleNextLocation.y < map.length
                && !visitedLocations.find(({x, y}) => (possibleNextLocation.x === x && possibleNextLocation.y === y ))
                && map[lastNode.y][lastNode.x] >= map[possibleNextLocation.y][possibleNextLocation.x] -1
            ) {
                const pathToAdd = [...path];
                pathToAdd.push(possibleNextLocation);
                visitedLocations.push(possibleNextLocation);
                if(possibleNextLocation.x === endLocationX && possibleNextLocation.y === endLocationY) {
                    solved = true;
                    console.error(pathToAdd.length - 1);
                }
                newPaths.push(pathToAdd);
            }
        }

    }
    paths = newPaths;
}