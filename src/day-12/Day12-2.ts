import {readFileSync} from "fs";


const data = String(readFileSync('./data/day-12/data'));
const lines = data.split('\n');
const map = [];

const possibleStartLocations = [];
let endLocationX = 0;
let endLocationY = 0;

for(let y = 0; y < lines.length ; y++){
    const chars = lines[y].split('');
    let a = [];
    for(let x = 0; x < chars.length; x++) {
        let value = chars[x].charCodeAt(0) - 96;
        if(chars[x] === 'S') {
            value = 1;
        } else if(chars[x] === 'E') {
            value = 26;
            endLocationX = x;
            endLocationY = y;
        }
        if(value === 1) {
            possibleStartLocations.push({x, y});
        }
        a.push(value)
    }
    map.push(a);
}

console.error(possibleStartLocations.map(({x, y}, index) => (getPathLength(x, y, index))).sort()[0]);

function getPathLength(startLocationX: number, startLocationY: number, index: number) {
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
                    if(possibleNextLocation.x === endLocationX && possibleNextLocation.y === endLocationY) {
                        solved = true;
                        return path.length;
                    }
                    const pathToAdd = [...path];
                    pathToAdd.push(possibleNextLocation);
                    visitedLocations.push(possibleNextLocation);

                    newPaths.push(pathToAdd);
                }
            }

        }
        if(newPaths.length > 0) {
            paths = newPaths;
        } else {
            solved = true;
            return Infinity;
        }

    }
}

