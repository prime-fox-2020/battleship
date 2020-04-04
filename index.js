// Your code here
class Fleet {
    constructor(size, pos) {
        this.size = size;
        this._pos = pos;
        this._orientation = '';
        this.status = 'stand by';
    }
    get pos() {
        return this._pos;
    }
    set pos(param) {
        this._pos = param;
    }
    get orientation() {
        return this._orientation;
    }
    set orientation(param) {
        this._orientation = param;
    }
}

class AirCraft extends Fleet {
    constructor() {
        super(5);
    }
}

class Battleship extends Fleet {
    constructor() {
        super(4);
    }
}

class Cruiser extends Fleet {
    constructor() {
        super(3);
    }
}

class Destroyer extends Fleet {
    constructor() {
        super(2);
    }
}

class BattleField {
    constructor(dimention) {
        this.dimention = dimention;
        // this.width = width;
        // this.depth = depth;
        this._arena = this.generateArena();
    }
    get arena() {
        return this._arena;
    }
    set arena(param) {
        this._arena = param;
    }

    generateArena() {
        const arena = [];
        for (let row = 0; row < this.dimention; row++) {
            const line = [];
            for (let column = 0; column < this.dimention; column++) {
                line.push(' ');
            }
            arena.push(line);
        }
        return arena;
    }
}

function fleetDeploy(battlefield, ship, coordinate, orientation = 'horizontal') {
    // split the coordinate
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let row = coordinate[0];
    const column = +coordinate.substr(1);
    for (let i in alphabet) {
        if (alphabet[i] == row) {
            row = +i;
            break;
        }
    }

    let char = '';
    switch (ship.constructor.name) {
        case 'AirCraft':
            char = 'A';
            break;
        case 'Battleship':
            char = 'B';
            break;
        case 'Cruiser':
            char = 'C';
            break;
        case 'Destroyer':
            char = 'D';
            break;
    }

    if (orientation == 'horizontal') {
        let available = true;
        let i = 0;
        for (let i = 0; i < ship.size; i++) {
            debugger;
            if (battlefield.arena[row] == undefined) {
                return false;
            }
            if (battlefield.arena[row][column - 1 + i] != ' ') {
                available = false;
                return false;
            }
        }
        if (available) {
            for (let i = 0; i < ship.size; i++) {
                battlefield.arena[row][column - 1 + i] = char;
            }
            ship.status = 'deployed';
            ship.pos = coordinate;
            ship.orientation = 'horizontal';
            return true;
        }
    } else if (orientation == 'vertical') {
        let available = true;
        for (let i = 0; i < ship.size; i++) {
            debugger;
            if (battlefield.arena[row + i] == undefined) {
                return false;
            }
            if (battlefield.arena[row + i][column - 1] != ' ') {
                available = false;
                return false;
            }
        }
        if (available) {
            for (let i = 0; i < ship.size; i++) {
                battlefield.arena[row + i][column - 1] = char;
            }
            ship.status = 'deployed';
            ship.pos = coordinate;
            ship.orientation = 'vertical';
            return true;
        }
    }
}

function randomDeploy(fleets, battlefield) {
    for (let fleet of fleets) {
        let deploymentSucces = false;
        while (!deploymentSucces) {
            const coordinate = randomCoordinate();
            const orientation = randomOrientation();
            deploymentSucces = fleetDeploy(battlefield, fleet, coordinate, orientation);
        }
    }
}

function randomCoordinate() {
    let row = Math.floor(Math.random() * 10);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    row = alphabet[row];
    const column = 1 + Math.ceil(Math.random() * 9);
    return row + column;
}

function randomOrientation() {
    const coin = Math.round(Math.random());
    if (coin == 1) {
        return 'horizontal';
    } else {
        return 'vertical';
    }
}

function generateFleets() {
    let fleets = [];
    fleets.push(new AirCraft);
    fleets.push(new Battleship);
    fleets.push(new Cruiser);
    fleets.push(new Destroyer);
    return fleets;
}

function printBoard(battlefield) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let header = "    ";
    let limiter = "   -";
    for (let h = 0; h < battlefield.dimention; h++) {
        if (h < 10) {
            header += " ";
        }
        header += (h + 1) + "  ";
        limiter += "----";
    }
    console.log(header);
    console.log(limiter);
    for (let i = 0; i < battlefield.dimention; i++) {
        let string = " ";
        let line = "   |";
        string += alphabet[i] + " |";
        for (let j = 0; j < battlefield.dimention; j++) {
            string += " " + battlefield.arena[i][j] + " |";
            line += "---|"
        }
        console.log(string);
        if (i+1 < battlefield.dimention) {
            console.log(line);
        }
    }
    console.log(limiter);
}

const armada = generateFleets();
const lautJawa = new BattleField(10); // Set board dimention
randomDeploy(armada, lautJawa);
// console.log(armada);
printBoard(lautJawa);

// let available = true;
// let j = 0; let k = 0;
// let i = 0;
// while (available || i < ship.size) {
//     if (this.arena[row+j][column-1+k] != ' '){
//         available = false;
//         // this.arena[row+j][column-1+k] = char;
//     }
// Rekursi(2) broo!!!
//     if (orientation == 'horizontal') {
//         j++;
//     } else if (orientation == 'vertical') {
//         k++;
//     }
//     // ship.status = 'deployed';
//     // ship.pos = coordinate;
//     // ship.orientation = 'horizontal';
// }