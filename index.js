// Your code here
play = () => {
    let ShipsModel = require('./lib/shipsmodel.js')
    let GameEnvironment = require('./lib/boards.js')

    let [command, shoot_x, shoot_y] = [process.argv.slice(2), undefined, undefined];
    let command_letters = 'ABCDEFGHIJ'
    let SM = new ShipsModel(), GE = new GameEnvironment();
    
    // setting up a blank board
    GE.blankBoard();
    // get ships model
    GE.shipsCollection = SM.model
    // build game environment with positioning the warship
    GE.makeBoard();

    // start bombing the warship position based on users command
    for (let c = 0; c < command.length; c++) {
        if (command_letters.indexOf(command[c][0].toUpperCase()) !== -1) {
            shoot_x = +command[c][1] - 1;
            shoot_y = command_letters.indexOf(command[c][0])
        }
        
        if (GE.boardValue(shoot_x, shoot_y) == ' ') {
            GE.bombsAway(shoot_x, shoot_y, 'M')
        } else {
            // hit point +1
            SM.hit = GE.boardValue(shoot_x, shoot_y)
            // change the character if hit
            GE.bombsAway(shoot_x, shoot_y, '🔥')
        }
    }

    console.log(GE.result)

    return SM.damageInfo
}
console.log(play())