import {readFileSync} from "fs";

enum Choice {
    ROCK=1,
    PAPER=2,
    SCHISSORS=3,
}

const options = [Choice.ROCK, Choice.PAPER, Choice.SCHISSORS];

enum Outcome {
    LOST=0,
    DRAW=3,
    WIN=6,
}

// read the data file
const data = String(readFileSync('./data/day-2/data'));

let points = 0;
for(const line of data.split('\n')) {
    const [opponentCode, outcomeCode] = line.split(' ');
    const opponentChoice = convertInputToChoice(opponentCode);

    const outcome = convertInputToOutcome(outcomeCode);
    const myChoice = getMyChoice(opponentChoice, outcome);

    points += myChoice
    points += outcome
}

console.error(points);

function convertInputToChoice (input: string) {
    switch (input) {
        case 'A':
            return Choice.ROCK;
        case 'B':
            return Choice.PAPER;
        case 'C':
            return Choice.SCHISSORS;
        default:
            throw new Error(`Cant convert input to choice: ${input}`)
    }
}

function convertInputToOutcome(input: string) {
    switch (input) {
        case 'X':
            return Outcome.LOST;
        case 'Y':
            return Outcome.DRAW;
        case 'Z':
            return Outcome.WIN;
        default:
            throw new Error(`Cant convert input to choice: ${input}`)
    }
}

function getMyChoice(opponentChoice: Choice, outcome: Outcome): Choice {
    for (const choice of options) {
        if(getOutcome(opponentChoice, choice) === outcome) {
            return choice;
        }
    }
    throw new Error(`No Choice found for: ${opponentChoice}/${outcome}`);
}

function getOutcome(opponentChoice: Choice, myChoice: Choice) {
    if(opponentChoice === myChoice) {
        return Outcome.DRAW
    } else if (opponentChoice === Choice.ROCK && myChoice === Choice.SCHISSORS) {
        return Outcome.LOST;
    } else if (opponentChoice === Choice.SCHISSORS && myChoice === Choice.ROCK) {
        return Outcome.WIN;
    }
    return opponentChoice - myChoice < 0 ? Outcome.WIN : Outcome.LOST
}

