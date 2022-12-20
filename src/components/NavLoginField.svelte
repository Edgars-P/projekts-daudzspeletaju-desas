<script>
  import {userId, pb} from "../scripts/database"

  async function loadAuth(iuserId) {
    if (iuserId === undefined) {
      return false
    }

    let user = await pb.collection('lietotaji').getOne(iuserId)
    return user.username
  }
</script>

{#await loadAuth($userId)}
  <li>Ielādē...</li>
{:then username} 
  {#if !username}
    <li><a href="/login">Ienākt vai Reģistrēties</a></li>
  {/if}
  <li><a href="#">{username}</a></li>
{/await}