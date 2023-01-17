<script>
  import { userId, pb, logout } from "../scripts/database";

  async function loadAuth(iuserId) {
    if (iuserId === undefined) {
      return false;
    }

    let user = await pb
      .collection("lietotaji")
      .getOne(iuserId, { $autoCancel: false });
    return user;
  }
</script>

{#await loadAuth($userId)}
  <li><a href="#">Ielādē...</a></li>
{:then user}
  {#if !user.username}
    <li><a href="/login">Ienākt vai Reģistrēties</a></li>
  {:else}
    <li><a href="/profile">{user.username}</a></li>
    {#if user.admin}
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
