<script lang="ts">
  export let board: number[][];
  export let players: string[];

  export let enableEmptyEffect = true;
  // ["X", "O"]
  // [ [0, 0, 0], [0, 0, 0], [0, 0, 0,] ]

  export let playFunction: ((row: number, col: number) => any) | undefined = undefined
</script>

<table>
  {#each board as row, ir}
    <tr>
      {#each row as field, ic}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <td on:click={playFunction?.call(undefined, ir, ic) ?? null} class="{field==-1 && enableEmptyEffect && "empty"}">
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
    background: #ffffff88; 
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;

    margin: 0.5rem;

    font-size: 3rem;
    text-align: center;

    cursor: not-allowed;

    transition: background 0.3s, border-radius 0.3s;
  }

  td.empty {
    border-radius: 0.5rem;
    cursor: pointer;
    background: #ffffffaa; 
  }

  td.empty:hover {
    background: #ffffffee;
    border-radius: 1rem;
  }
</style>
