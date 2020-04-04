// Your code here
function board(rows, columns) {
    let board = []
    let dictionary = 'ABCDEFGHIJ'
    for (let i = 0; i <= rows; i++) {
        let indexOfRows = []
        for (let j = 0; j <= columns; j++) {
            if (i == 0) {
                if (j == 0) {
                    indexOfRows.push(' ')
                } else {
                    indexOfRows.push(j)
                }
            } else if (i != 0 && j == 0) {
                indexOfRows.push(dictionary[i - 1])
            } else {
                indexOfRows.push(' ')
            }
        }
        board.push(indexOfRows)
    }
    return board
}

let battleArea = board(10, 10)

function makeRandomShips(battleArea) {
    let numberOfShips = [5, 4, 3, 2]
    for (let k = 0; k < numberOfShips.length; k++) {
        let check = true
        while (check) {
            let pos_I = Math.round(Math.random() * 9) + 1
            let pos_J = Math.round(Math.random() * 9) + 1
            let direction = Math.round(Math.random())
            if (direction == 0 && pos_J + numberOfShips[k] <= battleArea.length) {
                for (let i = 0; i < battleArea.length; i++) {
                    for (let j = 0; j < battleArea[i].length; j++) {
                        if (pos_I == i && pos_J == j) {
                            let empty = true
                            for (let n = 0; n < numberOfShips[k]; n++) {
                                if (battleArea[i][j + n] != ' ') {
                                    empty = false
                                    break
                                }
                            }
                            if (empty) {
                                for (let n = 0; n < numberOfShips[k]; n++) {
                                    battleArea[i][j + n] = numberOfShips[k]
                                }
                                check = false
                            }
                        }
                    }
                }
            } else if (direction == 1 && pos_I + numberOfShips[k] <= battleArea.length) {
                for (let i = 0; i < battleArea.length; i++) {
                    for (let j = 0; j < battleArea[i].length; j++) {
                        if (pos_I == j && pos_J == i) {
                            let empty = true
                            for (let n = 0; n < numberOfShips[k]; n++) {
                                if (battleArea[j + n][i] != ' ') {
                                    empty = false
                                    break
                                }
                            }
                            if (empty) {
                                for (let n = 0; n < numberOfShips[k]; n++) {
                                    battleArea[j + n][i] = numberOfShips[k]
                                }
                                check = false
                            }
                        }
                    }
                }
            }
        }
    }
    return battleArea
}

let filledBoard = makeRandomShips(battleArea)

function bulletsAttack(blts, filled, hitAreaArr) {
    let hitCount = 0
    for (let k = 0; k < blts.length; k++) {
        for (let i = 0; i < filled.length; i++) {
            for (let j = 0; j < filled[i].length; j++) {
                if (filled[i][j] > 0 ) {
                    if(blts[k][0] == filled[i][0] && blts[k][1] == filled[0][j]){
                        hitAreaArr.push([blts[k][0] ,String(j)].join(''))
                        hitCount += 1
                        filled[i][j] = '#'
                    }
                    
                }
            }
        }
    }
    console.table(filled)
    console.log('\nArea yang kena peluru: ' + hitAreaArr.join(', '));
    return `\nJumlah peluru yang tepat sasaran: ${hitCount}`
    
}

let bullets = process.argv.slice(2).splice(' ')

let allBullets = []
let string = ''
for (let i = 0; i < bullets.length; i++) {
    allBullets.push([bullets[i][0], bullets[i][1]])
    if (i !== bullets.length - 1) {
        string += bullets[i] + ', '
    } else {
        string += bullets[i]
    }
}

console.log('\nArea serang yang telah dipilih: ' +  string);

let hitArea = []
console.log(bulletsAttack(allBullets, filledBoard, hitArea));