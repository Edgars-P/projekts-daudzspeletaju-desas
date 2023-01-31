<script>
  import { userId, pb, logout, user } from "../scripts/database";

  async function loadAuth(user) {
    const iuser = await user.getName() 
    return iuser
  }
</script>

{#await loadAuth($user)}
  <li><a href="#">Ielādē...</a></li>
{:then user}
  {#if !user}
    <li><a href="/login">Ienākt vai Reģistrēties</a></li>
  {:else}
    <li><a href="/profile">{user}</a></li>
    {#if user}
      <li>
        <a href="/admin">
          <i class="bi bi-tools" />
        </a>
      </li>
    {/if}
    <li>
      <a href="#" on:click={logout}>
        <i class="bi bi-box-arrow-left" />
      </a>
    </li>
  {/if}
{/await}
