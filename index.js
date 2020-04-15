class Fleets {
  constructor(size, pos) {
    this.size = size
    this.pos = pos
    this.position = ''
  }
  
  createFleets(set = 1) {
    let ships = []
    for (let i = 0; i < set; i++) {
      ships.push(new AircraftCarrier)
      ships.push(new Battleship)
      ships.push(new Cruiser)
      ships.push(new Destroyer)
    }
    return ships
  }
}

class AircraftCarrier extends Fleets {
  constructor() {
    super()
    this.size = 5
    this.symbol = '!'
  }
}

class Battleship extends Fleets {
  constructor() {
    super()
    this.size = 4
    this.symbol = '!'
  }
}

class Cruiser extends Fleets {
  constructor() {
    super()
    this.size = 3
    this.symbol = '!'
  }
}

class Destroyer extends Fleets {
  constructor() {
    super()
    this.size = 2
    this.symbol = '!'
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
    let roll = Math.random()*1;
    if (roll < 0.5) {
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
          console.log("You miss the enemy ship")
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
      console.log("Good Job, try again?")
    }
  }
}

const enemyFleets = new Fleets().createFleets(1)
const sea = new Board(10)

const play = new Play(enemyFleets, sea)

play.set()
play.attack()