<script lang="ts">
    import GameField from "./GameField.svelte";
    import Game from  "../scripts/gameClass"
    import {pb} from '../scripts/database';
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const gameField = writable({
        "laukums": [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]],
        "aktivais_speletajs": "RELATION_RECORD_ID",
        "lideris": "RELATION_RECORD_ID"
    })

    let game = writable(new Game(0,[],null))

    let {board} = $game

    onMount(async () => {
        const gameRecord = await pb.collection('spele').getOne(location.hash.substring(1));

        $game = new Game(gameRecord.laukums.length, ["X", "O", "Y"], pb) 
        $game.joinGame(location.hash.substring(1))

        board = $game.board
    })
</script>

<h2>Līderis: {$gameField.lideris}</h2>
<h2>Spēlē: {$gameField.aktivais_speletajs}</h2>

<button on:click={() => $game.play(0, 0)}>Test</button>

<GameField board={$board} currentPlayer={"O"} players={["X", "O"]}>

</GameField>