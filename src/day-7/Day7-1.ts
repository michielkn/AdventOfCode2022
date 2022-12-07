import {readFileSync} from "fs";

const maxSize = 100000;

const data = String(readFileSync('./data/day-7/data'));

type listType = {
    dir: boolean,
    name: string,
    size?: number,
    files?: listType[]
}

let d: listType = {
    dir: true,
    name: '/',
    files: [],
}
let cwd: string[] = [];
//let readingLs = false;

// create the file tree
for(const line of data.split('\n')) {
    if(line.startsWith('$')) {
        executeCommand(line);
    } else if(line.startsWith('dir')){
        const [_, dir] = line.split(' ');
        addDirToD(dir);
    } else if(!line.startsWith('dir')) {
        const [size, fileName] = line.split(' ');
        addFileToD(Number(size), fileName);
    }
}

const sizes = [];
setSizes(d);

function setSizes (l: listType) {
    if(!l.dir) {
        return l.size;
    }
    let sum = 0;
    for(const file of l.files) {
        sum += setSizes(file);
    }
    sizes.push({
        name: l.name,
        size: sum
    })
    return sum;
}

console.error(sizes
    .filter((size) => (size.size <= maxSize))
    .reduce((accumelator, currentValue) => (accumelator + currentValue.size), 0));



function executeCommand(command: string){
    if(command.startsWith('$ cd')) {
        const path = command.substring(5);
        if(path === '/') {
            cwd = ['/']
        } else if(path === '..') {
            cwd.pop();
        } else {
            cwd.push(path);
        }
    }
    // else if(command === '$ ls') {
    //     readingLs = true;
    // }
}

function addDirToD(dir: string) {
    let locationToAdd = getListFromCWD();
    locationToAdd.files.push({
        dir: true,
        name: dir,
        files: []
    })
}

function addFileToD (size: number, fileName: string) {
    let locationToAdd = getListFromCWD();
    locationToAdd.files.push({
        dir: false,
        name: fileName,
        size
    })
}

function getListFromCWD() {
    let workingList = d;
    for(const cwdPart of cwd) {
        if(cwdPart !== '/') {
            workingList = workingList.files.find((l) => (l.name === cwdPart));
        }
    }
    return workingList;
}

