// Your code here


class Armada{
    constructor(data, lautan){
        this.size = data
        this.lautan = lautan

    }

    letakKapal(){
        for (let i = 0; i < this.size.length; i++) {
            let cek = true;
            while(cek){
                // Cek Arah Kapal
                let m = Math.round(Math.random());

                if(m == 0){
                    // cek koordinat Awal
                    let a = Math.round(Math.random() * 9) 
                    let b = Math.round(Math.random() * (9-this.size[i]))

                    cek = false
                    for (let j = a; j < this.lautan.length; j++) {
                        for (let k = b; k < this.size[i]+b; k++) {
                            if(this.lautan[j][k]!=' ' ){
                                cek = true
                            }
                        }
                        if(cek==false){
                            for (let p = b; p < this.size[i]+b; p++) {
                                 this.lautan[j][p]=(this.size[i])
                            }
                            break;
                        }
                    }
                }
                if(m == 1){
                    // cek koordinat awal
                    let a = Math.round(Math.random() * (9-this.size[i])) 
                    let b = Math.round(Math.random() * 9)

                    cek = false
                    for (let j = b; j < this.lautan.length; j++) {
                        for (let k = a; k < this.size[i]+a; k++) {
                            if(this.lautan[k][j]!=' '){
                                cek = true
                            }
                        }
                        if(cek==false){
                            for (let p = a; p < this.size[i]+a; p++) {
                                 this.lautan[p][j]=(this.size[i])
                            }
                            break;
                        }
                    }
                }
            }
        }
        console.log(`----Armada Sebelum-----`)
        console.log(`------Penyerangan------`)
        lautan.display()
        console.log(`-----------------------\n`)
        return this

    }

    tembakan(dataInputUser){
        let huruf= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 0; i < dataInputUser.length; i++) {
            //Mencari Koordinat Dari Input User
            let x = Number(dataInputUser[i][1])
            let y;
            for (let j = 0; j < huruf.length; j++) {
                if (dataInputUser[i][0]==huruf[j]){
                    y = j;
                }
            }

            if(this.lautan[x][y]!=' '){
                this.lautan[x][y] = 'X'
            }else{
                this.lautan[x][y] = '/'
            }
        }
    }
}


class Lautan{
    constructor(armada){
        this.armada = armada
    }

    display(){
        console.log(`   A B C D E F G H I J `)
        for (let i = 0; i < this.armada.length; i++) {
            var temp =`${i} |`
            for (let j = 0; j < this.armada[i].length; j++) {
                temp += `${this.armada[i][j]}|`
            }
            console.log(temp)
        }
    }
}




let armada = [];

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10 ; j++) {
        if(armada[i]==undefined){
            armada[i]= [];
            armada[i].push([' '])
        }else{
            armada[i].push([' '])
        }    
    }
}
let dataInputUser=[];

for (let i = 2; i < process.argv.length; i++) {
    dataInputUser.push(process.argv[i])
}

let data = [5,4,3,2]
let armadaPerang = new Armada(data,armada)
let lautan = new Lautan(armadaPerang.lautan)

armadaPerang.letakKapal()

armadaPerang.tembakan(dataInputUser)
console.log(`----Armada Sesudah-----`)
console.log(`------Penyerangan------`)
lautan.display()

