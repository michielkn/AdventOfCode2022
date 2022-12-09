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

let positions = [];

for(let i = 0 ; i < 10 ; i ++) {
    positions.push({
        positionX: 0,
        positionY: 0,
    })
}

for(const command of commands) {
    moveHead(command);
    for(let i = 1; i < positions.length ; i++) {
        moveTail(i);
    }

}

console.error(visitedPositions.length);

function moveTail(positionIndex: number) {
    let parallellMovement = false;
    const xDistance = getXDistance(positionIndex);
    const yDistance = getYDistance(positionIndex);

    const headPositionX = positions[positionIndex - 1].positionX;
    const headPositionY = positions[positionIndex - 1].positionY;
    let tailPositionX = positions[positionIndex].positionX;
    let tailPositionY = positions[positionIndex].positionY;

    let distance;
    if(xDistance === 1 && yDistance === 1) {
        distance = 1;
    } else {
        distance = xDistance + yDistance;
    }

    if(distance < 2) {
        console.log('not moving');

        // TODO, distance 2 and distance 4 could probably be combined somehow
    } else if(distance === 4) {
        if(headPositionY > tailPositionY) {
            positions[positionIndex].positionY = tailPositionY + 1
        } else {
            positions[positionIndex].positionY = tailPositionY -1
        }

        if(headPositionX > tailPositionX) {
            positions[positionIndex].positionX = tailPositionX + 1
        } else {
            positions[positionIndex].positionX = tailPositionX -1
        }
    } else if(distance === 2) {
        console.log('move in line')
        if(headPositionX === tailPositionX) {
            if(headPositionY > tailPositionY) {
                positions[positionIndex].positionY = tailPositionY + 1
            } else {
                positions[positionIndex].positionY = tailPositionY - 1
            }
        } else {
            if(headPositionX > tailPositionX) {
                positions[positionIndex].positionX = tailPositionX + 1
            } else {
                positions[positionIndex].positionX = tailPositionX - 1
            }
        }
    } else {
        console.log('move paralell');
        if(xDistance === 2) {
            positions[positionIndex].positionY = headPositionY;
        } else {
            positions[positionIndex].positionX = headPositionX;
        }
        parallellMovement = true;
        moveTail(positionIndex);
    }
    if(!parallellMovement && positionIndex === positions.length - 1) {
        saveTailLocation();
    }
}

function saveTailLocation() {
    const tailPositionX = positions[positions.length -1].positionX;
    const tailPositionY = positions[positions.length -1].positionY;

    if(!visitedPositions.find((location) => (location[0] === tailPositionX && location[1] === tailPositionY))) {
        visitedPositions.push([tailPositionX, tailPositionY]);
    }
}

function getXDistance(positionIndex: number): number {
    return Math.abs(positions[positionIndex -1].positionX - positions[positionIndex].positionX);
}

function getYDistance(positionIndex: number): number {
    return Math.abs(positions[positionIndex -1].positionY - positions[positionIndex].positionY);
}

function moveHead(command) {
    switch (command){
        case 'U':
            positions[0].positionY++;
            break;
        case 'D':
            positions[0].positionY--;
            break;
        case 'R':
            positions[0].positionX++;
            break;
        case 'L':
            positions[0].positionX--;
            break;
    }
}
