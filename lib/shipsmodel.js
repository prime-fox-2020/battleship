"use strict"

let s_class = {};

class ShipClass {

    _ShipsClassification() {

        s_class['A'] = {
            className: 'Aircraft Carrier',
            size: 5,
            damage: 0
        }

        s_class['B'] = {
            className: 'Battleship',
            size: 4,
            damage: 0
        }

        s_class['C'] = {
            className: 'Cruiser',
            size: 3,
            damage: 0
        }

        s_class['D'] = {
            className: 'Destroyer',
            size: 2,
            damage: 0
        }

        return s_class
    }
    
    set hit(class_code) {
        s_class[class_code].damage++
    }

    get damageInfo() {
        let info = '\n', count = 0;
        for (let ship in s_class) {
            if (s_class[ship].damage > 0) {
                info += `--> ${s_class[ship].className} has been hit ${s_class[ship].damage}x, and sinking\n`
                count++
            }
        }

        return info += `--> There is ${4 - count} ship${count > 1 ? 's' : ''} left on float\n`
    }

    get model() {
        return this._ShipsClassification()
    }
}

module.exports = ShipClass;