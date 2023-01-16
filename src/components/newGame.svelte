<script>
    import { pb, userId } from "../scripts/database";
    import TicTacToe from "../scripts/gameClass";
    import GameField from "./GameField.svelte";


    async function createGameAndRedirect() {
      const game=new TicTacToe(3,["x"],pb)
      await game.joinGame(null)
      location.href = "/game#" + game.recordId
    }
 
</script>


<div class="wrap">
  <GameField board={[[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]} players={["X", "O"]}/>
  {#if $userId !== undefined}
    <button on:click={createGameAndRedirect}>Uzaicināt!</button>
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
</style>