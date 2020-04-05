// Your code here
let emptyBoard = [
    ['x',1,2,3,4,5,6,7,8,9,10],
    ['a',0,0,0,0,0,0,0,0,0,0],
    ['b',0,0,0,0,0,0,0,0,0,0],
    ['c',0,0,0,0,0,0,0,0,0,0],
    ['d',0,0,0,0,0,0,0,0,0,0],
    ['e',0,0,0,0,0,0,0,0,0,0],
    ['f',0,0,0,0,0,0,0,0,0,0],
    ['g',0,0,0,0,0,0,0,0,0,0],
    ['h',0,0,0,0,0,0,0,0,0,0],
    ['i',0,0,0,0,0,0,0,0,0,0],
    ['j',0,0,0,0,0,0,0,0,0,0],
]

function randomizer(ships) {
    let shipTypes = [5, 4, 3, 2]
    for (let k = 0; k < shipTypes.length; k++) {
        let check = true
        while (check) {
            let x = Math.round(Math.random() * 9) + 1
            let y = Math.round(Math.random() * 9) + 1
            let direction = Math.round(Math.random())
            if (direction == 0 && y + shipTypes[k] <= ships.length) {
                for (let i = 0; i < ships.length; i++) {
                    for (let j = 0; j < ships[i].length; j++) {
                        if (x == i && y == j) {
                            let check2 = true
                            for (let n = 0; n < shipTypes[k]; n++) {
                                if (ships[i][j + n] != ' ') {
                                    check2 = false
                                    break
                                }
                            }
                            if (check2) {
                                for (let n = 0; n < shipTypes[k]; n++) {
                                    ships[i][j + n] = shipTypes[k]
                                }
                                check = false
                            }
                        }
                    }
                }
            } else if (direction == 1 && x + shipTypes[k] <= ships.length) {
                for (let i = 0; i < ships.length; i++) {
                    for (let j = 0; j < ships[i].length; j++) {
                        if (x == j && y == i) {
                            let check2 = true
                            for (let n = 0; n < shipTypes[k]; n++) {
                                if (ships[j + n][i] != ' ') {
                                    check2 = false
                                    break
                                }
                            }
                            if (check2) {
                                for (let n = 0; n < shipTypes[k]; n++) {
                                    ships[j + n][i] = shipTypes[k]
                                }
                                check = false
                            }
                        }
                    }
                }
            }
        }
    }
    return ships
}

let battleBoard = randomizer(emptyBoard)

function horizontalCheck (letter){
    let dict = ['a','b','c','d','e','f','g','h','i','j']
    for (let i = 0; i < dict.length; i++){
        if (letter == dict[i]){
            return i+1
        }  
    }
}

function bombDrop (board, location){
    let coor = location.split('')
    let horizontal = horizontalCheck(coor[0])
    let vertikal = parseInt(coor.slice(1))
    if (board[horizontal][vertikal] != 0){
        board[horizontal][vertikal] = '+'
        return `Kamu telah berhasil menembak kapal musuh!`
    }
    board[horizontal][vertikal] = '/'
    return 'Tembakanmu meleset!'
}

// console.log(bombDrop(battleBoard, 'i5'))
console.log(bombDrop(battleBoard, process.argv[2]))
console.log(battleBoard)