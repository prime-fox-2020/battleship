

class Battleship {
  constructor(alphabet) {
    this.board = [];
    this.alphabet = "ABCDEFGHIJ";

  }

  createBoard() {
    for (let i = 0; i <= 10; i++) {
      let temp = [];
      for (let j = 0; j <= 10; j++) {
        temp.push(" ");
      }

      this.board.push(temp);
    }
    for(let i = 1; i <= 10; i++){
        this.board[0][0] = "index";
        this.board[0][i] = this.alphabet[i-1];
        this.board[i][0] = " " + i +" ";
    }

    return this.board;
  }

  showBoard(){
        let temp = ''
        for(let i = 0; i < this.board.length; i++){
            if(i === 0){
                temp += ' | ' + this.board[i].join(' | ') + '|\n'
            }
            else{
                temp += ' | ' + this.board[i].join(' | ') + ' |\n'
            }
        }
        return temp
    }

  generateShip() {
    let board = this.createBoard();
    let shipsSize = 5;
    let ships = [];

    while (shipsSize > 1) {
      let randomX = Math.floor((Math.random()*10)+1);//random ship position X
      let randomY = Math.floor((Math.random()*10)+1);//random ship position Y
      let temp = [];
      if ( randomX < 7 && randomY < 7) {
        for (let i = 0; i < shipsSize; i++) {
          if (randomX < randomY) {
              temp.push([randomX+i,randomY]);
            }
          else {
            temp.push([randomX,randomY+i]);
          }
        }
      }
      else if(randomX > 7 && randomY > 7) {
        for (let i = 0; i < shipsSize; i++) {
          if (randomX < randomY) {
              temp.push([randomX-i,randomY]);
            }
          else {
            temp.push([randomX,randomY-i]);
          }
        }
      }
      else if (randomX < 7) {
        for (let i = 0; i < shipsSize; i++) {
              temp.push([randomX+i,randomY]);
        }
      }
      else if (randomY < 7) {
        for (let i = 0; i < shipsSize; i++) {
              temp.push([randomX,randomY+i]);
        }
      }

      if (shipsSize < 5) {
        for (let i = 0; i < ships.length; i++) {
          for (let j = 0; j < ships[i].length; j++) {
            for (let k = 0; k < temp.length; k++) {
              if (temp[k][0] === ships[i][j][0] && temp[k][1] === ships[i][j][1] ) {
                continue;
              }
            }
          }
        }
      }
      ships.push(temp);
      shipsSize--;
    }
    for (let i = 0; i <ships.length; i++) {
      if (ships[i].length == 0) {
        return this.generateShip();
      }
    }
    return ships;
  }


  userInput() {
    let board = this.createBoard();
    let ships = this.generateShip()

    // console.log("Fill 14 coordinates :");
    let getInput = process.argv.slice(2);
    let inputString = getInput.slice(",");
    let inputArr = [];
    let finishedInput = [];

    for (let i = 0; i < getInput.length; i++) {
      let temp = [];
      for (let j = 0; j < getInput[i].length; j++) {
        temp.push(getInput[i][j]);
      }
      inputArr.push(temp);
    }
    //
    // for (let i = 0; i < getInput.length; i++) {
    //   let tempo = [];
    //   for (let j = 0; j < this.alphabet[i].length; j++) {
    //     if (getInput[i][0] === this.alphabet[j]) {
    //       tempo.push(j);
    //       break;
    //     }
    return inputArr;
    }
    // return inputString;
    // for (let i = 0; i < inputArr.length; i++) {
    //   for (let j = 0; j < ships[i].length; j++) {
    //     if (inputArr[i] === ships[j]) {
    //       board[i][j] += "X";
    //     }
    //     else if(inputArr[i] === board[i][j]) {
    //       board[i][j] += "/";
    //     }
    //   }
    // }
    // return board;







//========END==============
}


var game = new Battleship();
game.createBoard();
console.log(game.showBoard());
game.generateShip(); //if user want to see ships position console log this
console.log(game.generateShip());
console.log(game.userInput());

// console.log(game.showBoard());
