// Your code here
function generateBoard(){
    let dict = 'ABCDEFGHIJ'
    let board = []

    for(let i = 0; i <= 10; i++){
        let oneRow = []
        for(let j = 0; j <= 10; j++){
            if(i === 0){
                if(j === 0){
                    oneRow.push(' ')
                }else{
                    oneRow.push(j)
                }
            }else if(i !== 0 && j === 0){
                oneRow.push(dict[i - 1])
            }else{
                oneRow.push(' ')
            }
        }
        board.push(oneRow)
    }
    return board
}

function generatePos(){
    return Math.round(Math.random() * 9) + 1
}

function generateOrientation(){
    let orientation = Math.round(Math.random())
    if(orientation === 1){
        orientation = 'horizontal'
    }else{
        orientation = 'vertical'
    }
    return orientation
}

// function putShipVertically(ship){

// }

// function putShipHorizontally(ship){

// }


function generateShips(board){
    let ships = [5, 4, 3, 2]

    for (let n = 0; n < ships.length; n++) {
        let positionIsAvailable = true

        while(positionIsAvailable){
            let posRow = generatePos()
            let posCol = generatePos()
            let orientation = generateOrientation()

            if(orientation === 'horizontal' && ships[n] + posCol <= board.length){
                for(let i = 0; i < board.length; i++){
                    for(let j = 0; j < board[i].length; j++){
                        if(posRow === i && posCol === j){
                            let isEmpty = true
                            for(let k = 0; k < ships[n]; k++){
                                if(board[i][j + k] !== ' '){
                                    isEmpty = false
                                    break
                                }
                            }
                            if(isEmpty){
                                for(let k = 0; k < ships[n]; k++){
                                    board[i][j + k] = ships[n]
                                }
                                positionIsAvailable = false
                            }
                        }
                    }
                }
            }else if(orientation == 'vertical' && ships[n] + posRow <= board.length){
                for(let i = 0; i < board.length; i++){
                    for(let j = 0; j < board[i].length; j++){
                        if(posRow === j && posCol === i){
                            let isEmpty = true
                            for(let k = 0; k < ships[n]; k++){
                                if(board[j + k][i] !== ' '){
                                    isEmpty = false
                                    break
                                }
                            }
                            if(isEmpty){
                                for(let k = 0; k < ships[n]; k++){
                                    board[j + k][i] = ships[n]
                                }
                                positionIsAvailable = false
                            }
                        }
                    }
                }
            }
        }
    }
    return board
}

function generateBullets(input){
    let bullets = []
    for (let i = 0; i < input.length; i++) {
        bullets.push([input[i][0], input[i][1]])
    }
    return bullets
}


function attack(bullets, board) {
    let ships = {
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2
    } //kapal 5, darah 5. dst.
    let sinkedShipsCounter = 0

    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < board.length; j++) {
            for (let k = 0; k < board[j].length; k++) {
                if (board[j][k] > 0 ) {
                    if(bullets[i][0] == board[j][0] && bullets[i][1] == board[0][k]){
                        let ship = board[j][k]
                        ships[ship]--
                        board[j][k] = 'X'
                    }
                }
            }
        }
    }

    console.table(board)
    
    for(i in ships){
        if(ships[i] == 0){
            sinkedShipsCounter++
        }
    }

    console.log(ships)
    return `Kapal tenggelam sebanyak ${sinkedShipsCounter}`
}

function play(){
    let input = process.argv.slice(2).splice(' ')
    let bullets = generateBullets(input)
    let gameBoard = generateShips(generateBoard())
    
    console.log(attack(bullets, gameBoard))
    return 0 
}

play()

//  node index.js A1 A2 A3 A4 A5 A6 A7 A8 A9 B1 C1 D1 E1 F1 G1 H1 I1 J1 B2 C2 D2 E2 F2 G2 H2 I2 J2 B3 C3 D3 E3 F3 G3 H3 I3 J3