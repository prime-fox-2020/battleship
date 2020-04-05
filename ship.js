class Ship {
  constructor() {
    this.attacksLaunched = 0;
    this.strike = 0;
  }

  createShip(area) {
    for (let i = 2; i <= 5; i++) {
      let x = 0;
      let y = 0;
      let orientation;

      do {
        x = Math.floor(Math.random() * area.grid[0].length);
        y = Math.floor(Math.random() * area.grid.length);

        orientation = Math.round(Math.random()) ? 'vertical' : 'horizontal';

        if (orientation === 'vertical') x = Math.floor(Math.random() * (area.grid[0].length - i));
        else y = Math.floor(Math.random() * (area.grid.length - i));

      } while (!this.placeShip(area, i, x, y, orientation));
    }
  }

  placeShip(area, shipLength, x, y, orientation) {

    if (orientation === 'vertical') {
      if (x + shipLength >= area.grid[y].length) return false;

      for (let i = x; i < x + shipLength; i++) {
        if (area.grid[y][i] !== ' ') return false;
        else area.grid[y][i] = 'O';
      }

      return true;
    } else if (orientation === 'horizontal') {
      if (y + shipLength >= area.grid.length) return false;

      for (let i = y; i < y + shipLength; i++) {
        if (area.grid[i][x] !== ' ') return false;
        else area.grid[i][x] = 'O';
      }

      return true;
    }

    return false;
  }

  shoot(area, input) {
    let coordinate = area.parseGrid(input);

    // input = String(input).split('');
    // input[0] = input[0].toUpperCase();
    // input = input.join('');

    if (!coordinate) console.log(`(${input}) Invalid target!`);
    else {
      this.attacksLaunched++;
      if (area.grid[coordinate.y][coordinate.x] === 'O') {
        area.grid[coordinate.y][coordinate.x] = 'X';
        this.strike++;
        console.log(` Strike at ${input}!`);
      }
      else
        area.grid[coordinate.y][coordinate.x] = '/';
    }
  }

  showAttacksFired() {
    console.log(` Attacks Launched: `, this.attacksLaunched);
    console.log(` Strike: `, this.strike);
  }
}

module.exports = Ship;