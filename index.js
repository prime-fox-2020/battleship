class Ship {
  constructor(arr) {
    this._location = [...arr]
  }
}
class Battleship {
  constructor() {
    this._board = []
    this._enemyShips = []
    this._boardLength = 10
  }
  
  gameStart() {
    let col = 'ABCDEFGHIJ'
    for (let i = 1; i <= col.length; i++) {
      let row = []
      for (let j = 0; j < col.length; j++) {
        row.push(' ')
      }
      this._board.push(row)
    }
  }

  missileConverter(str) {
    const mapper = {
      1: 0, A: 0,
      2: 1, B: 1,
      3: 2, C: 2,
      4: 3, D: 3,
      5: 4, E: 4,
      6: 5, F: 5,
      7: 6, G: 6,
      8: 7, H: 7,
      9: 8, I: 8,
      10: 9, J: 9
    }
    
  }

  shoot(arr) {
    
  }

  //Hardcode :(
  addEnemies() {
    this._board[0][0] = '!'
    this._board[0][1] = '!'
    
    this._board[0][3] = '!'
    this._board[1][3] = '!'
    this._board[2][3] = '!'

    this._board[1][2] = '!'
    this._board[2][2] = '!'
    this._board[3][2] = '!'
    this._board[4][2] = '!'

    this._board[6][1] = '!'
    this._board[6][2] = '!'
    this._board[6][3] = '!'
    this._board[6][4] = '!'
    this._board[6][5] = '!'
  }

  displayBoard(bool = false, arr = this._board) {
    let output = '     A   B   C   D   E   F   G   H   I   J\n   +---------------------------------------+\n'

    for (let i = 0; i < this._boardLength; i++) {
      i + 1 > 9 ?
        output += `${i + 1} |`
        : output += ` ${i + 1} |`
      for (let j = 0; j < this._boardLength; j++) {
        bool === true ? 
          output += ` ${arr[i][j]} |` 
          : output += `   |`
      }
      i + 1 === arr.length ? 
        output += '\n   +---------------------------------------+\n'
        : output += '\n   |---|---|---|---|---|---|---|---|---|---|\n'
    }
    return output
  }
}

const game1 = new Battleship()
game1.gameStart()
console.log(game1.displayBoard())
game1.addEnemies()
console.log(game1.displayBoard(true))

// const argv = process.argv.filter(i => i.length === 2 || i.length === 3)
