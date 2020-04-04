/* Input -> n`ode index.js A8 B3 C2 G2 J9 H5 H7 F9 F10 I5 I7 C6 D6 */
let attack = process.argv.slice(2)
let huruf = 'ABCDEFGHIJ'

function generateBoard() {
    let result = []
    let temp = []
    for (let i = 0; i < 121; i++) {
        if (temp.length === 11) {
            result.push(temp)
            temp = []
            temp.push(' ')
        } else {
            temp.push(' ')
        }
    }
    result.push(temp)
    for (let i = 0; i < result[0].length; i++) {
        result[0][i] = String(i)
    }``
    for (let i = 1; i < result.length; i++) {
        result[i][0] = huruf[i - 1]
    }
    return result
}

let board = generateBoard()

function generateAircraft () {
    let random1 = [1,2,3,4,5,6]
    let random2 = [1,2,3,4,5,6]
    let x = random1[Math.floor(Math.random()*5)]
    let y = random2[Math.floor(Math.random()*5)]
    if(board[x][y] === ' '){
        let randomVerHor = Math.round(Math.random())
        if(randomVerHor === 0){
                board[x][y] = 'a'
                board[x+1][y] = 'a'
                board[x+2][y] = 'a'
                board[x+3][y] = 'a'
                board[x+4][y] = 'a'
        }else{
                board[x][y] = 'a'
                board[x][y+1] = 'a'
                board[x][y+2] = 'a'
                board[x][y+3] = 'a'
                board[x][y+4] = 'a'
        }    
    }else{
        generateAircraft ()
    } 
}

function generateBattleship () {

    let random1 = [1,2,3,4,5,6,7]
    let random2 = [1,2,3,4,5,6,7]
    let x = random1[Math.floor(Math.random()*6)]
    let y = random2[Math.floor(Math.random()*6)]

    if(
        board[x][y] === ' ' && 
        board[x+1][y] === ' ' &&
        board[x+2][y] === ' ' &&
        board[x+3][y] === ' ' &&
        board[x][y+1] === ' ' &&
        board[x][y+2] === ' ' &&
        board[x][y+3] === ' '
        ){

        let randomVerHor = Math.round(Math.random())
        if(randomVerHor === 0){
                board[x][y] = 'b'
                board[x+1][y] = 'b'
                board[x+2][y] = 'b'
                board[x+3][y] = 'b'
        }else{
                board[x][y] = 'b'
                board[x][y+1] = 'b'
                board[x][y+2] = 'b'
                board[x][y+3] = 'b'
        }
    }else{
        generateBattleship ()
    }
}

function generateCruiser () {

    let random1 = [1,2,3,4,5,6,7,8]
    let random2 = [1,2,3,4,5,6,7,8]
    let x = random1[Math.floor(Math.random()*7)]
    let y = random2[Math.floor(Math.random()*7)]

    if(
        board[x][y] === ' ' && 
        board[x+1][y] === ' ' &&
        board[x+2][y] === ' ' &&
        board[x][y+1] === ' ' &&
        board[x][y+2] === ' ' 
        ){
        let randomVerHor = Math.round(Math.random())
        if(randomVerHor === 0){
                board[x][y] = 'c'
                board[x+1][y] = 'c'
                board[x+2][y] = 'c'
        }else{
                board[x][y] = 'c'
                board[x][y+1] = 'c'
                board[x][y+2] = 'c'
        }
    }else{
        generateCruiser ()
    }
}

function generateDestroyer () {

    let random1 = [1,2,3,4,5,6,7,8,9]
    let random2 = [1,2,3,4,5,6,7,8,9]
    let x = random1[Math.floor(Math.random()*8)]
    let y = random2[Math.floor(Math.random()*8)]

    if(
        board[x][y] === ' ' && 
        board[x+1][y] === ' ' &&
        board[x][y+1] === ' ' 
        ){
        let randomVerHor = Math.round(Math.random())
        if(randomVerHor === 0){
                board[x][y] = 'd'
                board[x+1][y] = 'd'
        }else{
                board[x][y] = 'd'
                board[x][y+1] = 'd'
        }
    }else{
        generateDestroyer ()
    }
}

function userAttack () {

for(let i = 0 ; i< attack.length;i++){
    let targetBom = []
    for(let j = 0 ; j<huruf.length;j++){
        if(attack[i][0] === huruf[j]){
            targetBom.push(j+1)
            targetBom.push(Number(attack[i][1]))
        }
    }
    if(board[targetBom[0]][targetBom[1]] === ' '){
        board[targetBom[0]][targetBom[1]] = '/'
    }
    if(board[targetBom[0]][targetBom[1]] === 'a'){
        board[targetBom[0]][targetBom[1]] = 'X'
        console.log(`Aircraft carrier has been shot !!`)
    }
    if(board[targetBom[0]][targetBom[1]] === 'b'){
        board[targetBom[0]][targetBom[1]] = 'X'
        console.log(`Battleship has been shot !!`)
    }
    if(board[targetBom[0]][targetBom[1]] === 'c'){
        board[targetBom[0]][targetBom[1]] = 'X'
        console.log(`Cruiser has been shot !!`)
    }
    if(board[targetBom[0]][targetBom[1]] === 'd'){
        board[targetBom[0]][targetBom[1]] = 'X'
        console.log(`Destroyer has been shot !!`)
    }
    }
}

generateAircraft()
generateBattleship()
generateCruiser()
generateDestroyer()
userAttack ()

console.table(board)