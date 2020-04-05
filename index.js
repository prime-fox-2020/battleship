// Your code here

const fleet = [
    {ship : 'Aircraft Carrier', size : 5, tag: 'A' ,health: 5 },
    {ship : 'Battleship', size : 4, tag: 'B' ,health: 4 },
    {ship : 'Cruiser', size : 3, tag: 'C' ,health: 3 },
    {ship : 'Destroyer', size : 2, tag: 'D' ,health: 2 }
]
const dict = 'ABCDEFGHIJ'

let bullet = process.argv.slice(2)

function createBoard(){
    let board = []

    for (let i = 0; i<11; i++){
        let row = Array(11).fill(' ')
        board.push(row)
        if (i>0){
            board[i][0] = dict[i-1]
        }
        if (i === 0){
            for (let j = 1; j<11; j++){
                board[i][j] = j
            }
        }
    }
    return board
}

function shipPosition(){
    let rows = Math.ceil(Math.random()*11)
    let cols = Math.ceil(Math.random()*11)
    return [rows, cols]
}

function shipDirection(){
    const direct = ['horizontal','vertical']
    return direct[Math.round(Math.random())]
}

function checkShipVertical(shipPos, size, board){
    let row = shipPos[0]
    let col = shipPos[1]

    if(row + size > 10){
        return false
    }
    for (let i = row; i<row + size; i++){
        if (board[i][col] !== ' '){
            return false
        }
    }
    return true
}

function checkShipHorizontal(shipPos, size, board){
    let row = shipPos[0]
    let col = shipPos[1]

    if(col + size > 10){
        return false
    }
    for (let i = col; i<col + size; i++){
        if (board[i][row] !== ' '){
            return false
        }
    }
    return true
}

function randomizeShipPlacing(board){
    let shipPlaced = 0
    while (shipPlaced < fleet.length){
        let size = fleet[shipPlaced].size
        let shipPos = shipPosition()
        let direction = shipDirection()
        let isPlaced = (direction === 'vertical') ? checkShipVertical(shipPos, size, board) :
        checkShipHorizontal(shipPos,size, board)
        if (isPlaced){
            if (direction === 'vertical'){
                for (let i = shipPos[0]; i<shipPos[0] + size; i++){
                    board[i][shipPos[1]] = fleet[shipPlaced].tag
                }
            } else {
                for (let j = shipPos[0]; j<shipPos[0] + size; j++){
                    board[shipPos[0]][j] = fleet[shipPlaced].tag
                }
            }
            shipPlaced++
        }
    }
}

function checkBombList(bullet){
    let bombList = []
    for (let a = 0; a<bullet.length; a++){
        let rowPos = ''
        let colPos = Number(bullet[a][1])
        for (let b = 0; b<dict.length; b++){
            if (dict[b] === bullet[a][0]){
                rowPos = b + 1
            }
            
        }
        bombList.push({rowPos, colPos})    
    }
    return bombList
}

function dropBomb(board, bombList){
    for (let i = 0; i<bombList.length; i++){
        let x = bombList[i].rowPos
        let y = bombList[i].colPos
        if (board[x][y] === ' ' || board[x][y] === '/'){
            board[x][y] = '/'
        } else {
            for (let i = 0; i<fleet.length; i++){
                if(fleet[i].tag === board[x][y]){
                    fleet[i].health--
                }
            }
            board[x][y] = 'X'
        }
    }
}

function displayResultBattleship(){
    for (let i = 0; i<fleet.length; i++){
        let health = Math.round(fleet[i].health / fleet[i].size * 100)
        console.log(`${fleet[i].ship} remaining health is ${health}%`)
    }
}

function play(){
    const board = createBoard()
    randomizeShipPlacing(board)
    const bombList = checkBombList(bullet)
    dropBomb(board, bombList)
    for (let key in board){
        console.log(board[key].join('|') + '|')
    }
    displayResultBattleship()
}

play()