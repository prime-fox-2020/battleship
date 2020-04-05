class Battleship {
  constructor() {
    this.board = this.createBoard();
    this.target = [];
    this._right = [];
    this._miss = [];
  }

  createBoard() {
    //Membuat board
    let board = [];
    
    for (let i = 0; i < 10; i++) {
      let temp = [];
      for (let j = 0; j < 10; j++) {
        temp.push(' ');
      }
      board.push(temp);
    }

    this.randomShip(board, 2);
    this.randomShip(board, 3);
    this.randomShip(board, 4);
    this.randomShip(board, 5);

    return board;
  }
  
  randomShip(board, len) {
    let maxIdx = 9;
      switch (len) {
        case 3:
          maxIdx = 8;
          break;
        case 4:
          maxIdx = 7;
          break;
        case 5:
          maxIdx = 6;
    }
    
    let check = true;
    while (check) {
      let flag = true;
      let ranRow = Math.floor(Math.random()*maxIdx);
      let ranCol = Math.floor(Math.random()*maxIdx);
      if (Math.random() < 0.5) {
        for (let i = 0; i < len; i++) {
          if (board[ranRow][ranCol+i] == 'O') {
            flag = false;
            break;
          }
        }
        if (flag) {
          for (let i = 0; i < len; i++) {
            board[ranRow][ranCol+i] = 'O';
          }
          check = false;
        }
      } else {
        for (let i = 0; i < len; i++) {
          if (board[ranRow+i][ranCol] == 'O') {
            flag = false;
            break;
          }
        }
        if (flag) {
          for (let i = 0; i < len; i++) {
            board[ranRow+i][ranCol] = 'O';
          }
          check = false;
        }
      }
    }
  }

  printBoard() {
    let board = this.board;
    let strBoard = '     A   B   C   D   E   F   G   H   I   J\n';
    strBoard += '   +---------------------------------------+\n';
    for (let i = 0; i < board.length; i++) {
      if (i != 9) strBoard += ' ';
      strBoard += `${i+1} |`;
      for (let j = 0; j < board.length; j++) {
        strBoard += ` ${board[i][j]} |`;
      }
      strBoard += '\n   |---|---|---|---|---|---|---|---|---|---|\n';
    }
    strBoard += '   +---------------------------------------+';
    return strBoard;
  }

  inputTarget(target) {
    this.target = target;
  }

  attack() {
    let board = this.board;
    let target = this.target;
    let alpha = 'ABCDEFGHIJ';

    for (let i = 0; i < target.length; i++) {
      let temp = target[i].split('');
      if (board[Number(temp[1])-1][alpha.indexOf(temp[0])] == 'O') {
        this._right.push(target[i]);
        board[Number(temp[1])-1][alpha.indexOf(temp[0])] = 'X';
      } else {
        this._miss.push(target[i]);
        board[Number(temp[1])-1][alpha.indexOf(temp[0])] = '/';
      }
    }

    this.board = board;
  }

  result() {
    console.log(`Tembakan tepat sasaran: ${this._right.length}, di ${this._right}\nTembakan Meleset: ${this._miss.length}, di ${this._miss}`);
  }
}


let battle = new Battleship();

//print board sebelum
console.log(battle.printBoard());

//mendapat input target dari process.argv
battle.inputTarget(process.argv.slice(2));
//melakukan penyerangan dengan memanggil method attack
battle.attack();
console.log('');

//print board sesudah
console.log(battle.printBoard());
//print hasil
battle.result();
