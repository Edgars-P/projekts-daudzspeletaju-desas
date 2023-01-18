<script>
    import { pb, userId } from "../scripts/database";
    import TicTacToe from "../scripts/gameClass";
    import GameField from "./GameField.svelte";

    let joinId = ""


    async function createGameAndRedirect() {
      const game=new TicTacToe(3,["x"],pb)
      await game.joinGame(null)
      location.href = "/game#" + game.recordId
    }
 
</script>


<div class="wrap">
  <GameField board={[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]} players={["X", "O"]}/>
  {#if $userId !== undefined}
    <button on:click={createGameAndRedirect}>Jauna spēle</button>

    <div class="join">
      <input type="text" bind:value={joinId} placeholder="Spēles kods">
      <a href="/game#{joinId}">
        <button>Pievienoties!</button>
      </a>
    </div>
  {:else}
    <button>Lūdzu reģistrēties vai pierakstīties!</button>
  {/if}
</div>

<style>
  div.wrap {
    width: max-content;
    margin: auto;
    display: grid;
    grid-template-rows: max-content 3rem 3rem;
    gap: 1rem
  }

  label {
    background: #ffffff99;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 5rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 1rem;
    overflow: hidden;
  }
  label span {
    padding-left: 0.5rem;
  }
  label input {
    margin: 0;
    padding: 0;
    border: none;
    background: #ffffffcc;
    text-align: center;
    font-size: 1.3rem;
  }
  button {
    background: #ffffffcc;
    border: none;
    border-radius: 1rem;
  }

  .join {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 0.2rem
  }

  .join button {
    height: 100%;
  }

  .join input {
    background: #fffc;
    border: none;
    border-radius: 0.5rem;
  }
</style>