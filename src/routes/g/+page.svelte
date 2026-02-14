<script lang="ts">
	import GameCard from '$lib/components/GameCard.svelte';
	import { getZones, type Game } from '$lib/games';
	import { onMount } from 'svelte';

	let allGames: Game[] = [];
	let filteredAndSortedGames: Game[] = [];
	let searchTerm = '';
	let sortOption:
		| 'name-asc'
		| 'name-desc'
		| 'author-asc'
		| 'author-desc'
		| 'id-asc'
		| 'id-desc' = 'name-asc';

	onMount(async () => {
		allGames = await getZones();
		filteredAndSortedGames = allGames;
	});

	const sortOptions = [
		{ value: 'name-asc', label: 'Name (A-Z)' },
		{ value: 'name-desc', label: 'Name (Z-A)' },
		{ value: 'author-asc', label: 'Author (A-Z)' },
		{ value: 'author-desc', label: 'Author (Z-A)' },
		{ value: 'id-asc', label: 'ID (Low to High)' },
		{ value: 'id-desc', label: 'ID (High to Low)' }
	];

	$: {
		let filteredGames = allGames;

		if (searchTerm) {
			filteredGames = allGames.filter((game) =>
				game.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		filteredAndSortedGames = filteredGames.sort((a, b) => {
			switch (sortOption) {
				case 'name-asc':
					return a.name.localeCompare(b.name);
				case 'name-desc':
					return b.name.localeCompare(a.name);
				case 'author-asc':
					return a.author.localeCompare(b.author);
				case 'author-desc':
					return b.author.localeCompare(a.author);
				case 'id-asc':
					return a.id - b.id;
				case 'id-desc':
					return b.id - a.id;
				default:
					return 0;
			}
		});
	}
</script>

<div class="controls">
	<input type="text" bind:value={searchTerm} placeholder="Search games..." />
	<select bind:value={sortOption}>
		{#each sortOptions as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</div>

<div class="game-grid">
	{#if filteredAndSortedGames.length === 0}
		<p>Loading games...</p>
	{:else}
		{#each filteredAndSortedGames as game}
			<GameCard {game} />
		{/each}
	{/if}
</div>

<style>
	.controls {
		margin-bottom: 20px;
		display: flex;
		gap: 10px;
	}

	input[type='text'],
	select {
		padding: 8px;
		border: 2px solid #9ecfff;
		background-color: #f0f8ff;
		color: #1b3a57;
		border-radius: 5px;
	}

	select {
		cursor: pointer;
	}

	.game-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
	}
</style>
