const input = process.argv;

function board() {
    let alfabet = 'ABCDEFGHIJ'
    let boards = []

    for(let row=0; row<=10; row++) {
        let rows = []

        for(let col=0; col<=10; col++) {
            if(row === 0) {
                if(col === 0) {
                    rows.push(' ')
                } else {
                    rows.push(col)
                }
            } else if(row !== 0 && col !== 0) {
                rows.push(alfabet[row-1])
            } else {
                rows.push(' ')
            }
        }
        boards.push(rows)
    }
    return boards
}
console.table(board())

