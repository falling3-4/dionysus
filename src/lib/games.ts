const zonesURL = 'https://cdn.jsdelivr.net/gh/gn-math/assets@main/zones.json';
const coverURL = 'https://cdn.jsdelivr.net/gh/gn-math/covers@main';
const htmlURL = 'https://cdn.jsdelivr.net/gh/gn-math/html@main';

export interface Game {
	id: number;
	name: string;
	cover: string;
	url: string;
	author: string;
	authorLink: string;
	special: string[];
}

export function getZones(): Promise<Game[]> {
	return fetch(zonesURL)
		.then((response) => response.json())
		.then((data) => data.filter((game: Game) => game.id >= 0 && game.id !== 596));
}

export function getCover(zone: Game[], gameId: number): string | undefined {
	const game = zone.find((g) => g.id === gameId);
	if (game) {
		return game.cover.replace('{COVER_URL}', coverURL);
	}
	return undefined;
}

export function getHtmlUrl(zone: Game[], gameId: number): string | undefined {
	const game = zone.find((g) => g.id === gameId);
	if (game) {
		return game.url.replace('{HTML_URL}', htmlURL);
	}
	return undefined;
}
