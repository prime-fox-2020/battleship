
let Board = require('./index.js')

class ships{
    constructor(){
        this.explorer = [[Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)]];


        this.cruiser = [[4,5],[5,5],[6,5]]


        this.battleCruiser = [[5,1],[6,1],[7,1],[8,1]]
        
        this.destroyer = this.destroyerF()
        // let indexA ;
        // let index1 ;
        // while (indexA+4 > 10 || index1+4 > 10){
    }
        destroyerF(){

        let indexA = Math.floor(Math.random() * 10)
        let index1 = Math.floor(Math.random() * 10) 
        if(indexA+4 > 9 || index1+4 > 9){
            console.log(indexA+4)
            console.log(index1+4)
            return this.destroyerF()
        }else{

        if((Math.round(Math.random())? true : false) == true){
            var destroyerFA= 
            [[indexA,index1],
            [indexA+1,index1],
            [indexA+2,index1],
            [indexA+3,index1],
            [indexA+4,index1]]
             } else {
             destroyerFA = 
            [[indexA,index1],
            [indexA,index1+1],
            [indexA,index1+2],
            [indexA,index1+3],
            [indexA,index1+4]]
            }
            console.log(destroyerFA)
            return destroyerFA
        }
    }

}

module.exports = ships;