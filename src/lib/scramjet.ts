import { BareMuxConnection } from '@mercuryworkshop/bare-mux';

export async function initializeScramjet() {
	const connection = new BareMuxConnection('/baremux/worker.js');
	window.Connection = connection;

	await connection.setTransport('/libcurl/index.mjs', [
		{
			wisp: `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/w/`
		}
	]);

	if ('serviceWorker' in navigator) {
		await navigator.serviceWorker.register('/sw.js', { scope: '/' });
		await navigator.serviceWorker.ready;

		const { ScramjetController } = window.$scramjetLoadController();
		window.scramjet = new ScramjetController({
			prefix: '/~/sj/',
			files: {
				wasm: '/scram/scramjet.wasm.wasm',
				all: '/scram/scramjet.all.js',
				sync: '/scram/scramjet.sync.js'
			},
			flags: {
				rewriterLogs: false,
				naiiveRewriter: false,
				scramitize: false
			}
		});

		await window.scramjet.init();
	}
}
