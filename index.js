class Fleet {
  constructor(){
    this.board = this.createBoard()
    this.target = []
    this.hit = []
    this.miss = []
  }

  createBoard(){
    let board = []
    for (let i = 0; i < 10; i++) {
      let temp = []
      for (let j = 0; j < 10; j++) {
        temp.push(' ')
      }
      board.push(temp)
    }
    return board
  }

  printBoard(){
    let board = this.board
    let strBoard = '     A   B   C   D   E   F   G   H   I   J\n'
    strBoard += '   +---------------------------------------+\n'
    for (let i = 0; i < board.length; i++) {
      if (i != 9) strBoard += ' '
      strBoard += `${i+1} |`
      for (let j = 0; j < board.length; j++) {
        strBoard += ` ${board[i][j]} |`
      }
      strBoard += `\n   |---|---|---|---|---|---|---|---|---|---|\n`
    }
    strBoard += '   -----------------------------------------'
    return strBoard
  }

  
}

let start = new Fleet()
// start.attack()
console.log(start.printBoard())