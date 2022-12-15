export default class TicTacToe {
  private boardSize: number;
  private board: string[][];
  private players: string[];
  private currentPlayer: number;
  private pb: any;
  private recordId: string;

  constructor(boardSize: number, players: string[], pb: any, recordId: string) {
    this.boardSize = boardSize;
    this.board = Array(boardSize)
      .fill(null)
      .map(() => Array(boardSize).fill(' '));
    this.players = players;
    this.currentPlayer = 0;
    this.pb = pb;
    this.recordId = recordId;
  }

  public async play(row: number, col: number): Promise<boolean> {
    if (
      row < 0 ||
      row >= this.boardSize ||
      col < 0 ||
      col >= this.boardSize ||
      this.board[row][col] !== ' '
    ) {
      return false;
    }
    this.board[row][col] = this.players[this.currentPlayer];
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;

    // Update the game field in the database
    const data = { laukums: this.board };
    await this.pb.collection('spele').update(this.recordId, data);

    return true;
  }

  public checkWin(player: string): boolean {
    return checkIfWon(this.board, player);
  }

  public log(): void {
    console.log(this.board);
  }
}
