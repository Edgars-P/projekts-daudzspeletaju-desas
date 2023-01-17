import { get, writable } from "svelte/store";
import { userId } from "./database";

interface Player {
  user: string;
  game: string;
  npk: number;
  simbols: string;
}

export default class TicTacToe {
  private boardSize: number;
  private pb: any;
  private updateServer = false;
  public playerLabels = ["X", "O", "Y", "Z", "M"];
  public players = writable<Player[]>([]);
  public currentPlayingPlayer = writable<number>();
  public myPlayerSymbol = writable<number>(0);
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
    this.currentPlayingPlayer.set(0);
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

    // Dabu spēlē esošos spēlētājus
    this.players.set(
      (await this.pb.collection("speletaji").getList(1, 50, {
        filter: `game="${spelesID}"`,
        expand: "user"
      })).items,
    );

    console.log(get(this.players));
    

    // Pārbauda vai jau nav pieteicies šai spēlei
    var speletajsRecord;
    try {
      speletajsRecord = (await this.pb.collection("speletaji").getFirstListItem(
        `user="${get(userId)}" && game="${spelesID}"`,
      ));
    } catch (error) {
      console.log(get(this.players));

      const takenSymbols: string[] = get(this.players).map((x) => x.simbols);

      const avalibleSymbols = this.playerLabels.filter((x) =>
        !takenSymbols.includes(x)
      );

      const currentPlayerSymbol = avalibleSymbols[0];

      const gamerRecord = await this.pb.collection("speletaji").create({
        "user": get(userId),
        "game": spelesID,
        "npk": Math.floor(Math.random() * 10000),
        "simbols": currentPlayerSymbol,
      });

      speletajsRecord = gamerRecord;
    }

    // Ienāk spēlē
    this.myPlayerSymbol.set(this.playerLabels.indexOf(speletajsRecord.simbols));
    //await this.pb.collection("spele").update(spelesID, {
    //  "aktivais_speletajs": speletajsID,
    //});

    this.gamerId = speletajsRecord.id;
    this.recordId = spelesID || "";

    const currentGameState = await this.pb.collection("spele").getOne(spelesID);

    console.log(currentGameState);

    this.board.set(currentGameState.laukums);

    // Sinhronizē izmaiņas spēles laukumā
    this.board.subscribe((value) => {
      // Citādi bezgalīgs cikls
      if (!this.updateServer) return;
      this.updateServer = false;
      this.pb.collection("spele").update(this.recordId, {
        laukums: JSON.stringify(value),
        aktivais_speletajs: get(this.currentPlayingPlayer),
      });
    });
    this.pb.collection("spele").subscribe(this.recordId, (e: any) => {
      this.board.set(e.record.laukums);
      this.currentPlayingPlayer.set(e.record.aktivais_speletajs);
    });

    // Sinhronizē spēlētāju sarakstu
    this.pb.collection("speletaji").subscribe("*", async (e: any) => {
      this.players.set(
        (await this.pb.collection("speletaji").getList(1, 50, {
          filter: `game="${spelesID}"`,
          expand: "user"
        })).items,
      );

      console.log(get(this.players));
    });
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

    if (get(this.currentPlayingPlayer) !== get(this.myPlayerSymbol)) {
      return false
    }

    let newBoard = get(this.board);
    newBoard[row][col] = get(this.currentPlayingPlayer);

    this.currentPlayingPlayer.update((prev) =>
      (prev + 1) % get(this.players).length
    );

    this.updateServer = true;
    this.board.set(newBoard);

    return true;
  }

  public checkWin(player: string): boolean {
    return checkIfWon(this.board, player);
  }

  public log(): void {
    console.log(this.board);
  }
}
