
let Board = require('./index.js')

class ships{
    constructor(){
        this.explorer = this.ExplorerF()
        this.cruiser = this.CruiserF()
        this.battleCruiser = this.BattleCruiserF()
        this.destroyer = this.DestroyerF()
    }
        DestroyerF(){
        let tempDestroyer;
        let indexA = Math.floor(Math.random() * 10)
        let index1 = Math.floor(Math.random() * 10) 
        if(indexA+4 > 9 || index1+4 > 9){
            return this.DestroyerF()
            }else{

            if((Math.round(Math.random())? true : false) == true){
                var coordinate= 
                [[indexA,index1],
                [indexA+1,index1],
                [indexA+2,index1],
                [indexA+3,index1],
                [indexA+4,index1]]
                } else {
                    coordinate = 
                [[indexA,index1],
                [indexA,index1+1],
                [indexA,index1+2],
                [indexA,index1+3],
                [indexA,index1+4]]
                }
                tempDestroyer = coordinate
                return tempDestroyer
            }
        }

        BattleCruiserF(){
        let tempBattleCruiser;
        let indexA = Math.floor(Math.random() * 10)
        let index1 = Math.floor(Math.random() * 10) 
        if(indexA+4 > 9 || index1+4 > 9){
            return this.BattleCruiserF()
            }else{
            if((Math.round(Math.random())? true : false) == true){
                var coordinate= 
                [[indexA,index1],
                [indexA+1,index1],
                [indexA+2,index1],
                [indexA+3,index1]]
                } else {
                    coordinate = 
                [[indexA,index1],
                [indexA,index1+1],
                [indexA,index1+2],
                [indexA,index1+3]]
                }
                tempBattleCruiser = coordinate
                return tempBattleCruiser
            }
        }

        CruiserF(){
            let tempCruiser;
            let indexA = Math.floor(Math.random() * 10)
            let index1 = Math.floor(Math.random() * 10) 
            if(indexA+4 > 9 || index1+4 > 9){
                return this.CruiserF()
                }else{
                if((Math.round(Math.random())? true : false) == true){
                    var coordinate= 
                    [[indexA,index1],
                    [indexA+1,index1],
                    [indexA+2,index1]]
                    } else {
                        coordinate = 
                    [[indexA,index1],
                    [indexA,index1+1],
                    [indexA,index1+2]]
                    }
                    tempCruiser = coordinate
                    return tempCruiser
                }
            }
        
        ExplorerF(){
           let tempExplorer = [[Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)]];
            return tempExplorer
        }






}

module.exports = ships;