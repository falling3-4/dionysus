<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let container: HTMLDivElement;

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			container.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
</script>

{#if data.game}
	<h1>{data.game.name}</h1>
	<p>
		by <a href={data.game.authorLink} target="_blank">{data.game.author}</a>
	</p>
{/if}

<div class="container" bind:this={container}>
	<iframe
		title={data.game?.name ?? 'Game'}
		srcdoc={data.htmlContent}
		sandbox="allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox allow-presentation"
	></iframe>
	<button class="fullscreen-button" on:click={toggleFullscreen} aria-label="Toggle Fullscreen">
		⛶
	</button>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
	}

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	.fullscreen-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: black;
		color: white;
		border: none;
		border-radius: 0.25rem;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		z-index: 1;
	}
	.container:hover .fullscreen-button {
		opacity: 0.1;
	}
	.fullscreen-button:hover {
		opacity: 0.25;
	}
</style>
