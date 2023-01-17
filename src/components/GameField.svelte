<script lang="ts">
  export let board: number[][];
  export let players: string[];
  // ["X", "O"]
  // [ [0, 0, 0], [0, 0, 0], [0, 0, 0,] ]

  export let playFunction: ((row: number, col: number) => any) | undefined = undefined
</script>

<table>
  {#each board as row, ir}
    <tr>
      {#each row as field, ic}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <td on:click={playFunction?.call(undefined, ir, ic) ?? null}>
          {#if field != -1}
            {players[field]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</table>

<style>
  table {
    border-spacing: 0.5rem;
  }
 
  td {
    background: #ffffff99; 
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;

    margin: 0.5rem;
  }
</style>
