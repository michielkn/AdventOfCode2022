import { readFileSync } from "fs";
var Choice;
(function (Choice) {
    Choice[Choice["ROCK"] = 1] = "ROCK";
    Choice[Choice["PAPER"] = 2] = "PAPER";
    Choice[Choice["SCHISSORS"] = 3] = "SCHISSORS";
})(Choice || (Choice = {}));
const options = [Choice.ROCK, Choice.PAPER, Choice.SCHISSORS];
var Outcome;
(function (Outcome) {
    Outcome[Outcome["LOST"] = 0] = "LOST";
    Outcome[Outcome["DRAW"] = 3] = "DRAW";
    Outcome[Outcome["WIN"] = 6] = "WIN";
})(Outcome || (Outcome = {}));
// read the data file
const data = String(readFileSync('./data/day-2/data'));
let points = 0;
for (const line of data.split('\n')) {
    const [opponentCode, outcomeCode] = line.split(' ');
    const opponentChoice = convertInputToChoice(opponentCode);
    const outcome = convertInputToOutcome(outcomeCode);
    const myChoice = getMyChoice(opponentChoice, outcome);
    points += myChoice;
    points += outcome;
}
console.error(points);
function convertInputToChoice(input) {
    switch (input) {
        case 'A':
            return Choice.ROCK;
        case 'B':
            return Choice.PAPER;
        case 'C':
            return Choice.SCHISSORS;
        default:
            throw new Error(`Cant convert input to choice: ${input}`);
    }
}
function convertInputToOutcome(input) {
    switch (input) {
        case 'X':
            return Outcome.LOST;
        case 'Y':
            return Outcome.DRAW;
        case 'Z':
            return Outcome.WIN;
        default:
            throw new Error(`Cant convert input to choice: ${input}`);
    }
}
function getMyChoice(opponentChoice, outcome) {
    for (const choice of options) {
        if (getOutcome(opponentChoice, choice) === outcome) {
            return choice;
        }
    }
    throw new Error(`No Choice found for: ${opponentChoice}/${outcome}`);
}
function getOutcome(opponentChoice, myChoice) {
    if (opponentChoice === myChoice) {
        return Outcome.DRAW;
    }
    else if (opponentChoice === Choice.ROCK && myChoice === Choice.SCHISSORS) {
        return Outcome.LOST;
    }
    else if (opponentChoice === Choice.SCHISSORS && myChoice === Choice.ROCK) {
        return Outcome.WIN;
    }
    return opponentChoice - myChoice < 0 ? Outcome.WIN : Outcome.LOST;
}
