class Fleet{
    constructor(name, size, symbol){
        this.name = name
        this.size = size
        this.symbol = symbol
    }
}
class BattleShip{
    constructor(boardSize){
        this.boardSize = boardSize
        this.arr = []
        this._target = []
    }
    get target(){
        return this._target
    }
    addEnemy(fleet){
        let dict = 'ABCDEFGHIJ'
        let flag = false
        let rngA
        let rngB
        while(!flag){
            rngA = Math.floor(Math.random()*(this.boardSize-fleet.size+1)) + 1
            rngB = Math.floor(Math.random()*10)+1
            flag = true
            for(let i = rngA; i < rngA + fleet.size; i++){
                if(this.arr[rngB][i] !== ' ' || this.arr[i][rngB] !== ' '){
                    flag = false
                    break
                }
            }
        }
        let arah = Math.round(Math.random())
        if(arah === 0){
            for(let i = rngA; i < rngA + fleet.size; i++){
                this.arr[rngB][i] = `${fleet.symbol}`
                this._target.push(`${dict[rngB-1]}${i}`)
            }
        }
        else{
            for(let i = rngA; i < rngA + fleet.size; i++){
                this.arr[i][rngB] = `${fleet.symbol}`
                this._target.push(`${dict[i-1]}${rngB}`)
            }
        }
    }
    initBoard(){
        let dict = 'ABCDEFGHIJ'
        for(let i = 0; i <= this.boardSize; i++){
            let temp = []
            for(let j = 0; j <= this.boardSize; j++){
                temp.push(' ')
            }
            this.arr.push(temp)
        }
        for(let i = 1; i <= this.boardSize; i++){
            this.arr[i][0] = dict[i-1]
            this.arr[0][i] = i
        }
        return this
    }
    showBoard(){
        let temp = ''
        for(let i = 0; i < this.arr.length; i++){
            temp += '|' + this.arr[i].join('|') + '\n'
        }
        return temp
    }
    attackEnemy(){
        let score = 0
        const inputPlayer = process.argv
        for(let i = 2; i < inputPlayer.length; i++){
            let flag = false
            for(let j = 0; j < game.target.length; j++){
                if(inputPlayer[i] === game.target[j]){
                    score++
                    flag = true
                    break
                }
            }
            if(flag){
                console.log(`${inputPlayer[i]} hit enemy ship !`)
            }
            else{
                console.log(`Attack missed.`)
            }
        }
        if(score === 0){
            console.log(`Sorry, your score is 0 :(`)
        }
        else{
            console.log(`Yeayy! Your score is ${score}`)
        }
    }
}


var game = new BattleShip(10)
game.initBoard()
game.addEnemy(new Fleet('Aircraft carrier', 5, '◆'))
game.addEnemy(new Fleet('Battleship', 4, '◇'))
game.addEnemy(new Fleet('Cruiser', 3, '❖'))
game.addEnemy(new Fleet('Destroyer', 2, '◈'))
console.log(game.showBoard())
game.attackEnemy()