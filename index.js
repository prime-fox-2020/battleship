// Your code here
const app = process.argv;
const shoot = app.slice(2);
class Board{
  constructor(){
    this._coordinate = [];
    this._message    = "";
  }
  get coordinate(){
    return this._coordinate;
  }
  set coordinate(val){
    this._coordinate = val;
  }
  get message(){
    return this._message;
  }
  set message(val){
    this._message = val;
  }

  makeBoard(){
    for(let i = 0; i < 10; i++){
      const temp = [];
      for(let j = 0; j < 10; j++){
        temp.push(' ');
      }
      this.coordinate.push(temp);
    }
  }

  setShipInBoard(){
    for(let i = 2; i < 6; i++){
      const ships = new Ship(i);
      ships.randomEnemy();
      for(let ship of ships.ship){
        if(this.coordinate[ship[1]][ship[0]] === ' '){
          this.coordinate[ship[1]][ship[0]] = `${i}`;
        }
      }
    }
  }

  setShootInBoard(){
    const shoots = new Shoot();
    let missed  = 0;
    let kena    = 0;
    for(let shoot of shoots.shootCoor){
      if(this.coordinate[shoot[1]][shoot[0]] !== ' '){
        this.coordinate[shoot[1]][shoot[0]] = `X`;
        kena++;
      }else {
        this.coordinate[shoot[1]][shoot[0]] = `/`;
        missed++;
      }
    }
    this.message = `Kamu mengenai kapal sebanyak ${kena} kali\nKamu meleset sebanyak ${missed} kali`;
  }

  printBoard(){
    let str = "   | A | B | C | D | E | F | G | H | I | J |";
    for(let i = 0; i < 10; i++){
      if(i === 9) str += `\n ${i+1}|`;
      else str += `\n ${i+1} |`;
      for(let j = 0; j < 10; j++){
        str +=` ${this.coordinate[i][j]} |`;
      }
    }
    console.log(str);
    return this.message;
  }
}

class Ship{
  constructor(length){
    this._ship = []; // will create array of coordinate;
    this._length = length;
  }
  
  get ship (){
    return this._ship;
  }
  set ship (val){
    this._ship = val;
  }

  get length(){
    return this._length;
  }
  set length(val){
    this._length = val;
  }

  randomEnemy(){
    let x = this.randomCoordinate();
    let y = this.randomCoordinate();
    const side = this.randomPosition();
    const arr = [];
    for(let i = 0; i < this.length; i++){
      if(side === "horizontal") arr.push([x++, y]);
      else arr.push([x, y++]);
    }
    this.ship = arr;
  }

  randomCoordinate(){
    return Math.floor(Math.random() * 6)
  }

  randomPosition(){
    return (Math.random() * 4) > 2 ? "horizontal" : "vertical"; 
  }
}

class Shoot{
  constructor(){
    this._shootCoor = this.translate(shoot);
  }
  get shootCoor(){
    return this._shootCoor;
  }
  set shootCoor(val){
    this._shootCoor = val;
  }

  translate(shoot){
    const dictionary = 'ABCDEFGHIJ';
    const arr = [];
    for(let i = 0; i < shoot.length; i++){
      const x = dictionary.indexOf(shoot[i][0]);
      const y = Number(shoot[i][1]);
      arr.push([x,y]);
    }
    return arr;
  }
}

let i = new Board();
i.makeBoard();
i.setShipInBoard();
i.setShootInBoard();
console.log(i.printBoard());