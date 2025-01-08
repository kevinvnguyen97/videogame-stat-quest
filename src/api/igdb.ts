const BASE_URL = "http://localhost:3000/api";

const API_WAIT_TIME_MS = 1000;
const API_RETRY_LIMIT = 20;

export enum IGDBEndpoint {
  GAMES = "games",
  COVERS = "covers",
  PLATFORMS = "platforms",
  GENRES = "genres",
  GAME_VIDEOS = "game_videos",
  GAME_MODES = "game_modes",
  SCREENSHOTS = "screenshots",
  INVOLVED_COMPANIES = "involved_companies",
  COMPANIES = "companies",
  FRANCHISES = "franchises",
  LANGUAGE_SUPPORTS = "language_supports",
  LANGUAGES = "languages",
}

export async function getIGDBRecords<T>(args: {
  endpoint: IGDBEndpoint;
  search?: string;
  ids?: number[];
}): Promise<T[]> {
  const { endpoint, search, ids = [] } = args;
  if (!search && ids?.filter(Boolean).length <= 0) {
    return [];
  }
  let retryLimit = API_RETRY_LIMIT;
  let records: T[] = [];
  const url = `${BASE_URL}/${endpoint}${
    ids.length > 0 ? `/${[...new Set(ids.filter(Boolean))].join(",")}` : ""
  }?fields=*${search ? `&search=${search}` : ""}`;
  const encodedUrl = encodeURI(url);
  do {
    const response = await fetch(encodedUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
        Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
      },
    });
    // Retry
    if (response.status === 429) {
      retryLimit--;
      setTimeout(() => {}, API_WAIT_TIME_MS);
      continue;
    }
    records = (await response.json()) || [];
    break;
  } while (retryLimit > 0);
  return records;
}
