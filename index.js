// Your code here
function board(rows, columns) {
    let board = []
    let dictionary = 'ABCDEFGHIJ'
    for (let i = 0; i <= rows; i++) {
        let rows = []
        for (let j = 0; j <= columns; j++) {
            if (i == 0) {
                if (j == 0) {
                    rows.push(' ')
                } else {
                    rows.push(j)
                }
            } else if (i != 0 && j == 0) {
                rows.push(dictionary[i - 1])
            } else {
                rows.push(' ')
            }
        }
        board.push(rows)
    }
    return board
}


function randomShips(battleArea) {
    let numberOfShips = [5, 4, 3, 2]
    for (let k = 0; k < numberOfShips.length; k++) {
        let check = true
        while (check) {
            let posI = Math.round(Math.random() * 9) + 1
            let posJ = Math.round(Math.random() * 9) + 1
            let direction = Math.round(Math.random())
            if (direction == 0 && posJ + numberOfShips[k] <= battleArea.length) {
                for (let i = 0; i < battleArea.length; i++) {
                    for (let j = 0; j < battleArea[i].length; j++) {
                        if (posI == i && posJ == j) {
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
            } else if (direction == 1 && posI + numberOfShips[k] <= battleArea.length) {
                for (let i = 0; i < battleArea.length; i++) {
                    for (let j = 0; j < battleArea[i].length; j++) {
                        if (posI == j && posJ == i) {
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


function bulletsAttack(bullets, filled, hitArea) {
    let hitCount = 0
    for (let k = 0; k < bullets.length; k++) {
        for (let i = 0; i < filled.length; i++) {
            for (let j = 0; j < filled[i].length; j++) {
                if (filled[i][j] > 0 ) {
                    if(bullets[k][0] == filled[i][0] && bullets[k][1] == filled[0][j]){
                        hitArea.push([bullets[k][0], String(j)].join(''))
                        filled[i][j] = '#'
                        hitCount += 1
                    }
                }
            }
        }
    }
    console.table(filled)
    console.log('\nArea yang tertembak: ' + hitArea.join(', '));
    return `\nJumlah yang tepat sasaran: ${hitCount}`
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

let battleArea = board(10, 10)
let filledBoard = randomShips(battleArea)

console.log('\nArea serang yang telah dipilih: ' +  string);
console.log(bulletsAttack(allBullets, filledBoard, []));