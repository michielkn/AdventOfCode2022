import {readFileSync} from "fs";

const amountOfRounds = 20;

const data = String(readFileSync('./data/day-11/data'));

const monkeysDataString = data.split('\n\n');

const monkeysData = [];

for(const monkeyDataString of monkeysDataString) {
    const [describerLine, startingItemsLine, operationLine, testLine, trueLine, falseLine] = monkeyDataString.split('\n');
    const items = startingItemsLine.substring(17).split(',').map((s) => (Number(s.trim())))
    const operator = operationLine.substring(23, 24)
    const operatorValue = Number(operationLine.substring(25).trim()) || 'old'
    const test = Number(testLine.substring(21).trim())
    const trueMonkey = Number(trueLine.substring(29).trim())
    const falseMonkey = Number(falseLine.substring(29).trim())
    monkeysData.push({
        amountOfInspections: 0,
        items,
        operator,
        operatorValue,
        test,
        trueMonkey,
        falseMonkey,
    })
}

for(let roundIndex = 0; roundIndex < amountOfRounds ; roundIndex ++) {
    for(const monkeyData of monkeysData) {
        for(const item of monkeyData.items) {
            let worryLevel = calculateWorryLevel(item, monkeyData.operator, monkeyData.operatorValue);
            worryLevel = calculateBoredWorryLevel(worryLevel);
            if(worryLevel % monkeyData.test === 0) {
                monkeysData[monkeyData.trueMonkey].items.push(worryLevel);
            } else {
                monkeysData[monkeyData.falseMonkey].items.push(worryLevel);
            }
        }
        monkeyData.amountOfInspections = monkeyData.amountOfInspections + monkeyData.items.length;
        monkeyData.items = [];
    }
}

const orderedMonkeyData = monkeysData.sort((a, b) => (b.amountOfInspections - a.amountOfInspections))
console.error(orderedMonkeyData[0].amountOfInspections * orderedMonkeyData[1].amountOfInspections);

function calculateWorryLevel(base: number, operator: string, operatorValue: string | number) {
    let operatorValue2 = operatorValue === 'old'? base : Number(operatorValue);
    if(operator === '+') {
        return base + operatorValue2;
    } else if(operator === '*') {
        return base * operatorValue2;
    } else {
        throw new Error('Found unkown operator')
    }
}

function calculateBoredWorryLevel(level) {
    return Math.floor(level/3);
}

