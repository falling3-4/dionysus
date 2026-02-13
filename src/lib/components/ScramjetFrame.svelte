<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { initializeScramjet } from '$lib/scramjet';

	export let id: string | undefined = undefined;
	export let style: string | undefined = undefined;
	export let className: string | undefined = undefined;
	export let title: string | undefined = 'Scramjet Frame';

	const dispatch = createEventDispatcher<{
		load: Event;
		navigate: { url: string };
		error: { message: string };
	}>();

	let iframe: HTMLIFrameElement;
	let container: HTMLDivElement;

	onMount(async () => {
		await initializeScramjet();
		if (iframe) {
			navigate('https://duckduckgo.com');
		}
	});

	export function navigate(url: string) {
		if (!window.scramjet) {
			dispatch('error', { message: 'Scramjet not initialized' });
			return;
		}
		iframe.src = window.scramjet.encodeUrl(url);
		dispatch('navigate', { url });
	}

	export function getURL() {
		if (!window.scramjet) {
			dispatch('error', { message: 'Scramjet not initialized' });
			return;
		}
		return window.scramjet.decodeUrl(iframe.src);
	}

	export function inject(script: string) {
		if (!iframe.contentWindow) {
			dispatch('error', { message: 'Iframe not loaded' });
			return;
		}
		try {
			(iframe.contentWindow as Window & { eval: (code: string) => void }).eval(script);
		} catch (e: any) {
			dispatch('error', { message: e.message });
		}
	}

	function onLoad(e: Event) {
		dispatch('load', e);
		if (iframe.contentWindow) {
			iframe.contentWindow.window.open = () => {
				return null;
			};
		}
	}

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			container.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}
</script>

<div
	class="container"
	bind:this={container}
>
	<iframe
		{title}
		{id}
		class={className}
		style={`width: 100%; height: 100%; border: none; ${style ?? ''}`}
		bind:this={iframe}
		on:load={onLoad}
		sandbox="allow-scripts allow-same-origin allow-forms allow-popups-to-escape-sandbox allow-presentation"
	></iframe>
	<button
		class="fullscreen-button"
		on:click={toggleFullscreen}
		aria-label="Toggle Fullscreen">⛶</button
	>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
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
