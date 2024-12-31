const BASE_URL = "http://localhost:8080/http://api.igdb.com/v4";

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
}

export async function getIGDBRecords<T>(args: {
  endpoint: IGDBEndpoint;
  search?: string;
  ids?: number[];
}): Promise<T[]> {
  const { endpoint, search, ids = [] } = args;
  const url = `${BASE_URL}/${endpoint}${
    ids.length > 0 ? `/${ids.join(",")}` : ""
  }?fields=*${search ? `&search=${search}` : ""}`;
  const encodedUrl = encodeURI(url);
  const fetchRecords = await fetch(encodedUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": import.meta.env.VITE_IGDB_CLIENT_ID,
      Authorization: `Bearer ${import.meta.env.VITE_IGDB_ACCESS_TOKEN}`,
    },
  });
  const records = (await fetchRecords.json()) as T[];
  return records;
}

export const getGameInfo = async (id: number) => {
  const game = (
    await getIGDBRecords<Game>({
      endpoint: IGDBEndpoint.GAMES,
      ids: [id],
    })
  )[0];

  const [
    covers,
    platforms,
    genres,
    videos,
    gameModes,
    screenshots,
    involvedCompanies,
  ] = await Promise.all([
    getIGDBRecords<Cover>({
      endpoint: IGDBEndpoint.COVERS,
      ids: [game.cover],
    }),
    getIGDBRecords<Platform>({
      endpoint: IGDBEndpoint.PLATFORMS,
      ids: game.platforms,
    }),
    getIGDBRecords<Genre>({
      endpoint: IGDBEndpoint.GENRES,
      ids: game.genres,
    }),
    getIGDBRecords<GameVideo>({
      endpoint: IGDBEndpoint.GAME_VIDEOS,
      ids: game.videos,
    }),
    getIGDBRecords<GameMode>({
      endpoint: IGDBEndpoint.GAME_MODES,
      ids: game.game_modes,
    }),
    getIGDBRecords<Screenshot>({
      endpoint: IGDBEndpoint.SCREENSHOTS,
      ids: game.screenshots,
    }),
    getIGDBRecords<InvolvedCompany>({
      endpoint: IGDBEndpoint.INVOLVED_COMPANIES,
      ids: game.involved_companies,
    }),
  ]);

  const companyIds = involvedCompanies.map(({ company }) => company);

  const [companies] = await Promise.all([
    getIGDBRecords<Company>({
      endpoint: IGDBEndpoint.COMPANIES,
      ids: companyIds,
    }),
  ]);

  const cover = covers[0];
  const hiResCover: Cover = {
    ...cover,
    url: cover.url.replace("t_thumb", "t_cover_big_2x"),
  };

  const hiResScreenshots: Screenshot[] = screenshots.map((screenshot) => ({
    ...screenshot,
    url: `//images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`,
  }));

  return {
    game,
    cover: hiResCover,
    platforms,
    genres,
    videos,
    gameModes,
    screenshots: hiResScreenshots,
    companies,
  };
};
