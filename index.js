// Your code here
const ProcessArgv = process.argv;

const ProcessSplit = ProcessArgv.slice(2);

const tembak = ProcessSplit[0].split('');

class ArrayBoard {
	static Arr() {
		let arr = [
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ],
			[ ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' ]
		];
		return arr;
	}
}

class CreateShip {
	constructor() {
		this._result = this.insertShip();
	}

	get result() {
		return this._result;
	}

	set result(arr) {
		this._result = arr;
	}

	randomShip() {
		const kotak = [];
		for (var i = 0; i < 4; i++) {
			let randomNum1 = Math.floor(Math.random() * 10);
			let randomNum2 = Math.ceil(Math.random() * 10);
			let randomNum3 = 5 - i;
			kotak.push([ randomNum1, randomNum2, randomNum3 ]);
		}
		return kotak;
	}

	insertShip() {
		const random = this.randomShip();
		const arr = ArrayBoard.Arr();
		let angka = 6;
		for (var i = 0; i < random.length; i++) {
			let tambah = 1;
			let asal = Math.round(Math.random() * 2)
			angka--;
			for (var j = 0; j < arr.length; j++) {
				let counter = 1;
				tambah = 1;
				for (var k = 0; k < arr[j].length; k++) {
					if (random[i][0] === j + 1 && random[i][1] === tambah) {
						if (arr[j][k] === undefined || counter -1 == random[i][2] || typeof arr[j][k] === 'number' ) {
							break;
						}
						counter++;
						if(asal === 1){
						arr[j][k] = angka;
						}else{
							arr[k][j] = angka
						}
					} else {
						tambah++;
					}
				}
			}
		}
		return arr;
	}
}

class Shoot {
	constructor() {
		this._shoot = this.createBombTrace();
	}
	get shoot() {
		return this._shoot;
	}

	set shoot(change) {
		this._shoot = change;
	}

	convertAlphaToNum() {
		const bomb = tembak;
		let kamus = ' ABCDEFGHIJ';
		for (var i = 0; i < kamus.length; i++) {
			if (bomb[0] === kamus[i]) {
				bomb[0] = i;
			}
		}
		return bomb;
	}

	createBombTrace() {
		const bomb = this.convertAlphaToNum();
		const kotak = new CreateShip();

		for (var i = 0; i < kotak.result.length; i++) {
			for (var j = 0; j < kotak.result[i].length; j++) {
				if (bomb[0] === i + 1 && bomb[1] == j + 1) {
					if (kotak.result[i][j] !== ' ') {
						kotak.result[i][j] = 'X';
					} else {
						kotak.result[i][j] = '/';
					}
				}
			}
			
		}
		return kotak.result;
	}
}

class CreateMainBoard {
	constructor() {
		this._print = this.printString();
	}

	get print() {
		return this._print;
	}

	set print(apaCoba) {
		this._print = apaCoba;
	}

	printString() {
		const core = new Shoot();
		let alpha = 'ABCDEFGHIJ';
		let untukAlpha = '';
		let str = '';
		let counter = 0;
		let kapal;
		for (var i = 1; i <= 10; i++) {
			let tampung = '|';const argv = new CreateShip();

			
			for (var j = 0; j < 10; j++) {
				if (core.shoot[i - 1][j] === 'X') {
					counter++;
				}
				if (i === 1 && alpha[j] === 'A') {
					untukAlpha += '     ' + alpha[j];
				} else if (i === 1 && alpha[j] !== 'A') {
					untukAlpha += '   ' + alpha[j];
				}
				tampung += core.shoot[i - 1][j] + '  |';
			}
			if (i !== 10) {
				str += ' ' + i + ' ' + tampung + '\n';
			} else {
				str += i + ' ' + tampung + '\n';
			}
		}
		str = untukAlpha + '\n' + str;
		console.log(str);
		if (counter > 0) {
			return `Satu bagian telah tenggelam.....hikssss :(`;
		} else {
			return 'Semua kapal sehat sentosa';
		}
	}
}



const papan = new CreateMainBoard();

console.log(papan.print);
