class BattleShip{
    constructor(size){
        this.board=[]
        this.size=size
        this.koordinat=[]
    }
    displayBoard(){
        let huruf='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 0; i <= this.size; i++) {
            let temp=[]
            if(i!==0){
                temp.push(huruf[i-1])
            }else if(i==0) {
                temp.push(' ')
            }
            for (let j = 0; j <=this.size; j++) {
                if(i==0){
                    if(j==0){
                        continue
                    }else if(j>0&&j<10){
                        temp.push(j)
                    }else if(j==10){
                        temp.push(j+'|')
                    }
                }else{
                    temp.push(' ')
                }
               
            }
            this.board.push(temp)
        }
        return this
    }
  
    random(lawan){
        let huruf='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let exist=false
        let acak
        let x
        do {
            acak=Math.floor(Math.random()*(this.size-lawan.size))+1
            x = Math.floor(Math.random()*10)+1
            exist=true
            for (let i = acak; i < acak+lawan.size; i++) {
                if(this.board[i][x]!==' ' || this.board[x][i]!==' '){
                    exist=false
                    break
                }
            }
        } while (exist==false);
        
        let random=Math.round(Math.random())
        if(random==1){
            for (let i = acak; i < acak+lawan.size; i++) {
                this.board[i][x]=lawan.simbol
                this.koordinat.push(`${huruf[i-1]}${x}`)
            }
        }else{
            for (let i = acak; i < acak+lawan.size; i++) {
                this.board[x][i]=lawan.simbol
                this.koordinat.push(`${huruf[x-1]}${i}`)
            }
        } 
    }
    target(){
        let angka=0
        const bom=process.argv
        let huruf='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let x=''
        let kolomBom=0
        let barisBom=0
        let y=''
        let barisKoor=0
        let kolomKoor=0
        // console.log(this.koordinat)
        for (let i = 2; i < bom.length; i++) {
            let flag=true
            x=bom[i][0]
            if(bom[i].length==3){
                kolomBom=bom[i][1]+bom[i][2]
            }else{
                kolomBom=bom[i][1] 
            }
            for (let k = 0; k < huruf.length; k++) {
                if(x==huruf[k]){
                    barisBom=k+1
                    break
                }
            }
            for (let j = 0; j < this.koordinat.length; j++) {
                y=this.koordinat[j][0]
                if(this.koordinat[j].length==3){
                    kolomKoor=this.koordinat[j][1]+this.koordinat[j][2]
                }else{
                    kolomKoor=this.koordinat[j][1]
                }
                for (let l = 0; l < huruf.length; l++) {
                    if(y==huruf[l]){
                        barisKoor=l+1
                        break
                    }
                }
                if(barisBom==barisKoor&&kolomBom==kolomKoor){
                    this.board[barisKoor][kolomKoor]='X'
                    angka++
                    flag=false
                    break
                }
                if(flag==false){
                    break
                }
            }
            if(flag==false){
                continue
            }else{
                this.board[barisBom][kolomBom]='/'
            }
        }
        console.log(`Jumlah musuh yang ditenggelamkan ${angka}`)
    }
}
class Fleet{
    constructor(name,size,simbol){
        this.name=name
        this.size=size
        this.simbol=simbol
    }
}
let game=new BattleShip(10)
let x=game.displayBoard()
game.random(new Fleet('Aircraft Carrier',5,'*'))
game.random(new Fleet('Battleship',4,'%'))
game.random(new Fleet('Cruiser',3,'#'))
game.random(new Fleet('Destroyer',2,'@'))
console.log((x.board).map(e => e.join('|')).join('\n'))
game.target()
console.log((x.board).map(e => e.join('|')).join('\n'))

//Test case node index.js A3 B5 C7 D8 E1 F9 G10 H2 J4 I6