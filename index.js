// Your code here
"use strict";
// Buat class Ship untuk memasukan atribut dari armada
class Ships {
    constructor(name, size, symbol) {
        this.name = name
        this.size = size
        this.symbol = symbol
    }
}
// Class utama BattleShip 
class BattleShip {
    constructor(sizeBoard) {
        this.sizeBoard = sizeBoard
        this.array = []
        this._target = []
    }
    get target() {
        return this._target
    }
    addEnemy(fleet) {
        let dict = 'ABCDEFGHIJ'
        let flag = false
        let rngA
        let rngB
        while (!flag) {
            rngA = Math.floor(Math.random() * (this.sizeBoard - fleet.size + 1)) + 1
            rngB = Math.floor(Math.random() * 10) + 1
            flag = true
            for (let i = rngA; i < rngA + fleet.size; i++) {
                if (this.array[rngB][i] !== ' ' || this.array[i][rngB] !== ' ') {
                    flag = false
                    break
                }
            }
        }
        let arah = Math.round(Math.random())
        if (arah === 0) {
            for (let i = rngA; i < rngA + fleet.size; i++) {
                this.array[rngB][i] = `${fleet.symbol}`
                this._target.push(`${dict[rngB - 1]}${i}`)
            }
        }
        else {
            for (let i = rngA; i < rngA + fleet.size; i++) {
                this.array[i][rngB] = `${fleet.symbol}`
                this._target.push(`${dict[i - 1]}${rngB}`)
            }
        }
    }
    initBoard() {
        let dict = 'ABCDEFGHIJ'
        for (let i = 0; i <= this.sizeBoard; i++) {
            let temp = []
            for (let j = 0; j <= this.sizeBoard; j++) {
                temp.push(' ')
            }
            this.array.push(temp)
        }
        for (let i = 1; i <= this.sizeBoard; i++) {
            this.array[i][0] = dict[i - 1]
            this.array[0][i] = i
        }
        return this
    }
    showBoard() {
        console.log();
        let temp = ''
        for (let i = 0; i < this.array.length; i++) {
            if (i === 0) {
                temp += '|' + this.array[i].join('|') + '|\n'
                console.log("+----------------------+");
            }
            else {
                temp += '|' + this.array[i].join('|') + ' |\n'

            }
        }
        return temp
    }
    // showBoard() {
    //     console.log();
    //     for (let i = 0; i < this.array.length; i++) {
    //         let temp = ''
    //         if (i !== 0) {
    //             console.log("+----------------------+");
    //         }
    //         for (let j = 0; j < this.array.length; j++) {
    //             if (i === 0) {
    //                 temp += `${this.array[i][j]}`
    //             }
    //             else {
    //                 temp += `${this.array[i][j]} |`
    //             }
    //         }
    //         console.log(temp);
    //     }
    //     console.log("+----------------------+");

    // }
    attackEnemy() {
        let score = 0
        const inputPlayer = process.argv
        for (let i = 2; i < inputPlayer.length; i++) {
            let flag = false
            let dict = 'ABCDEFGHIJ'
            let y = parseInt(inputPlayer[i][1])
            let x
            for (let k = 0; k < dict.length; k++) {
                if (inputPlayer[i][0] === dict[k]) {
                    x = parseInt(k + 1)
                }
            }
            if (x === 10) {
                y = 10
            }
            for (let j = 0; j < this._target.length; j++) {
                if (inputPlayer[i] === this._target[j]) {
                    score++
                    flag = true
                    this.array[x][y] = 'X'
                    break
                }
                else {
                    this.array[x][y] = 'O'
                }
            }
            if (flag) {
                console.log(`${inputPlayer[i]} attack X hit enemy ship ! \n`)
            }
            else {
                console.log(`${inputPlayer[i]} Attack O missed enemy ship. \n`)
            }
        }
        if (score === 0) {
            console.log(`Wowww, your score is 0 :(\n`)
        }
        else {
            console.log(`Good Job! Your score is ${score}\n`)
        }
    }

    game() {

        this.attackEnemy()
        console.log(this.showBoard())
    }
}

var play = new BattleShip(10)
//init play game
play.initBoard()
play.addEnemy(new Ships('Aircraft carrier', 5, '◆'))
play.addEnemy(new Ships('Battleship', 4, '◇'))
play.addEnemy(new Ships('Cruiser', 3, '❖'))
play.addEnemy(new Ships('Destroyer', 2, '◈'))
//attack begins
play.game()