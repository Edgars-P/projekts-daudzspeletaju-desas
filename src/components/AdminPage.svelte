<script lang="ts">
    import { pb } from "../scripts/database";

  async function deleteAccount(id, name) {
    const res = confirm("Vair tiešām dzēst kontu "+name+"?")

    if (res) {
      await pb.collection('lietotaji').delete(id)
    }

    location.reload()
  } 

</script>

<div class="wrap">
  <table>
    <thead>
      <tr>
        <td colspan=3>
          <h2>Lietotāju konti</h2>
        </td>
      </tr>
    </thead>
    {#await pb.collection('lietotaji').getList(1, 50) then users}
      {#each users.items as user}
        <tr>
          <td>{user.username}</td>

          <td>{user.email}</td>

          <td>
            <button on:click={() => deleteAccount(user.id, user.username)}>Dzēst</button>
          </td>
        </tr>
      {/each}
    {/await}
  </table>

  <table>
    <thead>
      <tr>
        <td colspan="3">
          <h2>Spēles</h2>
        </td>
      </tr>
    </thead>
    <tbody>
        {#await pb
            .collection("spele")
            .getList( 1, 50, {sort: '-created', expand: "lideris"}) then speles}
            {#each speles.items as spele}
                <tr>
                  <td>
                    {new Date(spele.created).toLocaleString()}
                  </td>
                  <td>
                    {spele.expand.lideris?.username}
                  </td>
                  <td>
                    <a href="/game#{spele.id}" target="_blank" rel="noopener noreferrer">
                      {spele.id}
                    </a>
                  </td>
                </tr>
            {/each}
        {/await}
    </tbody>
  </table>
</div>


<style>
  .wrap {
      width: max-content;
      margin: auto;
  }

  table {
      background-color: #fff9;
      padding: 0.2rem;
      border-radius: 0.5rem;
      width: 100%;
      margin: 2rem 0;
  }

  h2 {
      margin: 0;
      text-align: center;
  }

  .game {
      text-align: center;
  }
</style>