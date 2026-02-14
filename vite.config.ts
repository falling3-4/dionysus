import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type ViteDevServer } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { baremuxPath } from '@mercuryworkshop/bare-mux/node';
import { libcurlPath } from '@mercuryworkshop/libcurl-transport';
import { scramjetPath } from '@mercuryworkshop/scramjet/path';

//@ts-ignore
import { server as wisp } from '@mercuryworkshop/wisp-js/server';

const wispPlugin = () => ({
	name: 'vite-plugin-wisp',
	configureServer(server: ViteDevServer) {
		wisp.options.allow_udp_streams = false;
		server.httpServer?.on('upgrade', (req, socket, head) => {
			if (req.url?.startsWith('/w/')) {
				wisp.routeRequest(req, socket, head);
			}
		});
	}
});

const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
	plugins: [
		wispPlugin(),
		sveltekit(),
		devtoolsJson(),
		viteStaticCopy({
			targets: [
				{
					src: `${baremuxPath}/**/*`.replace(/\\/g, '/'),
					dest: 'baremux',
					overwrite: false
				},
				{
					src: `${libcurlPath}/**/*`.replace(/\\/g, '/'),
					dest: 'libcurl',
					overwrite: false
				},
				{
					src: `${scramjetPath}/**/*`.replace(/\\/g, '/'),
					dest: 'scram',
					overwrite: false
				}
			]
		})
	],
	server: {
		headers: {
			'X-Frame-Options': 'SAMEORIGIN'
		}
	}
});
