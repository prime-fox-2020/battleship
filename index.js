// Your code here
'use strict'

class Sea {
    constructor() {
        this._area = [];
        this._ship = [];
        this._firedShip = 0;
    }

    get area() {
        return this._area;
    }

    set area(val) {
        this._area = val;
    }

    get ship() {
        return this._ship;
    }

    set ship(val) {
        this._ship = val;
    }

    get firedShip() {
        return this._firedShip;
    }

    set firedShip(val) {
        this._firedShip = val;
    }

    create() {
        for (let i = 0; i < 10; i++) {
            let temp = [];
            for (let j = 0; j < 10; j++) {
                temp.push('0');
            }
            this.area.push(temp);
        }
    }

    putShip() {
        for (let i = 5; i >= 2; i--) {
            let x = 0, y = 0;
            let cond = false;
            while (cond == false) {
                //menentukan kondisi kapal vertikal/ horizontal
                let pos = Math.round(Math.random() * 1);
                if (pos == 1) { //vertikal
                    //menentukan posisi kepala kapal
                    x = Math.ceil(Math.random() * this.area.length - 1);
                    y = Math.ceil(Math.random() * this.area.length - i);
                }
                else { //horizontal
                    //menentukan posisi kepala kapal
                    x = Math.ceil(Math.random() * this.area.length - i);
                    y = Math.ceil(Math.random() * this.area.length - 1);
                }
                x < 0 ? x = 0 : x;
                y < 0 ? y = 0 : y;
                let ship = [];
                cond = true;
                for (let j = 0; j < i; j++) {
                    if (pos == 1) { //vertikal
                        //cek apakah kapal baru bertabrakkan dengan kapal yang sudah ada
                        if (this.area[x][y + j] == 'o') {
                            cond = false;
                            break;
                        }
                        ship.push([x, y + j]);
                    }
                    else { // horizontal
                        //cek apakah kapal baru bertabrakkan dengan kapal yang sudah ada
                        if (this.area[x + j][y] == 'o') {
                            cond = false;
                            break;
                        }
                        ship.push([x + j, y]);
                    }
                }
                if (cond == true) {
                    for (let j in ship) {
                        this.area[ship[j][0]][ship[j][1]] = 'o';
                    }
                    this.ship.push(ship);
                }
            }
        }
    }

    fireShip(arr) {
        let huruf = 'ABCDEFGHIJ', convert = [], x, y;
        for (let i = 2; i < arr.length; i++) {
            for (let j in huruf) {
                if (arr[i][0] == huruf[j]) {
                    y = +j;
                    break;
                }
            }
            convert.push([Number(arr[i][1]) - 1, y]);
        }
        let fired = [];
        for (let i = 0; i < convert.length; i++) {
            let kena = false;
            for (let j = 0; j < this.ship.length; j++) {
                for (let k in this.ship[j]) {
                    let a = this.ship[j][k][0], b = this.ship[j][k][1];
                    if (convert[i][0] == a && convert[i][1] == b) {
                        kena = true;
                        let cond = false;
                        for (let l in fired) {
                            if (fired[l] == j) {
                                cond = true;
                                break;
                            }
                        }
                        if (cond == false) {
                            fired.push(j);
                            this.firedShip++;
                        }
                        this.area[convert[i][0]][convert[i][1]] = 'x';
                        j = this.ship.length;
                        break;
                    }
                }
            }
            if (kena == false) this.area[convert[i][0]][convert[i][1]] = '/';
        }
    }

    printBoard() {
        console.log(`  | A | B | C | D | E | F | G | H | I | J |`);
        console.log(`-------------------------------------------`);
        for (let i in this.area) {
            let print = '';
            if (i == '9') print = `0 |`;
            else print = `${+i + 1} |`;
            for (let j in this.area[i]) {
                if (this.area[i][j] == '0') print += `   |`;
                else print += ` ${this.area[i][j]} |`;
            }
            console.log(print);
            console.log(`-------------------------------------------`)
        }
        console.log(`Anda mengenai ${this.firedShip} kapal`);
    }
}

let fire = process.argv;
const play = (fire) => {
let sea = new Sea();
sea.create();
sea.putShip();
sea.fireShip(fire);
sea.printBoard();
}
// ['0', 0, 'A5', 'B7', 'C9', 'D7', 'A4']
play(fire);