"use strict"

class Environment {
    constructor() {
        this._shipPosition = ['landscape', 'portrait']
        this._board = [];
        this._ships;
    }

    _generateBoard() {
        // build game environment

        for (let shipsID in this._ships) {

            let playing = true;
            
            while (playing) {
                let [pos_x, pos_y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]

                let orientation = this._shipPosition[Math.floor(Math.random() * this._shipPosition.length)]
                playing = false;

                switch (orientation) {
                    case 'landscape' :
                        for (let i = 0; i < this._ships[shipsID].size && !playing; i++) {
                            if (this._board[pos_x][pos_y + i] === undefined || 
                                this._board[pos_x][pos_y + i] !== ' ') {
                                    playing = true;
                                }
                        }
                        // set pos the ships on the board
                        for (let i = 0; i < this._ships[shipsID].size && !playing; i++) {
                            this._board[pos_x][pos_y + i] = shipsID;
                        }

                        break;
                    default:
                        for (let i = 0; i < this._ships[shipsID].size && !playing; i++) {
                            if (this._board[pos_x + i] === undefined || 
                                this._board[pos_x + i][pos_y] !== ' ') {
                                    playing = true;
                                }
                        }
                        // set pos the ships on the board
                        for (let i = 0; i < this._ships[shipsID].size && !playing; i++) {
                            this._board[pos_x + i][pos_y] = shipsID;
                        }
                        break;
                }
            }
        }
    }

    _blankBoard() {
        for (let x = 0; x < 10; x++) {
            this._board.push([]);
            for (let y = 0; y < 10; y++) {
                this._board[x].push(' ')
            }
        }
    }

    _boardDisplay() {
        let [header, line, rowSeparator] = ['     A   B   C   D   E   F   G   H   I   J', '-', '   |---|---|---|---|---|---|---|---|---|---|'];
        let result = '';
        result += `${header}\n`;
        result += `   +${line.repeat(39)}+\n`
        for (let grid = 1; grid < 11; grid++) {
            if (grid < 10) {
                result += ` ${grid} | ${this._board[grid - 1].join(' | ')} |\n`;
                result += `${rowSeparator}\n`
            } else {
                result += `${grid} | ${this._board[grid - 1].join(' | ')} |\n`;
            }
        }
        result += `   +${line.repeat(39)}+`
        return result;
    }

    set shipsCollection (collection) {
        this._ships = collection;
    }

    get result() {
        return this._boardDisplay()
    }

    makeBoard() {
        this._generateBoard()
    }

    blankBoard() {
        this._blankBoard();
    }

    boardValue (x_, y_) {
        return this._board[x_][y_]
    }

    bombsAway (x_, y_, char) {
        this._board[x_][y_] = char;
    }
}

module.exports = Environment;