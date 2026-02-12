<script lang="ts">
	import { onMount } from 'svelte';
	import { initializeScramjet } from '$lib/scramjet';

	onMount(async () => {
		await initializeScramjet();

		const scramj = document.getElementById('scramj') as HTMLIFrameElement;
		if (scramj) {
			scramj.src = window.scramjet.encodeUrl('https://vidsrc.to');
		}
	});
</script>

<iframe title="test" id="scramj" width="1280" height="720"></iframe>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
