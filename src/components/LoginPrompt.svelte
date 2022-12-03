<script>
	export let isOpen = false;

	let username = "";
	let password = "";

	function handleLogin() {
		// db.login(username, password);
	}

	function handleClose(event) {
		// Aizver popup
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="overlay" on:click={handleClose}>
		<div class="modal">
			<form on:submit|preventDefault={handleLogin}>
				<label for="username">Username:</label>
				<input type="text" bind:value={username} id="username" />
				<label for="password">Password:</label>
				<input type="password" bind:value={password} id="password" />
				<button type="submit">Login</button>
			</form>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: white;
		padding: 1em;
		border-radius: 0.5em;
		z-index: 2;
	}
</style>
