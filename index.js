// Your code here

class battleshipBoard {
    constructor() {
        this.board = []
    }

    generateEmpty() {
        for (var i = 0; i < 10; i++) {
            let temp = []
            for (var j = 0; j < 10; j++) {
                let str = ' '
                temp.push(str)
            }
            this.board.push(temp)
        }
    }
    randomLine() {
        let random = ['vertical', 'horizontal']
        let index = Math.floor(Math.random() * 2)
        let line = random[index]
        return line
    }

    generateAircraft() {
        let random = this.randomLine()
        let index = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)]
        console.log(random)
        console.log(index)
        let choosenPlot = this.board[index[0]][index[1]]
        if (random == 'vertical') {
            if (choosenPlot == ' ') {
                //check if 5 ke samping kosong
                if (this.board[index[0]][index[1] + 1] === ' ' &&
                    this.board[index[0]][index[1] + 2] === ' ' &&
                    this.board[index[0]][index[1] + 3] === ' ' &&
                    this.board[index[0]][index[1] + 4] === ' ') {
                    this.board[index[0]][index[1]] = 'a'
                    this.board[index[0]][index[1] + 1] = 'a'
                    this.board[index[0]][index[1] + 2] = 'a'
                    this.board[index[0]][index[1] + 3] = 'a'
                    this.board[index[0]][index[1] + 4] = 'a'
                }
            } else {
                this.generateAircraft()
            }
        } else if (random == 'horizontal') {
            if (choosenPlot === ' ') {
                //check if 5 ke samping kosong
                if (this.board[index[0] + 1][index[1]] === ' ' &&
                    this.board[index[0] + 2][index[1]] === ' ' &&
                    this.board[index[0] + 3][index[1]] === ' ' &&
                    this.board[index[0] + 4][index[1]] === ' ') {
                    this.board[index[0]][index[1]] = 'a'
                    this.board[index[0] + 1][index[1]] = 'a'
                    this.board[index[0] + 2][index[1]] = 'a'
                    this.board[index[0] + 3][index[1]] = 'a'
                    this.board[index[0] + 4][index[1]] = 'a'
                }
            } else {
                this.generateAircraft()
            }
        }
    }
    generateBattleship() {
        let random = this.randomLine()
        let index = [Math.floor(Math.random() * 6), Math.floor(Math.random() * 6)]
        console.log(random)
        console.log(index)
        let choosenPlot = this.board[index[0]][index[1]]
        if (random == 'vertical') {
            if (choosenPlot == ' ') {
                //check if 4 ke samping kosong
                if (this.board[index[0]][index[1] + 1] === ' ' &&
                    this.board[index[0]][index[1] + 2] === ' ' &&
                    this.board[index[0]][index[1] + 3] === ' ') {
                    this.board[index[0]][index[1]] = 'b'
                    this.board[index[0]][index[1] + 1] = 'b'
                    this.board[index[0]][index[1] + 2] = 'b'
                    this.board[index[0]][index[1] + 3] = 'b'
                }
            } else {
                this.generateBattleship()
            }
        } else if (random == 'horizontal') {
            if (choosenPlot === ' ') {
                //check if 4 ke samping kosong
                if (this.board[index[0] + 1][index[1]] === ' ' &&
                    this.board[index[0] + 2][index[1]] === ' ' &&
                    this.board[index[0] + 3][index[1]] === ' ') {
                    this.board[index[0]][index[1]] = 'b'
                    this.board[index[0] + 1][index[1]] = 'b'
                    this.board[index[0] + 2][index[1]] = 'b'
                    this.board[index[0] + 3][index[1]] = 'b'
                }
            } else {
                this.generateBattleship()
            }
        }

    }
    generateCruiser() {
        let random = this.randomLine()
        let index = [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)]
        console.log(random)
        console.log(index)
        let choosenPlot = this.board[index[0]][index[1]]
        if (random == 'vertical') {
            if (choosenPlot == ' ') {
                //check if 4 ke samping kosong
                if (this.board[index[0]][index[1] + 1] === ' ' &&
                    this.board[index[0]][index[1] + 2] === ' ') {
                    this.board[index[0]][index[1]] = 'c'
                    this.board[index[0]][index[1] + 1] = 'c'
                    this.board[index[0]][index[1] + 2] = 'c'
                }
            } else {
                this.generateCruiser()
            }
        } else if (random == 'horizontal') {
            if (choosenPlot === ' ') {
                //check if 4 ke samping kosong
                if (this.board[index[0] + 1][index[1]] === ' ' &&
                    this.board[index[0] + 2][index[1]] === ' ') {
                    this.board[index[0]][index[1]] = 'c'
                    this.board[index[0] + 1][index[1]] = 'c'
                    this.board[index[0] + 2][index[1]] = 'c'

                }
            } else {
                this.generateCruiser()
            }
        }
    }
    generateDestroyer(){
        let random = this.randomLine()
        let index = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
        console.log(random)
        console.log(index)
        let choosenPlot = this.board[index[0]][index[1]]
        if (random == 'vertical') {
            if (choosenPlot == ' ') {
                //check if 4 ke samping kosong
                if (this.board[index[0]][index[1] + 1] === ' ') {
                    this.board[index[0]][index[1]] = 'd'
                    this.board[index[0]][index[1] + 1] = 'd'
                }
            } else {
                this.generateDestroyer()
            }
        } else if (random == 'horizontal') {
            if (choosenPlot === ' ') {
                //check if 4 ke samping kosong
                if (this.board[index[0] + 1][index[1]] === ' ' ) {
                    this.board[index[0]][index[1]] = 'd'
                    this.board[index[0] + 1][index[1]] = 'd'

                }
            } else {
                this.generateDestroyer()
            }
        }
    }
    attack(inputOne,inputTwo){
        let attackIndex = [inputOne, inputTwo]
        console.log(`attacking ship in coordinate ${attackIndex[0]},${attackIndex[1]}`)
        if(this.board[attackIndex[0]][attackIndex[1]] == 'a'){
            console.log('you have hit an enemy Aircraft Carrier! ')
        }
        if(this.board[attackIndex[0]][attackIndex[1]] == 'b'){
            console.log('you have hit an enemy Battleship!')
        }
        if(this.board[attackIndex[0]][attackIndex[1]] == 'c'){
            console.log('you have hit an enemy Cruiser!')
        }
        if(this.board[attackIndex[0]][attackIndex[1]] == 'd'){
            console.log('you have hit an enemy Destroyer')
        }
        if(this.board[attackIndex[0]][attackIndex[1]] == ' '){
            console.log('you missed the enemy ship!')
        }
    }
}

let battleship = new battleshipBoard

battleship.generateEmpty()
battleship.generateAircraft()
battleship.generateCruiser()
battleship.generateDestroyer()
battleship.generateBattleship()
battleship.attack(5,3)
console.log(battleship.board)
