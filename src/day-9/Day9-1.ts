import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-9/data'));
const commands = [];


for(const line of data.split('\n')){
    const [command, amountString] = line.split(' ');
    for(let i = 0 ; i < Number(amountString) ; i++) {
        commands.push(command);
    }
}

let visitedPositions = [[0,0]];

let headPositionX = 0;
let headPositionY = 0;
let tailPositionX = 0;
let tailPositionY = 0;

for(const command of commands) {
    moveHead(command);
    moveTail();
}

console.error(visitedPositions.length);

function moveTail() {
    let parallellMovement = false;
    const xDistance = getXDistance();
    const yDistance = getYDistance();
    let distance;
    if(xDistance === 1 && yDistance === 1) {
        distance = 1;
    } else {
        distance = xDistance + yDistance;
    }

    if(distance < 2) {
        console.log('not moving');
    } else if(distance === 4) {
        throw Error('no possible');
    } else if(distance === 2) {
        console.log('move in line')
        if(headPositionX === tailPositionX) {
            if(headPositionY > tailPositionY) {
                tailPositionY++;
            } else {
                tailPositionY--;
            }
        } else {
            if(headPositionX > tailPositionX) {
                tailPositionX++;
            } else {
                tailPositionX--;
            }
        }
    } else {
        console.log('move paralell');
        if(xDistance === 2) {
            tailPositionY = headPositionY;
        } else {
            tailPositionX = headPositionX
        }
        parallellMovement = true;
        moveTail();
    }
    if(!parallellMovement) {
        saveTailLocation();
    }
}

function saveTailLocation() {
    if(!visitedPositions.find((location) => (location[0] === tailPositionX && location[1] === tailPositionY))) {
        visitedPositions.push([tailPositionX, tailPositionY]);
    }
}

function getXDistance(): number {
    return Math.abs(headPositionX - tailPositionX);
}

function getYDistance(): number {
    return Math.abs(headPositionY - tailPositionY);
}

function moveHead(command) {
    switch (command){
        case 'U':
            headPositionY++;
            break;
        case 'D':
            headPositionY--;
            break;
        case 'R':
            headPositionX++;
            break;
        case 'L':
            headPositionX--;
            break;
    }
}
