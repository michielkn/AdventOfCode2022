import { readFileSync } from "fs";
var Choice;
(function (Choice) {
    Choice[Choice["ROCK"] = 1] = "ROCK";
    Choice[Choice["PAPER"] = 2] = "PAPER";
    Choice[Choice["SCHISSORS"] = 3] = "SCHISSORS";
})(Choice || (Choice = {}));
var Outcome;
(function (Outcome) {
    Outcome[Outcome["LOST"] = 0] = "LOST";
    Outcome[Outcome["DRAW"] = 3] = "DRAW";
    Outcome[Outcome["WIN"] = 6] = "WIN";
})(Outcome || (Outcome = {}));
// read the data file
const data = String(readFileSync('./data/day-2/data'));
let pointes = 0;
for (const line of data.split('\n')) {
    const [opponentCode, myCode] = line.split(' ');
    const opponentChoice = convertInputToChoice(opponentCode);
    const myChoice = convertInputToChoice(myCode);
    const outcome = getOutcome(opponentChoice, myChoice);
    pointes += myChoice;
    pointes += outcome;
}
console.error(pointes);
function convertInputToChoice(input) {
    switch (input) {
        case 'A':
        case 'X':
            return Choice.ROCK;
        case 'B':
        case 'Y':
            return Choice.PAPER;
        case 'C':
        case 'Z':
            return Choice.SCHISSORS;
        default:
            throw new Error(`Cant convert input to choice: ${input}`);
    }
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
