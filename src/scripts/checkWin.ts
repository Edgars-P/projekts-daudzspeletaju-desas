export function checkWin(board: number[][]) {
  let winSquaresx = [
    [0, 1, 2].map((x) => [[x, 0], [x, 1], [x, 2]]),
  ].flat();

  let winSquaresy = [
    [0, 1, 2].map((x) => [[0, x], [1, x], [2, x]]),
  ].flat();

  let winSquaresdiag1 = [
    [0, 1, 2].map((x) => [x, x]),
  ];

  let winSquaresdiag2 = [
    [0, 1, 2].map((x) => [2 - x, x]),
  ];

  let allWinSquares = [
    ...winSquaresx,
    ...winSquaresy,
    ...winSquaresdiag1,
    ...winSquaresdiag2
  ];


  for (const winCondition of allWinSquares) {
    let winningPlayer = -1
    let winningPlayerCount = 0

    for (const position of winCondition) {
      let currentPlayerInPos = board[position[0]][position[1]]
      
      console.log(currentPlayerInPos, winningPlayerCount)
      
      if (currentPlayerInPos !== -1) {
        if (winningPlayer !== currentPlayerInPos) {
          winningPlayerCount = 0
          winningPlayer = currentPlayerInPos
        }
        winningPlayerCount++
      }
      
      if (winningPlayerCount >= 3) {
        return winningPlayer ?? false
      }

    }

    winningPlayer = -1
    winningPlayerCount = 0
  }

  return false
}