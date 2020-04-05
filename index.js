// Your code here
let input;
let generatedShip;

let shipMaker = () =>{
    let col = 'ABCDEFGHIJ'
    let row = '1234567890'
    let ships = []
    let z = 5
    while(z > 1){
        let ship1 = []
        //generate koordinat awal
        let colMix = Math.floor(Math.random() * 10) // koordinat X
        let rowMix = Math.floor(Math.random() * 10) // koordinat Y
        //Ship 1
        // cek ada di posisi mana koordinat yg baru di generate
        if(colMix < 6 && rowMix < 6){ // klo posisi X Y nya dibawah 6
            if(colMix < rowMix){
                for(let a = 0; a < z; a++){
                    ship1.push(col[colMix+a] + row[rowMix]) //dan klo si Y nya yg lebih besar
                }
            } else {
                for(let a = 0; a < z; a++){
                    ship1.push(col[colMix] + row[rowMix+a])
                }
            }
        } else if(colMix >= 6 && rowMix >= 6){
            if(colMix < rowMix){
                for(let a = 0; a < z; a++){
                    ship1.push(col[colMix] + row[rowMix-a])
                }
            } else {
                for(let a = 0; a < z; a++){
                    ship1.push(col[colMix-a] + row[rowMix])
                }
            }
        } else if(rowMix < 6){
            for(let a = 0; a < z; a++){
                ship1.push(col[colMix] + row[rowMix+a])
            }
        } else if(colMix < 6){
            for(let a = 0; a < z; a++){
                ship1.push(col[colMix+a] + row[rowMix])
            }
        }
        let flag = false
        if(z === 5){
          z--
          ships.push(ship1)
          continue;
        } else {
          for(let q = 0; q < ships.length; q++){
            for(let a = 0; a < ships[q].length; a++){
              for(let b = 0; b < ship1.length; b++){
                if(ships[q][a] === ship1[b]){
                  flag = true
                  break;
                }
              }
              if(flag === true){
                break;
              } 
            }
            if(flag === true){
              break;
            }
          }
        }
        if(flag === true){
          continue;
        } else {
          z--
          ships.push(ship1)
        }
    }
    generatedShip = ships
    console.log('Please run the boardMaker();\nOr shows the enemy by run the showEnemy();')
    return
}

let showEnemy = () =>{
    let decodedEnemy = []
    let enemies = generatedShip
    let list = 'ABCDEFGHIJ'
    console.log('      A   B   C   D   E   F   G   H   I   J   ')
    
    for(let a = 0; a < enemies.length; a++){
      for(let b = 0; b < enemies[a].length; b++){
        let temp2 = []
        for(let c = 0; c < list.length; c++){
          if(enemies[a][b][0] === list[c] && enemies[a][b][1] == 0){
            temp2.push(c)
            temp2.push(10)
            break;
          } else if(enemies[a][b][0] === list[c]){
            temp2.push(c)
            temp2.push(Number(enemies[a][b][1]))
            break;
          }
        }
        decodedEnemy.push(temp2)
      }
      
    }
  
    for(let a = 0; a < 10; a++){
      let printLine = ''
      if(a === 9){
        printLine = `10  | `
      } else {
        printLine = ` ${a+1}  | `
      }
        for(let b = 0; b < 10; b++){
            let flag = false
            for(let c = 0; c < decodedEnemy.length; c++){
                if(decodedEnemy[c][0] === b && decodedEnemy[c][1] === a+1){
                    printLine += 'O | '
                    flag = true
                    break;
                }
            }
            if(flag !== true){
                printLine += '  | '
            }
        }
        console.log(printLine)
    }
}

let boardMaker = () =>{
    if(input === undefined && generatedShip === undefined){
        console.log('Please run the gameStart();\nThen run the shipMaker();')
        return
    } else if(input === undefined) {
        console.log('Please run the gameStart();\nThen run the shipMaker();')
        return
    } else if(generatedShip === undefined){
        console.log('Please randomize the ships by running the shipMaker();')
    }
    let coordinates = input
    let decodedCoor = [] //[[1,3], [2,3] dst]
    let decodedEnemy = []
    let enemies = generatedShip
    let list = 'ABCDEFGHIJ'
    console.log('      A   B   C   D   E   F   G   H   I   J   ')
  
    for(let a = 0; a < coordinates.length; a++){ //turns the coordinates into a array of number, like [2,3] each one. Stay strong, you're doing good
      let temp = []
      for(let b = 0; b < list.length; b++){
        if(coordinates[a][0] === list[b] && coordinates[a][1] == 0){
          temp.push(b)
          temp.push(10)
          break;
        } else if(coordinates[a][0] === list[b]){
          temp.push(b)
          temp.push(Number(coordinates[a][1]))
          break;
        }
      }
      decodedCoor.push(temp)
    }
    
    for(let a = 0; a < enemies.length; a++){
      for(let b = 0; b < enemies[a].length; b++){
        let temp2 = []
        for(let c = 0; c < list.length; c++){
          if(enemies[a][b][0] === list[c] && enemies[a][b][1] == 0){
            temp2.push(c)
            temp2.push(10)
            break;
          } else if(enemies[a][b][0] === list[c]){
            temp2.push(c)
            temp2.push(Number(enemies[a][b][1]))
            break;
          }
        }
        decodedEnemy.push(temp2)
      }
      
    }
  
    for(let a = 0; a < 10; a++){
      let printLine = ''
      if(a === 9){
        printLine = `10  | `
      } else {
        printLine = ` ${a+1}  | ` // ' 1  | '
      }
  
      for(let b = 0; b < 10; b++){ //0,1
        let flag = false
        let flag2 = false
        for(let c = 0; c < decodedCoor.length; c++){
          if(decodedCoor[c][0] === b && decodedCoor[c][1] === a+1){
            for(let d = 0; d < decodedEnemy.length; d++){
              if(decodedCoor[c][0] === decodedEnemy[d][0] && decodedCoor[c][1] === decodedEnemy[d][1]){
                printLine += 'X | '
                flag = true
                break;
              }
            }
            if(flag !== true){
              printLine += '/ | ' 
              flag2 = true
            }
          }
          if(flag === true){
            break;
          }
        }
        if(flag2 !== true && flag !== true){
          printLine += '  | '
        }
      }
      console.log(printLine)
    }
  }

let gameStart = (arr) =>{
    if(arr.length < 14 || arr.length > 14){
        console.log('please type 14 different coordinates\n Example: A5 B3 J1 E9 F2..\n');
        return
    }
    
    for(let a = 0; a < arr.length; a++){
        for(let b = 0; b < arr.length; b++){
            if(a === b){
                continue;
            } else if(arr[a] === arr[b]){
                console.log('please type 14 different coordinates\n Example: A5 B3 J1 E9 F2..');
                return
            }
        }
    }

    input = arr
    console.log('      A   B   C   D   E   F   G   H   I   J   ')
    console.log(' 1  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 2  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 3  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 4  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 5  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 6  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 7  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 8  |   |   |   |   |   |   |   |   |   |   |')
    console.log(' 9  |   |   |   |   |   |   |   |   |   |   |')
    console.log('10  |   |   |   |   |   |   |   |   |   |   |')
    console.log('Please run the shipMaker();')
}

gameStart(['A3', 'B3', 'C7', 'A9', 'G5', 'F4', 'J7', 'D8', 'E6', 'B9', 'D2', 'I1', 'H8', 'G1']);
shipMaker();
showEnemy();
boardMaker();
