// Your code here
// Summon Board and Enemy

function board () {
    const dict = ' ABCDEFGHIJ'
    let arr = []
    for (let i = 0; i < dict.length; i++) {
        let temp = [];
        if (i === 0) {
            for (let j = 0; j < dict.length; j++) {
                if (i === 0 && j === 0) {
                    temp.push(' ')
                }
                else {
                    temp.push(`|${dict[j]}`)
                }
            }
        }
        else if (i > 0) {
            for (let j = 0; j<dict.length; j++) {
                if (j == 0) {
                    temp.push(`${i}|`)
                }
                else {
                    temp.push(' |')
                }
            }
        }
        arr.push(temp);
    }
    return arr;
}

// console.log(board())
function rngSmShip () {
    let rng = Math.ceil(Math.random()*9)
    return rng;
}

function rngBigShip () {
    let rng = Math.ceil(Math.random()*9)
    return rng;
}

function rngMedShip () {
    let rng = Math.ceil(Math.random()*9)
    return rng;
}

function summonEnemy() {
    const platform = board()
    let smShip = rngSmShip()
    let bigShip = rngBigShip()
    let medShip = rngMedShip()
    let col = Math.ceil(Math.random()*9);
    let counter = 0;
    for (let i = 1; i < platform.length; i++) {
        for (let j = 1; j < platform[i].length; j++) {
            if (platform[i][j] === ' |' && counter <= 3) {
                platform[col][smShip] = 'O|';
                platform[col+1][smShip] = 'O|';
                counter++;
            }
            if (platform[i][j] === ' |' && counter <= 3) {
                platform[bigShip][col] = 'H|';
                platform[bigShip][col+1] = 'H|';
                platform[bigShip][col+2] = 'H|';
                platform[bigShip][col+3] = 'H|';
                counter++;
            }
            if (platform[i][j] === ' |' && counter <= 3) {
                platform[medShip][col] = 'M|';
                platform[medShip][col+1] = 'M|';
                platform[medShip][col+2] = 'M|';
                counter++;
            }
        }
    }
    return platform
}



// console.log(summonEnemy());


// Playthrough

function play () {
    let playField = summonEnemy()
    let playerTurn = process.argv.slice(2, 5);
    let temp = Object.values(playerTurn);
    let shots = [];
    let finalDisplay = ''
    for (let i = 0; i < temp.length; i++) {
        let save = [];
        for (let j = 0; j < temp[i].length; j++) {
            // console.log(temp[i][j])
            save.push(temp[i][j]);
        }
        shots.push(save)
    }
    // Change shots into coordinated shots
    let dict = ' ABCDEFGHIJ';
    for (let i = 0; i < shots.length; i++) {
        for (let j = 0; j < dict.length; j++) {
            if(shots[i][0] === dict[j]) {
                shots[i][0] = '' + j;
            }
        }
    }
    for (let i = 0; i < shots.length; i++) {
        if (playField[shots[i]['0']][shots[i]['1']] === 'O|' || playField[shots[i]['0']][shots[i]['1']] === 'H|' || playField[shots[i]['0']][shots[i]['1']] === 'M|') {
            console.log('Tembakanmu tepat sasaran');
            playField[shots[i]['0']][shots[i]['1']] = 'X|'
        }
        else {
            console.log('Tembakanmu meleset');
            playField[shots[i]['0']][shots[i]['1']] = '/|'
        }
    }
    for (let i = 0 ; i < playField.length; i++) {
        for (let j = 0; j < playField[i].length; j++) {
            finalDisplay += playField[i][j]
            if (j % 10 === 0 && j !== 0) {
                finalDisplay += '\n'
            }
        }
    }
    return finalDisplay;
}

console.log(play())