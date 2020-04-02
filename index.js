/* Input in terminal -> node index.js A3 D6 J4 A2 B7 E8 I5 I7 J3 J10\\ */

const bomb = process.argv.slice(2);
const kamus = 'ABCDEFGHIJ';
const fleetTable = [
    { ship: 'Aircraft carrier 🛩️ ', size: 5, tag: '🛩️', health: 5 },
    { ship: 'Battleship 🚢 ', size: 4, tag: '🚢', health: 4 },
    { ship: 'Cruiser 🛳️ ', size: 3, tag: '🛳️', health: 3 },
    { ship: 'Destroyer 🔥 ', size: 2, tag: '🔥', health: 2 }
];

let generateBoard = () => {
    let board = [];

    for (let i = 0; i < 11; i++) {
        let row = Array(11).fill(' ');
        board.push(row);
        if (i > 0) board[i][0] = kamus[i - 1];
        if (i === 0) {
            for (let j = 1; j < 11; j++) {
                board[i][j] = j;
            };
        };
    };
    return board;
};

let generateShipPosition = () => {
    let rows = Math.floor(Math.random() * 11) + 1;
    let cols = Math.floor(Math.random() * 11) + 1;
    return [rows, cols];
}


let checkDirect = () => {
    let direct = ['vertical', 'horizontal'];
    return direct[Math.floor(Math.random() * 2)];
}


let checkVertical = (shipPos, size, board) => {
    let row = shipPos[0];
    let col = shipPos[1];

    if (row + size > 10) return false;
    for (let i = row; i < row + size; i++) {
        if (board[i][col] !== ' ') return false;
    };
    return true;
}


let checkHorizontal = (shipPos, size, board) => {
    let row = shipPos[0];
    let col = shipPos[1];

    if (col + size > 10) return false;
    for (let i = col; i < col + size; i++) {
        if (board[i][row] !== ' ') return false;
    };
    return true;
}


let checkBombLoc = (arr) => {
    let bombArr = [];

    for (let i = 0; i < arr.length; i++) {
        let rowPos = '';
        let colPos = parseInt(arr[i].substring(1));
        for (let j = 0; j < kamus.length; j++) {
            if (kamus[j] === arr[i][0]) rowPos = j + 1;
        };
        bombArr.push({ rowPos, colPos });
    };
    return bombArr;
}


let dropBomb = (board, bombArr) => {
    for (let i = 0; i < bombArr.length; i++) {
        let z = bombArr[i].rowPos;
        let y = bombArr[i].colPos;
        if (board[z][y] === ' ' || board[z][y] === '💣') {
            board[z][y] = '💣';
        } else {
            for (let i = 0; i < fleetTable.length; i++) {
                if (fleetTable[i].tag === board[z][y]) fleetTable[i].health--;
            };
            board[z][y] = '💥'; //terkena serangan
        };
    };
};


let randomShip = (board) => {
    let shipsPlaced = 0;

    while (shipsPlaced < fleetTable.length) {
        let size = fleetTable[shipsPlaced].size;
        let shipPos = generateShipPosition();
        let direction = checkDirect();
        let isPlaced = (direction === 'vertical') ? checkVertical(shipPos, size, board)
            : checkHorizontal(shipPos, size, board);
        if (isPlaced) {
            if (direction === 'vertical') {
                for (let i = shipPos[0]; i < shipPos[0] + size; i++) {
                    board[i][shipPos[1]] = fleetTable[shipsPlaced].tag;
                };
            } else {
                for (let j = shipPos[1]; j < shipPos[1] + size; j++) {
                    board[shipPos[0]][j] = fleetTable[shipsPlaced].tag;
                };
            }
            shipsPlaced++;
        };
    };
};


let displayPlayBattleship = () => {
    for (let i = 0; i < fleetTable.length; i++) {
        let health = Math.round(fleetTable[i].health / fleetTable[i].size * 100);
        console.log(`${fleetTable[i].ship} remaining health player is ${health}%`);
    };
};


let playBattleship = () => {
    let board = generateBoard();
    randomShip(board);
    let bombArr = checkBombLoc(bomb);
    dropBomb(board, bombArr);

    for (let key in board) {
        console.table(board[key].join(' ┃') + ' ┃');
    }
    displayPlayBattleship();
}
playBattleship();