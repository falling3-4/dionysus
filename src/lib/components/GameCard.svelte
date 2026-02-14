<script lang="ts">
	import type { Game } from '$lib/games';

	let { game } = $props<{ game: Game }>();

	const coverURL = 'https://cdn.jsdelivr.net/gh/gn-math/covers@main';
</script>

<div class="game-card">
	<a href={`/g/${game.id}`} class="game-card-link">
		<img src={game.cover.replace('{COVER_URL}', coverURL)} alt={game.name} class="game-card-cover" />
		<div class="game-card-title">{game.name}</div>
	</a>
</div>

<style>
	.game-card {
		border: 2px solid #9ecfff;
		background: linear-gradient(to bottom, #f0f8ff, #dbeeff);
		box-shadow: 0 0 10px rgba(158, 207, 255, 0.6);
		transition: transform 0.2s;
		height: 200px;
	}

	.game-card:hover {
		transform: scale(1.05);
	}

	.game-card-link {
		text-decoration: none;
		color: #1b3a57;
		display: block;
		height: 100%;
	}

	.game-card-cover {
		width: 100%;
		height: 150px;
		object-fit: cover;
	}

	.game-card-title {
		padding: 10px;
		font-weight: bold;
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
