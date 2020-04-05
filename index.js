// Your code here
function battleShip(){
  let papan = []
  let abjad = " ABCDEFGHIJ"
  let ships = [
      {
          name: 'Aircraft Carrier',
          size: 5,
          pic : '🛩️'
      }, {
          name: 'Battleship',
          size: 4,
          pic :'🚢'
      }, {
          name: 'Cruiser',
          size: 3,
          pic : '⛵'
      }, {
          name: 'Destroyer',
          size: 2,
          pic : '🚀'
      }
  ]

  for (let i = 10 ; i >= 0 ; i--){
      let temp = []
      for (let j = 0 ; j <=10 ; j++){
          if (i == 0 ){
              if (abjad[j] === " "){
                  temp.push("")
              }else{
                  temp.push(`${abjad[j]}`)
              }
              // temp.push('+---------------------------------------+\n')             
          }else
          if(j == 0){
                  temp.push(i)
          }else
          {
              temp.push(" ")
          }
          // temp.push('+---------------------------------------+\n')
      }
      // papan.push(temp.join(''),'\n')
      // papan.push(temp,'\n')
      papan.push(temp)
  }

  for (let i = 0 ; i < ships.length ; i++){
      let print = true
      while (print === true){
          let randomX = random()
          let randomY = random()
          //print diagonal kanan
          if (randomX + ships[i].size < 10 ){
              let isValid = true
              for (let j = 0 ; j < ships[i].size ; j++){
                  if (papan[randomX+j][randomX+j] !== " "){
                      isValid = false
                  }
              }
              if (isValid){
                  for (let j = 0 ; j < ships[i].size ; j++){
                      papan[randomX+j][randomX+j] = ships[i].pic
                  }
                  print = false    
              }
          }else
          //print diagonal kiri
          if (randomY - ships[i].size > 0 && randomX + ships[i].size <= 10){
              let isValid = true
              for (let j = 0 ; j < ships[i].size ; j++){
                  if (papan[randomY-j][randomX+j] !== " " ){
                      isValid = false
                  }
              }
              if (isValid){
                  for (let j = 0 ; j < ships[i].size ; j++){
                      papan[randomY-j][randomX+j] = ships[i].pic
                  }
                  print = false    
              }
          }else
          //print bawah
          if (randomX + ships[i].size < 10){ 
              let isValid = true
              for (let j = 0 ; j < ships[i].size ; j++){
                  if (papan[randomX+j][randomY] !== " " ){
                      isValid = false
                  }
              }
              if (isValid){
                  for (let j = 0 ; j < ships[i].size ; j++){
                      papan[randomX+j][randomY] = ships[i].pic
                  }
                  print = false    
              }
          }else 
          //print kanan
          if(randomY + ships[i].size < 10){
              let isValid = true
              for (let j = 0 ; j < ships[i].size ; j++){
                  if (papan[randomX][randomY+j] !== " " ){
                      isValid = false
                  }
              }
              if (isValid){
                  for (let j = 0 ; j < ships[i].size ; j++){
                      papan[randomX][randomY+j] = ships[i].pic
                  }
                  print = false    
              }    
          }
      }
  }

  let argv = process.argv;
  let commands = argv.slice(2)
  let arrX = []
  if (commands.length > 10){
      return `Maksimal 10 Bom`
  }else
  if (commands.length == 0){
      return `Anda belum memasukkan kordinat Bom, contoh : A7 G3 E9 dst`
  }else
  {
      for (let i = 0 ; i < commands.length ; i++){
          if(commands[i].length == 1 || (commands[i].length == 3 && commands[i][1] != 1) || commands[i].length >= 4){
              return `Koordinat salah, silahkan periksa koordinat yang anda input`
          }
          else
         if(commands[i].length == 3 && commands[i][2] == 0 && commands[i][1] == 1 ){
              for (let j = 0 ; j < abjad.length ; j++){
                  if(commands[i][0].toUpperCase() == abjad[j]){
                      arrX.push([10-Number(commands[i][1]+0),j])
                  }
              }
          }else if (commands[i].length == 2 && (commands[i][1] == 1 ||commands[i][1] == 2 ||commands[i][1] == 3 ||commands[i][1] == 4 ||commands[i][1] == 5 ||commands[i][1] == 6 ||commands[i][1] == 7 ||commands[i][1] == 8 ||commands[i][1] == 9 )&& commands[i][1] != 0 && (commands[i][0].toUpperCase() == "A" ||commands[i][0].toUpperCase() == "B" ||commands[i][0].toUpperCase() == "C" ||commands[i][0].toUpperCase() == "D" ||commands[i][0].toUpperCase() == "E" ||commands[i][0].toUpperCase() == "F" ||commands[i][0].toUpperCase() == "G" ||commands[i][0].toUpperCase() == "H" ||commands[i][0].toUpperCase() == "I" ||commands[i][0].toUpperCase() == "J")){
              for (let j = 0 ; j < abjad.length ; j++){
                  if(commands[i][0].toUpperCase() == abjad[j]){
                      arrX.push([10-Number(commands[i][1]),j])
                  }
              }
          }else{
              return `Koordinat salah, silahkan periksa koordinat yang anda input`
          }
      }    
  }
  let countA = 0
  let countB = 0
  let countC = 0
  let countD = 0

  for (let i = 0 ; i < arrX.length ; i++){
      if (papan[arrX[i][0]][arrX[i][1]] == "🛩️"){
          papan[arrX[i][0]][arrX[i][1]] = "💥"
          countA++
      }else
      if (papan[arrX[i][0]][arrX[i][1]] == "🚢"){
          papan[arrX[i][0]][arrX[i][1]] = "💥"
          countB++
      }else
      if (papan[arrX[i][0]][arrX[i][1]] == "⛵"){
          papan[arrX[i][0]][arrX[i][1]] = "💥"
          countC++
      }else
      if (papan[arrX[i][0]][arrX[i][1]] == "🚀"){
          papan[arrX[i][0]][arrX[i][1]] = "💥"
          countD++
      }
      else{
          papan[arrX[i][0]][arrX[i][1]] = "💣"
      }
  }
  console.clear()
  console.log(papan)
  return `
  🛩️  Aircraft Carrier  : ${countA} \n
  🚢  Battleship  : ${countB} \n
  ⛵  Cruiser  : ${countC} \n
  🚀  Destroyer : ${countD}
  `
}

function random(){
  return Math.floor(Math.random()*9)+1
}

console.log(battleShip())