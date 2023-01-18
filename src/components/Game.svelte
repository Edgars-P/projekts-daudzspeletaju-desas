<script lang="ts">
	import GameField from "./GameField.svelte";
	import Game from "../scripts/gameClass";
	import { pb, userId } from "../scripts/database";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	const game = new Game(3, [], pb);
	let show = false;

	let gameId = "";

	let { currentPlayingPlayer, players, board, myPlayerSymbol, isWon } = game;

	onMount(async () => {
		gameId = location.hash.substring(1);
		await game.joinGame(gameId);
		show = true;

		// Pārlādēt lapu ja nomainās spēles ID
		window.addEventListener("hashchange", () => location.reload());
	});
</script>

<div class="gameSection">
	{#if show && ($players.length > 1 || $isWon !== false)}
		{#if $isWon !== false}
			<div class="section win">
				{#if $isWon === -1}
					<h1>Neizšķirts!</h1>
				{:else}
					<h1>
						{game.playerLabels[parseInt($isWon.toString())]} ir uzvarējis!
					</h1>
				{/if}
			</div>
		{/if}

		<GameField
			board={$board}
			players={game.playerLabels}
			playFunction={(r, c) => game.play(r, c)}
			enableEmptyEffect={$myPlayerSymbol == $currentPlayingPlayer &&
				$isWon === false}
		/>

		<div class="section players">
			{#each $players as player}
				<li>
					<span class="symbol">
						{player.simbols}
					</span>
					<span class="name">
						{#if player.expand?.user?.id == $userId}
							<i class="bi bi-person-circle" />
						{/if}
						{#if player.simbols == game.playerLabels[$currentPlayingPlayer] && $isWon === false}
							<i class="bi bi-hourglass" />
						{/if}
						{player.expand?.user?.username}
					</span>
				</li>
			{/each}
		</div>
	{:else}
		<div class="section">
			{#if $userId !== undefined}
				<h1><i class="bi bi-hourglass" /> Gaida spēlētājus...</h1>
				<h2><code>{gameId}</code></h2>
			{:else}
				<h1>Lūdzu preslēgties vai reģistrēties!</h1>
			{/if}
		</div>
	{/if}
</div>

<style>
	.gameSection {
		width: max-content;
		margin: auto;
	}

	.section {
		justify-content: space-between;
		padding: 0.5rem;
		background-color: #ffffff99;
		color: black;
		border-radius: 1rem;
	}

	.section li {
		display: grid;
		height: 2rem;
		grid-template-columns: 3rem 1fr;
		font-size: 1.5rem;
		align-items: center;
		margin: 0.25rem 0;
	}

	.section li .symbol {
		justify-self: center;
		background-color: white;
		width: 2rem;
		height: 2rem;
		text-align: center;
		border-radius: 0.8rem;
	}

	.bi-hourglass {
		display: inline-block;
		animation: spin 4s infinite linear;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(180deg);
		}
		50% {
			transform: rotate(180deg);
		}
		75% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.win h1 {
		margin: 0;
		text-align: center;
	}

	h2 {
		text-align: center;
		font-size: 2rem;
		background-color: #fff;
		border-radius: 2rem;
	}
</style>
