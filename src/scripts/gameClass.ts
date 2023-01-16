import { get, writable } from "svelte/store";
import { userId } from "./database";

export default class TicTacToe {
  private boardSize: number;
  private pb: any;
  public currentPlayer = writable<number>();
  public playerLables = writable<string[]>([]);
  public board = writable<number[][]>([]);
  public recordId: string | undefined = undefined;
  public gamerId: string | undefined = undefined;

  constructor(
    boardSize: number,
    players: string[],
    pb: any,
  ) {
    this.boardSize = boardSize;
    this.board.set(
      Array(boardSize)
        .fill(null)
        .map(() => Array(boardSize).fill(-1)),
    );
    this.playerLables.set(players);
    this.currentPlayer.set(0);
    this.pb = pb;
  }

  public async joinGame(spelesID: string | null) {
    if (spelesID === null) {
      const data = {
        "laukums": get(this.board),
        "aktivais_speletajs": undefined,
        "lideris": get(userId),
      };
      const gameRecord = await this.pb.collection("spele").create(data);

      spelesID = gameRecord.id;
    }

    // Pārbauda vai jau nav pieteicies šai spēlei
    var speletajsID;
    try {
      speletajsID =
        (await this.pb.collection("speletaji").getFirstListItem(
          `user="${get(userId)}" && game="${spelesID}"`,
        )).id;
    } catch (error) {
      const gamerRecord = await this.pb.collection("speletaji").create({
        "user": get(userId),
        "game": spelesID,
        "npk": 123,
      });

      speletajsID = gamerRecord.id;
    }

    // Ienāk spēlē
    await this.pb.collection("spele").update(spelesID, {
      "aktivais_speletajs": speletajsID,
    });

    this.gamerId = speletajsID;
    this.recordId = spelesID || "";

    const currentGameState = await this.pb.collection('spele').getOne(spelesID)

    console.log(currentGameState);
    

    this.board.set(currentGameState.laukums)

    // Sinhronizē izmaiņas
    this.board.subscribe(value => {
      this.pb.collection('spele').update(this.recordId, {laukums: JSON.stringify(value)});
    })
  }

  public async play(row: number, col: number): Promise<boolean> {
    if (
      row < 0 ||
      row >= this.boardSize ||
      col < 0 ||
      col >= this.boardSize ||
      get(this.board)[row][col] !== -1
    ) {
      return false;
    }

    let newBoard = get(this.board)
    newBoard[row][col] = get(this.currentPlayer)
    this.board.set(newBoard)

    this.currentPlayer.update(prev => (prev + 1) % get(this.playerLables).length);

    return true;
  }

  public checkWin(player: string): boolean {
    return checkIfWon(this.board, player);
  }

  public log(): void {
    console.log(this.board);
  }
}
