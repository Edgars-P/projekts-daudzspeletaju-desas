<script lang="ts">
  export let board: number[][];
  export let players: string[];
  // ["X", "O"]
  export let currentPlayer: string;
  // [ [0, 0, 0], [0, 0, 0], [0, 0, 0,] ]
</script>

<table>
  {#each board as row}
    <tr>
      {#each row as field}
        <td>
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
