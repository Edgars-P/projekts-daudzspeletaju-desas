let board = [
    [-1, 0, 0],
    [-1, 0, -1],
    [ 0, 1, 0]
]

function HasWon(board: number[][]) : number {
  if (board[0][0]==0 && board[0][1]==0 && board[0][2] == 0){
    return 0
  }
  if (board[1][0]==0 && board[1][1]==0 && board[1][2] == 0){
    return 0
  }
  if (board[2][0]==0 && board[2][1]==0 && board[2][2] == 0){
    return 0
  }
  if (board[0][0]==0 && board[1][0]==0 && board[2][0] == 0){
    return 0
  }
  if (board[0][1]==0 && board[1][1]==0 && board[2][1] == 0){
    return 0
  }
  if (board[0][2]==0 && board[1][2]==0 && board[2][2] == 0){
    return 0
  }
  if (board[0][0]==0 && board[1][1]==0 && board[2][2] == 0){
    return 0
  }
  if (board[2][0]==0 && board[1][1]==0 && board[0][2] == 0){
    return 0
  }
  
}

console.log(HasWon(board))