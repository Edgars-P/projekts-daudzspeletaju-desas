import { derived, get, writable } from "svelte/store";
import { checkWin } from "./checkWin";
import { pb, userId } from "./database";

interface Player {
  user: string;
  game: string;
  npk: number;
  simbols: string;
  expand: Record<string, any>
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
  public isWon = derived([this.board], (b) => checkWin(b[0]))

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

    // Pārbauda vai spēle eksistē
    try {
      await this.pb.collection("spele").getOne(spelesID);
    } catch (error) {
      // Ja nē, pāradresē uz sākumalpu
      alert("Atvienots internets vai spēle neeksistē!\nJūs tiksiet pāradresēts.")
      location.href = "/"
    }

    
    // Dabu spēlē esošos spēlētājus
    this.recordId = spelesID || "";
    await this.updatePlayers()

    // Pārbauda vai jau nav pieteicies šai spēlei
    var speletajsRecord;
    try {
      speletajsRecord = (await this.pb.collection("speletaji").getFirstListItem(
        `user="${get(userId)}" && game="${spelesID}"`,
      ));
    } catch (error) {

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
    await this.updatePlayers()
    //await this.pb.collection("spele").update(spelesID, {
    //  "aktivais_speletajs": speletajsID,
    //});

    this.gamerId = speletajsRecord.id;

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
      await this.updatePlayers()
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

    // Neatļaut gājienus ja ir uzvara
    if(get(this.isWon) !== false) {
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

  public log(): void {
    console.log(this.board);
  }

  private async updatePlayers() {
    this.players.set(
      (await this.pb.collection("speletaji").getList(1, 50, {
        filter: `game="${this.recordId}"`,
        expand: "user"
      })).items,
    );
  }
}

class User{
  private gameId:string
  private playerId:string
  constructor(gameId:string, playerId:string){
    this.gameId = gameId
    this.playerId = playerId
  }
  async exists(){
    //pārbauda vai spēlētājs eksistē
    try {
      (await pb.collection("speletaji").getFirstListItem(
        `user="${(this.playerId)}" && game="${this.gameId}"`,
      )) 
      return true
    } catch (error) {
      return false
    }
  }
  async join(){
    // ja lietotājs jau ir pievienojies tad neko nedarīt
    if (await this.exists()){
      return true
    }
    // ja lietotājs vēl nav pievienots, viņu pievienot
    const gamerRecord = await pb.collection("speletaji").create({
      "user": this.playerId,
      "game": this.gameId,
      "npk": Math.floor(Math.random() * 10000),
      "simbols": 'O',
    })
    return gamerRecord
  }
  getplayerid(){
    return this.playerId
  }
  getgameid(){
    return this.gameId
  }
}