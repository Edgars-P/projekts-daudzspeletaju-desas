<script>
  import {userId, pb, logout} from "../scripts/database"

  async function loadAuth(iuserId) {
    if (iuserId === undefined) {
      return false
    }

    let user = await pb.collection('lietotaji').getOne(iuserId)
    return user.username
  }
</script>

{#await loadAuth($userId)}
  <li><a href="#">Ielādē...</a></li>
{:then username} 
  {#if !username}
    <li><a href="/login">Ienākt vai Reģistrēties</a></li>
  {:else}
    <li><a href="#">{username}</a></li>
    <li><a href="#" on:click={logout}><i class="bi bi-box-arrow-left"></i></a></li>
  {/if}
{/await}