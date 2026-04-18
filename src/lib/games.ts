const zonesURL =
	'https://cdn.jsdelivr.net/gh/freebuisness/assets@7ac91913585e1f023d8cd4c1fcb098532705e750/zones.json';
const coverURL = 'https://cdn.jsdelivr.net/gh/freebuisness/covers@main';
const htmlURL = 'https://cdn.jsdelivr.net/gh/freebuisness/html@main';

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
