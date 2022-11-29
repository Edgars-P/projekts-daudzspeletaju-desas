<script>
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://db.0xff.lv');

let email = ""

let password = ""

let username = ""

async function login(){
    const authData = await pb.collection('lietotaji').authWithPassword(
    email,
    password,
);

// after the above you can also access the auth data from the authStore
console.log(pb.authStore.isValid);
console.log(pb.authStore.token);
console.log(pb.authStore.model.id);

username = authData.record.username
}
</script>



<div>
    <h1>Tavs vards ir: {username}</h1>
    <input type="text" name="" id="" bind:value={email}>
    <input type="text" name="" id="" bind:value={password}>
    <button on:click={login}>pierakstites</button>
</div>