class Grid {
  constructor() {
    this.grid = [];
    this.rows = 10;
    this.cols = 10;
  }

  createGrid() {
    for (let row = 0; row < this.rows; row++) {
      let temp = [];

      for (let col = 0; col < this.cols; col++) temp.push(' ');

      this.grid.push(temp);
    }
  }

  showGrid() {
    let horizontalMark = '      ١    ب    ت    ث    ج    ح    خ    د    ذ    ر   ';
    let verticalMark = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١.'];
    let separator = '      |----|----|----|----|----|----|----|----|----|----|';
    let border = '    +-------------------------------------------------+';

    console.log(horizontalMark);

    for (let row = 0; row < this.rows; row++) {
      let temp = '';

      if (row + 1 < this.rows) temp += '   ';

      temp += ` ${verticalMark[row]} |`;

      for (let col = 0; col < this.cols; col++)
        if (this.grid[row][col] == '/' || this.grid[row][col] == 'X' || this.grid[row][col] == 'O')
          temp += ` ${this.grid[row][col]}  |`;
        else {
          temp += `  ${this.grid[row][col]} |`;
        }

      console.log(temp);

      if (row + 1 < this.rows) console.log(separator);
    }

    console.log(border);
  }

  parseGrid(coordinate) {
    let horizontalMark = 'ABCDEFGHIJ';
    let x = coordinate[0];
    let y = Number(coordinate.slice(1)) - 1;
    let xIndex = -1;

    if (coordinate.length < 2) return null;

    if (!Number.isInteger(y)) return null;

    for (let i = 0; i < horizontalMark.length; i++) {
      if (x == horizontalMark[i]) {
        xIndex = i;
        break;
      }
    }

    if (xIndex === -1) return null;
    else return { x: xIndex, y: y };
  }
}

module.exports = Grid;