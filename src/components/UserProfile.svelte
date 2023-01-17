<script lang="ts">
    import { pb, userId } from "../scripts/database";
</script>

<div class="wrap">
    {#await pb.collection("lietotaji").getOne($userId || "") then user}
        <table>
            <tr>
                <td>Vārds</td>
                <td>{user.username}</td>
            </tr>
            <tr>
                <td>E-pasts</td>
                <td>{user.email}</td>
            </tr>
            <tr>
                <td>Administrators</td>
                <td>{user.admin ? "Jā" : "Nē"}</td>
            </tr>
            <tr>
                <td>Izveidots</td>
                <td>{new Date(user.created).toLocaleDateString()}</td>
            </tr>
        </table>

        <table>
            <thead>
                <h2>Spēles</h2>
            </thead>
            <tbody>
                {#await pb
                    .collection("spele")
                    .getList( 1, 50, {sort: '-created', filter: `lideris="${$userId}"`}) then speles}
                    {#each speles.items as spele}
                        <tr class="game">
                            <a href="/game#{spele.id}">{new Date(spele.created).toLocaleString()}</a>
                        </tr>
                    {/each}
                {/await}
            </tbody>
        </table>
    {/await}
</div>

<style>
    .wrap {
        width: max-content;
        margin: auto;
    }

    td {
        width: 10rem;
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

    .game a {
        background: #fff9;
        border-radius: 0.5rem;
        display: block;
        margin: 0.1rem 0;
        color: black
    }
</style>
