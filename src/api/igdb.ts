const BASE_URL = "http://localhost:8080/http://api.igdb.com/v4";

const GAME_FIELDS: (keyof GameSearchResult)[] = [
  "cover",
  "name",
  "summary",
  "url",
  "parent_game",
];

const COVER_FIELDS: (keyof Cover)[] = ["url", "game"];

export const getGamesByName = async (gameName: string) => {
  const apiUrl = encodeURI(
    `${BASE_URL}/games?fields=${GAME_FIELDS.join(",")}&search=${gameName}`
  );
  const fetchGames = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
    },
  });
  const gameSearchResults = (await fetchGames.json()) as GameSearchResult[];
  console.log("GAME RESULTS:", gameSearchResults);
  return gameSearchResults;
};

export const getCoversById = async (ids: number[]) => {
  const apiUrl = encodeURI(
    `${BASE_URL}/covers/${ids.join(",")}?fields=${COVER_FIELDS.join(",")}`
  );
  const fetchCovers = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
    },
  });
  const coverSearchResults = (await fetchCovers.json()) as CoverSearchResult[];
  const hiResCoverSearchResults = coverSearchResults.map((cover) => ({
    ...cover,
    url: cover.url.replace("t_thumb", "t_cover_big"),
  }));
  return hiResCoverSearchResults;
};
