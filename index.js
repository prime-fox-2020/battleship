// Your code here

// to create main board only and side symbol
function battleshipBoard() {
	let alphabet = 'ABCDEFGHIJ'
	let board = []
	for (let i = 0; i < alphabet.length; i++) {
		let alphabetName = [alphabet[i]] 
		for (let j = 0; j < alphabet.length; j++) {
			alphabetName.push(' ')
		}
		board.push(alphabetName)
	}
	return board
}	

// initial ship value
let ship = [
	{
		name: 'A',
		size: 5,
	},
	{
		name: 'B',
		size: 4,
	},
	{
		name: 'C',
		size: 3,
	},
	{
		name: 'D',
		size: 2,
	}
]

// to insert key startPos into ship object with unique number
function addRandomShipPosition(ship) {
	let numberGenerated = [];
	do {
	  let num = Math.floor(Math.random() * 5);
	  numberGenerated.push(num);
	  numberGenerated = numberGenerated.filter((item, index) => {
		return numberGenerated.indexOf(item) === index
	  });
	} while (numberGenerated.length < 5);

	for (let i = 0; i < ship.length; i++) {
		for (let j = 0; j < numberGenerated.length; j++) {
			if (i == j) {
				ship[i].startPos = numberGenerated[j]
			}
		}
	}
	return ship
}

// ship placement
function shipPlacement1() {
	let board = battleshipBoard()
	let ships = addRandomShipPosition(ship)
	
	for (let i = 0; i < ships.length; i++) {
		let name = ships[i].name
		let size = ships[i].size
		let xPos = ships[i].startPos
		let yPos = xPos
		let horizontalVertical = Math.round(Math.random());

		if (board[xPos][yPos] === ' ') {
			for (let j = 0; j < size; j++) {
				// generate horizontal
				if (horizontalVertical === 1) {
					if (xPos < 9) {
						board[xPos][yPos] = name
						yPos++
					}
				// generate vertical
				} else {
					if (yPos < 9) {
						board[yPos][xPos] = name
						yPos++
					}
				}
			}
		} else {
			return shipPlacement1();
		}
	}
	return board
}

let link = process.argv.slice(2) 
// maintain types of input and return game status (end)
function runTheGame() {
	let inputs = []
	let boardShip = shipPlacement1();
	let huruf = ' ABCDEFGHIJ'
	let cek = 0
    if (link.length == 0) {
        return `Let's start the game with inputs of alphabet between A to J followed by number between 1 to 10`
    }
    if (link.length > 5) {
        return `You can only input rocket(s) at maximum of 5 coordinates.`
    }
    for (let i = 0; i < link.length; i++) {
        let alp = ''
        let num = ''
        for (let j = 0; j < link[i].length; j++) {
            if (link[i][j] >= 'A' && link[i][j] <= 'J'){
                alp += link[i][j]
            }
            if (link[i][j] >= 0 && link[i][j] <= 10) {
                num += link[i][j];
            }
        }
        if(alp < 'A' || alp > 'Z' || Number(num) <= 0 || Number(num) > 10){
            return `Your first input of character should be a capital alphabet from 'A' to 'J' followed by number between 1 to 10`
        }
        inputs.push([alp, num])
    }
    for (let i = 0; i < inputs.length; i++) {
        for (let j = 1; j <= huruf.length; j++) {
            if (inputs[i][0] == huruf[j]) {
                inputs[i][0] = j
            }
        }
    }
    for (let j = 0; j < inputs.length; j++) {
        if (boardShip[inputs[j][0]][inputs[j][1]] !== ' ') {
            boardShip[inputs[j][0]-1][inputs[j][1]] = 'X';
            cek++;
        } 
        else {
            boardShip[inputs[j][0]-1][inputs[j][1]] = '/';
        }
    }
    if (cek > 0 && cek < 4) {
        console.log(`You hit ${cek} ship(s).`)
	}
	else if (cek == 0) {
        console.log(`What a waste of rocket(s), think before you act.`)
    }
    else if (cek == 4) {
        console.log(`Mission complete. all enemy's ships are down.`)
    }
    let header = [['#', '1', '2', '3', '4',  '5', '6', '7',  '8', '9', '10']]
    console.log(header)
	console.log(boardShip);
	return ''
}
console.log(runTheGame())