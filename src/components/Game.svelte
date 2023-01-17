<script lang="ts">
    import GameField from "./GameField.svelte";
    import Game from  "../scripts/gameClass"
    import {pb} from '../scripts/database';
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    const game = new Game(3, [], pb) 
    let show = false

    let {currentPlayingPlayer, players, board, myPlayerSymbol} = game

    onMount(async () => {
        await game.joinGame(location.hash.substring(1))
        show = true

        // Pārlādēt lapu ja nomainās spēles ID
        window.addEventListener("hashchange", ()=>location.reload())
    })
</script>

{#if show}
    
    <h2>Tu esi: {game.playerLabels[$myPlayerSymbol]}</h2>

    <h2>Šobrīd spēlē: {game.playerLabels[$currentPlayingPlayer]}</h2>

    <ul>
        <h2>Spēlētāji:</h2>
        {#each $players as player}
            <li>{player.expand?.user?.username}</li>
        {/each}
    </ul>

    <GameField board={$board} players={["X", "O"]} playFunction={(r,c)=>game.play(r,c)}>

    </GameField>
{/if}