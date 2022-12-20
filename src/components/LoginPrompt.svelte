<script>
    import {
        processingLogin,
        authError,
        userId,
        login,
        register,
    } from "../scripts/database";

    let username;
    let email;
    let password;
    let passwordconfirm;

    let isRegister = false;

    function pierakstities() {
        login(username, password);
    }

    async function registreties() {
        if (!isRegister) {
            isRegister = true;
            return;
        }

        await register(username, email, password)

        if($authError == "") {
            email = ""
            password = ""
            passwordconfirm = ""
            isRegister = false
        }
    }
</script>

<div>
    {#if $userId}
        <h1>Pieraktīšanās veiksmīga!</h1>
        <p>{JSON.stringify($userId)}</p>
    {:else}
        <label for="user">
            <span>Lietotājvārds:</span>
            <input
                type="text"
                id="user"
                name="user"
                disabled={$processingLogin}
                bind:value={username}
            />
        </label>

        {#if isRegister}
            <label for="eml">
                <span>E-pasts:</span>
                <input 
                    type="email" 
                    id="eml"
                    bind:value={email}
                >
            </label>
        {/if}
        
        <label for="pwd">
            <span>Parole:</span>
            <input
                type="password"
                id="pwd"
                name="pwd"
                disabled={$processingLogin}
                bind:value={password}
            />
        </label>

        {#if isRegister}
            <label for="pwdc">
                <span>Parole (atkārtoti):</span>
                <input
                    type="password"
                    id="pwdc"
                    name="pwd"
                    disabled={$processingLogin}
                    bind:value={passwordconfirm}
                />
            </label>
        {/if}

        {#if $authError}
            <label for="">
                {$authError}
            </label>
        {/if}

        {#if !isRegister}
            <button 
                disabled={$processingLogin} 
                on:click={pierakstities}
            >
                Pierakstīties!
            </button>
        {/if}
        <button 
            disabled={$processingLogin} 
            on:click={registreties}
        >
            Reģistrēties!
        </button>
    {/if}
</div>

<style>
    div {
        width: max-content;
        margin: auto;
        gap: 1rem;
        font-size: 1.3rem;
    }

    span {
        padding: 0.5rem;
    }

    input {
        display: block;
        border: none;
        padding: 0.5rem;
        width: 100%;
    }

    label {
        background: #ffffff99;
        display: block;
        margin-top: 0.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
    }

    button {
        display: block;
        width: 100%;
        margin-top: 0.5rem;

        cursor: pointer;

        font-size: 15px;
        color: black;
        text-decoration: none;
        background-color: #fff;
        display: block;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.7rem;
    }
</style>
