import { getZones, getHtmlUrl, type Game } from '$lib/games';

export const load = async ({ fetch, params }) => {
	const gameId = parseInt(params.id, 10);
	const games = await getZones();
	const game = games.find((g: Game) => g.id === gameId);

	if (!game) {
		return {
			status: 404,
			error: new Error('Game not found')
		};
	}

	const htmlUrl = getHtmlUrl(games, gameId);

	if (!htmlUrl) {
		return {
			status: 404,
			error: new Error('Game HTML not found')
		};
	}

	const response = await fetch(htmlUrl);
	const htmlContent = await response.text();

	return {
		game,
		htmlContent
	};
};
