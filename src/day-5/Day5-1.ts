import {readFileSync} from "fs";

const data = String(readFileSync('./data/day-5/data'));

let didReadAllStartingLines = false;
const startingLines = [];
const commandLines = [];

const buckets = [];

// read the data
for(const line of data.split('\n')) {
    if(line.length === 0) {
        didReadAllStartingLines = true
        continue;
    }

    if(!didReadAllStartingLines) {
        startingLines.unshift(line);
    } else {
        commandLines.push(line);
    }
}

let didCreateBuckets = false;

// creating the buckets
for(const line of startingLines) {
    if(!didCreateBuckets) {
        for(const c of line.replaceAll(' ', '')) {
            buckets.push([]);
        }
        didCreateBuckets = true;
    } else {
        for(let bucketNumber = 0; bucketNumber < buckets.length ; bucketNumber++) {
            const partForBucketStartIndex = bucketNumber * 4 + 1
            const char = line.substring(partForBucketStartIndex, partForBucketStartIndex + 1).trim();
            if(char.length === 1) {
                buckets[bucketNumber].push(char);
            }
        }
    }
}


for(const line of commandLines) {
    const [_move, amountString, _from, fromString, _to, toString] = line.split(' ');
    const amount = Number(amountString);
    const from = Number(fromString);
    const to = Number(toString);
    for(let i = 0 ; i < amount ; i++) {
        const val = buckets[from -1].pop();
        buckets[to -1].push(val);
    }
}


let result = '';
for(const bucket of buckets) {
    result+= bucket[bucket.length -1];
}

console.error(result);


