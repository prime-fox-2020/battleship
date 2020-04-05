// Your code here
class Fleet {
    constructor(size, pos) {
        this.size = size
        this._pos = pos
        this._position = ''
    }
    get pos() {
        return this._pos
    }
    set pos(param) {
        this._pos = param
    }
    get position() {
        return this._position
    }
    set position(param) {
        this._position = param
    }

    createFleets(set = 1) {
        let fleets = []
        for (let i = 0; i < set; i++) {
            fleets.push(new AircraftCarrier)
            fleets.push(new Battleship)
            fleets.push(new Cruiser)
            fleets.push(new Destroyer)
        }
        return fleets
    }
}

class AircraftCarrier extends Fleet {
    constructor() {
        super()
        this.size = 5
        this.symbol = '#'
    }
}

class Battleship extends Fleet {
    constructor() {
        super()
        this.size = 4
        this.symbol = '$'
    }
}

class Cruiser extends Fleet {
    constructor() {
        super()
        this.size = 3
        this.symbol = '*'
    }
}

class Destroyer extends Fleet {
    constructor() {
        super()
        this.size = 2
        this.symbol = '%'
    }
}

class Board {
    constructor(size) {
        this.size = size
        this._board = this.createBoard()
    }
    get board() {return this._board}
    set board(param) {this._board = param}

    createBoard() {
        const board = []
        for (let row = 0; row < this.size; row++) {
            const temp = []
            for (let col = 0; col < this.size; col++) {
                temp.push(' ')
            }
            board.push(temp)
        }
        return board
    }
}

class Play {
    constructor(fleets, arena) {
        this.fleets = fleets
        this.arena = arena
    }
    
    target(ship, coordinate, position) {
        const coord = this.checkCoor(coordinate)
        const row = coord[0]
        const col = coord[1]

        if (position == 'vertical') {
            let check = true
            for (let i = 0; i < ship.size; i++) {
                if (this.arena.board[row + i] == undefined) {
                    return false
                }
                if (this.arena.board[row + i][col - 1] != ' ') {
                    check = false
                    return false
                }
            }
            
            if (!check) {
                for (let i = 0; i < ship.size; i++) {
                    this.arena.board[row + i][col - 1] = ship.symbol
                }
                ship.pos = coordinate
                ship.position = 'vertical'
                return true
            }
        } else {

            let check = false
            for (let i = 0; i < ship.size; i++) {
                if (this.arena.board[row] == undefined) {
                    return false
                }
                if (this.arena.board[row][col - 1 + i] != ' ') {
                    check = false
                    return false
                }
            }

            if (!check) {
                for (let i = 0; i < ship.size; i++) {
                    this.arena.board[row][col - 1 + i] = ship.symbol
                }
                ship.pos = coordinate
                ship.position = 'horizontal'
                return true
            }
        }
    }
    
    checkCoor(coordinate) {
        const huruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let row = coordinate[0]
        const col = Number(coordinate.substr(1))
        for (let i in huruf) {
            if (huruf[i] == row) {
                row = Number(i)
                break
            }
        }
        return [row, col]
    }

    coordinate() {
        let row = Math.floor(Math.random() * 10)
        const huruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        row = huruf[row]
        const col = Math.ceil(Math.random() * 10)
        return row + col
    }
    
    position() {
        const roll = Math.ceil(Math.random()*2)
        if (roll < 2) {
            return 'horizontal'
        } else {
            return 'vertical'
        }
    }

    set() {
        for (let fleet of this.fleets) {
            let set = false
            while (!set) {
                const coordinate = this.coordinate()
                const position = this.position()
                set = this.target(fleet, coordinate, position)
            }
        }
    }
    
    printBoard() {
        const huruf = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let top = "    "
        let bottom = "    "
        for (let i = 0; i < this.arena.size; i++) {
            if (i < 10) {
                top += " "
            }
            top += (i + 1) + "  "
            bottom += "----"
        }
        console.log(top)
        console.log(bottom)
        for (let a = 0; a < this.arena.size; a++) {
            let baris = "   |---|---|---|---|---|---|---|---|---|---|"
            let str = " "
            str += huruf[a] + " |"
            for (let b = 0; b < this.arena.size; b++) {
                str += " " + this.arena.board[a][b] + " |"
            }
            console.log(str)
            if (a + 1 < this.arena.size) {
                console.log(baris)
            }
        }
        console.log(bottom)
    }
    
    attack() {
        let input = process.argv
        let counter = 0
        for (let i = 2; i < input.length; i++) {
            const coord = this.checkCoor(input[i])
            const row = coord[0]
            const col = coord[1]
            if(row >= 0 && row <= 9 && col >= 1 && col <= 10) {
                if (this.arena.board[row][col - 1] != ' ') {
                let enemy = ''
                if (this.arena.board[row][col - 1] == '#') {
                    enemy = "Aircraft Carrier"
                } else if (this.arena.board[row][col-1] == '$') {
                    enemy = "Battleship"
                } else if (this.arena.board[row][col-1] == '*') {
                    enemy = "Cruiser"
                } else if (this.arena.board[row][col-1] == '%') {
                    enemy = "Destroyer"
                }
                counter++
                console.log(`You hit the enemy ship ${enemy}`)
                this.arena.board[row][col - 1] = 'X'
                } else {
                    console.log("Oops, you miss")
                    this.arena.board[row][col - 1] = '/'
                }
            } else {
                console.log('Invalid Input')
            }       
        }

        this.printBoard()
        if (counter == this.fleets.length){
            console.log("Congratulation you destroy all of enemy unit")
        } else if (counter > 0) {
            console.log(`You destroyed ${counter} enemy`)
        } else {
            console.log("Thank you for playing, please try again")
        }
    }
}

const enemy = new Fleet().createFleets(1)
const arena = new Board(10)
const play = new Play(enemy, arena)

play.set()
play.attack()

