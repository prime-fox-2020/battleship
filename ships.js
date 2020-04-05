
let Board = require('./index.js')

class ships{
    constructor(){
        this.destroyer = this.DestroyerF()
        this.battleCruiser = this.BattleCruiserF()
        this.cruiser = this.CruiserF()
        this.explorer = this.ExplorerF()
    }
        DestroyerF(){
        let coordinate;
        let indexA = Math.floor(Math.random() * 10)
        let index1 = Math.floor(Math.random() * 10) 
        if(indexA+4 > 9 || index1+4 > 9){
            return this.DestroyerF()
            }else{

            if((Math.round(Math.random())? true : false) == true){
                var tempCoordinate= 
                [[indexA,index1],
                [indexA+1,index1],
                [indexA+2,index1],
                [indexA+3,index1],
                [indexA+4,index1]]
                } else {
                    tempCoordinate = 
                [[indexA,index1],
                [indexA,index1+1],
                [indexA,index1+2],
                [indexA,index1+3],
                [indexA,index1+4]]
                }
                coordinate = tempCoordinate
                return coordinate
            }
        }

        BattleCruiserF(){
        let crash = this.destroyer
        let coordinate;
        let indexA = Math.floor(Math.random() * 10)
        let index1 = Math.floor(Math.random() * 10) 
        if(indexA+4 > 9 || index1+4 > 9){
            return this.BattleCruiserF()
            }else{
            if((Math.round(Math.random())? true : false) == true){
                var tempCoordinate= 
                [[indexA,index1],
                [indexA+1,index1],
                [indexA+2,index1],
                [indexA+3,index1]]
                } else {
                    tempCoordinate = 
                [[indexA,index1],
                [indexA,index1+1],
                [indexA,index1+2],
                [indexA,index1+3]]
                }
                coordinate = tempCoordinate
            }
            let condition = true
            for(var i = 0 ; i < crash.length ; i++){
                for(var j = 0 ; j < coordinate.length ; j++){
                    if(crash[i]==coordinate[j]){
                        condition = false
                    }
                }
            }
            if(condition == false){
                BattleCruiserF()
            }else{
                return coordinate
            }

        }

        CruiserF(){
        let crash=[]
        for(var i = 0 ; i < this.destoryer ; i ++){
            crash.push(this.destoryer[i])
        }
        for(var i = 0 ; i < this.battleCruiser ; i ++){
            crash.push(this.battleCruiser[i])
        }
        
        let coordinate;
        let indexA = Math.floor(Math.random() * 10)
        let index1 = Math.floor(Math.random() * 10) 
        if(indexA+4 > 9 || index1+4 > 9){
            return this.CruiserF()
            }else{
            if((Math.round(Math.random())? true : false) == true){
                var tempCoordinate= 
                [[indexA,index1],
                [indexA+1,index1],
                [indexA+2,index1]]
                } else {
                    tempCoordinate = 
                [[indexA,index1],
                [indexA,index1+1],
                [indexA,index1+2]]
                }
                coordinate = tempCoordinate

            }

            let condition = true
            for(var i = 0 ; i < crash.length ; i++){
                for(var j = 0 ; j < coordinate.length ; j++){
                    if(crash[i]==coordinate[j]){
                        condition = false
                    }
                }
            }
            if(condition == false){
                BattleCruiserF()
            }else{
                return coordinate
            }
        }

        ExplorerF(){
        let crash=[]
        for(var i = 0 ; i < this.destoryer ; i ++){
            crash.push(this.destoryer[i])
        }
        for(var i = 0 ; i < this.battleCruiser ; i ++){
            crash.push(this.battleCruiser[i])
        }
        for(var i = 0 ; i < this.cruiser ; i ++){
            crash.push(this.cruiser[i])
        }

        let coordinate ;
        let tempCoordinate = [[Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)]];
        coordinate = tempCoordinate

        let condition = true
        for(var i = 0 ; i < crash.length ; i++){
            for(var j = 0 ; j < coordinate.length ; j++){
                if(crash[i]==coordinate[j]){
                    condition = false
                }
            }
        }
        if(condition == false){
            ExplorerF()
        }else{
            return coordinate
        }
    }
}



module.exports = ships;