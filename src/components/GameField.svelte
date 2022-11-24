<script lang="ts">
  export let board: number[][]
  export let players: string[]
  // ["X", "O"]
  export let currentPlayer: string
    // [ [0, 0, 0], [0, 0, 0], [0, 0, 0,] ]
</script>

<div>

  {#each board as row}
    <div>
      {#each row as field}
       <div>
        {#if field != -1}
          {players[field]}
        {/if}
       </div>
      {/each}
    </div>
  {/each}
</div>