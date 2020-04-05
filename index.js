// Your code here
const index = process.argv.slice(2);
const koordi = index[0].split('');

class ArrayBoard {
    static Arr() {
        let arrBoard = [];

        for (let i = 0; i < 10; i++) {
            let temp = []
            for (let j = 0; j < 10; j++) {
                temp.push(" ")
            }
            arrBoard.push(temp)
        }
        return arrBoard;
    }
}

class InitShip {
    constructor() {

    }

    randomKapal() {
        let koordinat = [];
        for (var i = 1; i < 6; i++) {
            let x = Math.floor(Math.random() * (10-i));
            let y = Math.floor(Math.random() * (10 -i));
            koordinat.push([x,y,i]);
        }
        return koordinat;
    }
    
    insertKapal() {
        let kapal = this.randomKapal()
        let arrayKosong = ArrayBoard.Arr();
        let str = ""
        for (let i = 0; i < kapal.length; i++) {
            let randomVerHor = Math.round(Math.random())
            for (let j = 0; j < kapal[i][2]; j++) {
                if(arrayKosong[i][j] !== " "){
                    kapal[i][0]++
                    kapal[i][1]++
                }else{
                    if(randomVerHor){
                        arrayKosong[kapal[i][0]][kapal[i][1]+j] = kapal[i][2]
                    }else{
                        arrayKosong[kapal[i][0]+j][kapal[i][1]] = kapal[i][2]
                    }
                }
            }
        }
        for (let k = 0; k < arrayKosong.length; k++) {
            for (let l = 0; l < arrayKosong[k].length; l++) {
                if(l == arrayKosong[k].length -1){
                    str+= "|_|"
                }else if(arrayKosong[k][l] == " "){
                    str+="|_"
                }else{
                    str+= "|" + arrayKosong[k][l]
                }
            }
            str+="\n"
        }
        console.log(str)
    }
}
const kapal = new InitShip()
console.log(kapal.insertKapal())