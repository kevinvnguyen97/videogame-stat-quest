const BASE_URL = "http://localhost:8080/http://api.igdb.com/v4";

const GAME_FIELDS: (keyof GameSearchResult)[] = [
  "cover",
  "name",
  "summary",
  "url",
  "parent_game",
];

const COVER_FIELDS: (keyof Cover)[] = ["url"];

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
      Authorization: "Bearer vwq3e0xjotrwqtima9hj9csrsn5vye",
    },
  });
  const coverSearchResults = (await fetchCovers.json()) as CoverSearchResult[];
  console.log("COVER RESULTS:", coverSearchResults);
  return coverSearchResults;
};
