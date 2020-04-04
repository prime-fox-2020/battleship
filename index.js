// Your code here
let peluru = process.argv.slice(2).splice(' ')
// console.log('peluru: ', peluru);

let semuaPeluru = []
for (let i = 0; i < peluru.length; i++) {
    semuaPeluru.push([peluru[i][0], peluru[i][1]])
}
console.log('semuaPeluru: ', semuaPeluru);

let banyakBaris = 10
let banyakKolom = 10

function board(baris, kolom) {
    let board = []
    let kamus = 'ABCDEFGHIJ'
    for (let i = 0; i <= baris; i++) {
        let isiTiapBaris = []
        for (let j = 0; j <= kolom; j++) {
            if (i == 0) {
                if (j == 0) {
                    isiTiapBaris.push(' X ')
                } else {
                    isiTiapBaris.push(j)
                }
            } else if (i != 0 && j == 0) {
                isiTiapBaris.push(kamus[i - 1])
            } else {
                isiTiapBaris.push(' ')
            }
        }
        board.push(isiTiapBaris)
    }
    return board
}

let boardBattleShip = board(banyakBaris, banyakKolom)
// console.table(boardBattleShip);

function fillShip(boardBattleShip) {
    let banyakShip = [5, 4, 3, 2]
    for (let k = 0; k < banyakShip.length; k++) {
        let check = true
        while (check) {
            let positionI = Math.round(Math.random() * 9) + 1
            let positionJ = Math.round(Math.random() * 9) + 1
            let arah = Math.round(Math.random())
            // console.log('arah: ', arah,positionI,positionJ);
            if (arah == 0 && positionJ + banyakShip[k] <= boardBattleShip.length) { // vertikal
                // console.log('arah: ', arah,positionI,positionJ,positionJ+banyakShip[k]);
                for (let i = 0; i < boardBattleShip.length; i++) {
                    for (let j = 0; j < boardBattleShip[i].length; j++) {
                        if (positionI == i && positionJ == j) {
                            // console.log('positionI: ', positionI, 'positionJ: ', positionJ);
                            let checkKosong = true
                            for (let n = 0; n < banyakShip[k]; n++) {
                                if (boardBattleShip[i][j + n] != ' ') {
                                    checkKosong = false
                                    break
                                }
                            }
                            if (checkKosong) {
                                for (let n = 0; n < banyakShip[k]; n++) {
                                    boardBattleShip[i][j + n] = banyakShip[k]
                                }
                                check = false
                            }
                        }
                    }
                }
            } else if (arah == 1 && positionI + banyakShip[k] <= boardBattleShip.length) {
                for (let i = 0; i < boardBattleShip.length; i++) {
                    for (let j = 0; j < boardBattleShip[i].length; j++) {
                        if (positionI == j && positionJ == i) {
                            let checkKosong = true
                            // console.log('checkKosong: ', checkKosong);
                            for (let n = 0; n < banyakShip[k]; n++) {
                                if (boardBattleShip[j + n][i] != ' ') {
                                    // console.log('positionI: >>', positionI, 'positionJ: ', positionJ);
                                    checkKosong = false
                                    break
                                }
                            }
                            if (checkKosong) {
                                for (let n = 0; n < banyakShip[k]; n++) {
                                    boardBattleShip[j + n][i] = banyakShip[k]
                                }
                                check = false
                            }
                        }
                    }
                }
            }
        }
    }
    return boardBattleShip
}

// console.table(fillShip(boardBattleShip));
let boardShip = fillShip(boardBattleShip)
console.table(boardShip);

function serangKapal(peluru, boardShip) {

    let count = 0
    console.log('\n Shoot on target');
    for (let k = 0; k < peluru.length; k++) {
        for (let i = 0; i < boardShip.length; i++) {
            for (let j = 0; j < boardShip[i].length; j++) {
                if (boardShip[i][j] > 0) {
                    if (peluru[k][0] == boardShip[i][0] && peluru[k][1] == boardShip[0][j]) {
                        console.log(peluru[k][0], j);
                        count += boardShip[i][j]
                        boardShip[i][j] = '*'
                    }

                }
            }
        }
    }
    console.table(boardShip)
    return `Total damege your attac is ${count}`
}

console.clear();
console.log(serangKapal(semuaPeluru, boardShip));

