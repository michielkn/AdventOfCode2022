import {readFileSync} from "fs";

enum Choice {
    ROCK=1,
    PAPER=2,
    SCHISSORS=3,
}

enum Outcome {
    LOST=0,
    DRAW=3,
    WIN=6,
}

// read the data file
const data = String(readFileSync('./data/day-2/data'));

let pointes = 0;
for(const line of data.split('\n')) {
    const [opponentCode, myCode] = line.split(' ');
    const opponentChoice = convertInputToChoice(opponentCode);
    const myChoice = convertInputToChoice(myCode);

    const outcome = getOutcome(opponentChoice, myChoice);

    pointes +=myChoice
    pointes += outcome
}

console.error(pointes);







function convertInputToChoice (input: string) {
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
            throw new Error(`Cant convert input to choice: ${input}`)
    }
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

