// Your code here
const Grid = require('./grid.js');
const Ship = require('./ship.js');

let title = '\n===================== BATTLESHIP ======================';
let scoreMsg = '-------- SUMMARY -------';
let gameLog = '------- GAME LOG -------';

let area = new Grid();
let ship = new Ship();

area.createGrid();
ship.createShip(area);

console.log(title);

console.log(`\n ${gameLog}`);

for (let i = 2; i < process.argv.length; i++) {
  ship.shoot(area, process.argv[i]);
}

console.log('\n', scoreMsg);

ship.showAttacksFired();

console.log('\n');

area.showGrid();

console.log(title, `\n`);