console.clear()
let ships = require('./ships.js')
let newships = new ships()
let explorercoor = newships.explorer
let command = process.argv.slice(2,10)
let thisisA = []
let thisis1 = []

if (command)
for(var i = 0 ; i < command.length ; i ++){
    thisisA.push(command[i][0].toLowerCase().charCodeAt(0) - 97)
    }
for(var i = 0 ; i < command.length ; i ++){
    if(command[i].length == 2){
        thisis1.push(Number(command[i][1])-1)
        }else {
        thisis1.push(9)
        }
    }

class gameboard{
    constructor(thisisA,thisis1){
        this.horz = 'X'
        this.userInputA = thisisA
        this.userInput1 = thisis1
        this.explorer = newships.explorer
        this.cruiser = newships.cruiser
        this.battleCruiser = newships.battleCruiser
        this.destroyer = newships.destroyer

    }
    header() {
        return ("     A   B   C   D   E   F   G   H   I   J")
    }
    
    strips() {
        return ('  '+'|---|---|---|---|---|---|---|---|---|---|') 
    }
    
    header2() {
        return ('  '+'+------------------------------------------') 
    }
    target(){
        let AllCells = []     ///*ini kan gabungan semua
        let Vert=[]           ///*ini kan 1 row
        let Horz = this.horz  ///*ini gw 1 1 masukin nya
        
        for(var i = 0 ; i < 10 ; i++){
            for(var j = 0 ; j < 10 ; j ++){
                Vert.push(Horz)
            }
            AllCells.push(Vert)
            Vert=[]
        } 
        //semua ship disini
        let explorer = this.explorer
        for(var i = 0 ; i < explorer.length; i ++){
            AllCells[explorer[i][1]][explorer[i][0]] = 'E'
        }
        
        let cruiser = this.cruiser
        for(var i = 0 ; i < cruiser.length; i ++){
            AllCells[cruiser[i][1]][cruiser[i][0]] = 'C'
        }
        
        let battleCruiser = this.battleCruiser
        for(var i = 0 ; i < battleCruiser.length; i ++){
            AllCells[battleCruiser[i][1]][battleCruiser[i][0]] = 'B'
        }
        
        let destroyer = this.destroyer
        console.log(destroyer)
        for(var i = 0 ; i < destroyer.length; i ++){
            AllCells[destroyer[i][1]][destroyer[i][0]] = 'D'
        }
        
        //tembak di AllCells !!!!!!
        //nantinya player masukin target di sini
        let shootforA = this.userInputA
        //tinggal masukin dari thisisA
        let shootfor1 = this.userInput1
        //tinggal masukin dari thisis1
        if (shootforA.length !== shootfor1.length){
            return "count input X dan Y belum sama"
        }else{
            for(var i = 0 ; i < shootforA.length ; i ++){
                if(AllCells[shootfor1[i]][shootforA[i]] == 'E' 
                || AllCells[shootfor1[i]][shootforA[i]] == 'C'
                || AllCells[shootfor1[i]][shootforA[i]] == 'B'
                || AllCells[shootfor1[i]][shootforA[i]] == 'D'){
                    AllCells[shootfor1[i]][shootforA[i]] = '@'
                }
                
            }
        }
        return AllCells
    }
    playBoard(){
        let AllCellsjoin = []
        let allTargets = game.target()
        let strips = game.strips()
        let header2 = game.header2()
        AllCellsjoin.push(game.header())
        AllCellsjoin.push(header2)
        AllCellsjoin.push((' ')+strips) 
        for(var k = 0 ; k < allTargets.length ; k ++){
            if(k<9){
                AllCellsjoin.push((' ')+(k+1)+(' | ')+allTargets[k].join(' | ')+(' | '))
                AllCellsjoin.push((' ')+strips) 
        }else{
            AllCellsjoin.push(k+1+(' | ')+allTargets[k].join(' | ')+(' | '))
            AllCellsjoin.push((' ')+strips) 
        }
        }
        return AllCellsjoin
    }
}

var game = new gameboard(thisisA,thisis1)

module.exports = gameboard;


if(command==""){
    console.log("you can shoot twice, ex index.js A1 A3")
}else{console.log(game.playBoard(thisisA,thisis1))}
