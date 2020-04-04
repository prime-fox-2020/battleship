class Fleet {
    constructor(size, pos) {
        this.size = size;
        this._pos = pos;
        this._orientation = '';
        this.status = 'stand by';
    }
    get pos() {return this._pos;}
    set pos(param) {this._pos = param;}
    get orientation() {return this._orientation;}
    set orientation(param) {this._orientation = param;}

    static generateFleets(set = 1) {
        let fleets = [];
        for (let i = 0; i < set; i++) {
            fleets.push(new AirCraft);
            fleets.push(new Battleship);
            fleets.push(new Cruiser);
            fleets.push(new Destroyer);
        }
        return fleets;
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
    get arena() {return this._arena;}
    set arena(param) {this._arena = param;}

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

class gamePlay {
    constructor(fleets, battlefield) {
        this.fleets = fleets;
        this.battlefield = battlefield;
    }
    
    fleetDeploy(ship, coordinate, orientation = 'horizontal') {
        const coord = this.checkCoordinate(coordinate);
        const row = coord[0];
        const column = coord[1];
    
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
                if (this.battlefield.arena[row] == undefined) {
                    return false;
                }
                if (this.battlefield.arena[row][column - 1 + i] != ' ') {
                    available = false;
                    return false;
                }
            }
            if (available) {
                for (let i = 0; i < ship.size; i++) {
                    this.battlefield.arena[row][column - 1 + i] = char;
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
                if (this.battlefield.arena[row + i] == undefined) {
                    return false;
                }
                if (this.battlefield.arena[row + i][column - 1] != ' ') {
                    available = false;
                    return false;
                }
            }
            if (available) {
                for (let i = 0; i < ship.size; i++) {
                    this.battlefield.arena[row + i][column - 1] = char;
                }
                ship.status = 'deployed';
                ship.pos = coordinate;
                ship.orientation = 'vertical';
                return true;
            }
        }
    }
    
    checkCoordinate(coordinate) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let row = coordinate[0];
        const column = +coordinate.substr(1);
        for (let i in alphabet) {
            if (alphabet[i] == row) {
                row = +i;
                break;
            }
        }
        return [row, column];
    }
    
    randomDeploy() {
        for (let fleet of this.fleets) {
            let deploymentSucces = false;
            while (!deploymentSucces) {
                const coordinate = this.randomCoordinate();
                const orientation = this.randomOrientation();
                deploymentSucces = this.fleetDeploy(fleet, coordinate, orientation);
            }
        }
    }
    
    randomCoordinate() {
        let row = Math.floor(Math.random() * 10);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        row = alphabet[row];
        const column = 1 + Math.ceil(Math.random() * 9);
        return row + column;
    }
    
    randomOrientation() {
        const coin = Math.round(Math.random());
        if (coin == 1) {
            return 'horizontal';
        } else {
            return 'vertical';
        }
    }
    
    printBoard() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let header = "    ";
        let limiter = "   -";
        for (let h = 0; h < this.battlefield.dimention; h++) {
            if (h < 10) {
                header += " ";
            }
            header += (h + 1) + "  ";
            limiter += "----";
        }
        console.log(header);
        console.log(limiter);
        for (let i = 0; i < this.battlefield.dimention; i++) {
            let string = " ";
            let line = "   |";
            string += alphabet[i] + " |";
            for (let j = 0; j < this.battlefield.dimention; j++) {
                string += " " + this.battlefield.arena[i][j] + " |";
                line += "---|"
            }
            console.log(string);
            if (i + 1 < this.battlefield.dimention) {
                console.log(line);
            }
        }
        console.log(limiter);
    }
    
    attack() {
        let input = process.argv;
        let enemyDown = 0;
        for (let i = 2; i < input.length; i++) {
            const coord = this.checkCoordinate(input[i]);
            const row = coord[0];
            const column = coord[1];
            if (this.battlefield.arena[row] == undefined) {
                console.log("Invalid coordinate Sir!");
            } else if (this.battlefield.arena[row][column - 1] == undefined) {
                console.log("Invalid coordinate Sir!");
            } else if (this.battlefield.arena[row][column - 1] != ' ') {
                let ship = '';
                if (this.battlefield.arena[row][column - 1] == 'A') {
                    ship = "Aircraft";
                } else if (this.battlefield.arena[row][column - 1] == 'B') {
                    ship = "Battleship";
                } else if (this.battlefield.arena[row][column - 1] == 'C') {
                    ship = "Cruiser";
                } else if (this.battlefield.arena[row][column - 1] == 'D') {
                    ship = "Destroyer";
                }
                enemyDown++;
                console.log(`You take down the ${ship}!`);
                this.battlefield.arena[row][column - 1] = 'X';
            } else {
                console.log("You miss!");
            }
        }

        this.printBoard();
        if (enemyDown == this.fleets.length){
            console.log("Congratulation General! You have taken down all of enemey fleet.");
        } else if (enemyDown > (this.fleets.length/2)-1) {
            console.log(`Good Job Sir! You have taken down ${enemyDown} of enemey fleet.`);
        } else {
            console.log("Nice try kopral! Keep training!");
        }
    }
}


const armada = Fleet.generateFleets(1); // How many set of fleet
const lautJawa = new BattleField(10); // Set board dimention
const main = new gamePlay(armada, lautJawa);
// Deploy the fleet to the arena randomly
main.randomDeploy();
// Start the battle
main.attack();

// Guess the coordinate
// node index.js A2 B5 C2 H7 D3 I10 J1 E4 F6 G7 
// node index.js A2 B5 C2 D14 H7 D3 K7 I10 J1 E4 F6 G7 B0