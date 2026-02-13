import type { BareMuxConnection } from '@mercuryworkshop/bare-mux';

declare global {
	namespace App {
	}
	interface Window {
		Connection: BareMuxConnection;
		$scramjetLoadController: () => { ScramjetController: typeof ScramjetController };
		scramjet?: any;
	}
}

export {};
