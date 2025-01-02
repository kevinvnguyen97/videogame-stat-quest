import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080/http://api.igdb.com/v4";

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
}

export async function getIGDBRecords<T>(args: {
  endpoint: IGDBEndpoint;
  search?: string;
  ids?: number[];
}): Promise<T[]> {
  let retryLimit = API_RETRY_LIMIT;
  let records: T[] = [];
  const { endpoint, search, ids = [] } = args;
  const url = `${BASE_URL}/${endpoint}${
    ids.length > 0 ? `/${ids.filter(Boolean).join(",")}` : ""
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

export const useGameData = (id: number) => {
  const [game, setGame] = useState<Game>();
  const [cover, setCover] = useState<Cover>();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [videos, setVideos] = useState<GameVideo[]>([]);
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [franchise, setFranchise] = useState<Franchise>();

  useEffect(() => {
    const fetchGameData = async () => {
      const fetchedGame = (
        await getIGDBRecords<Game>({
          endpoint: IGDBEndpoint.GAMES,
          ids: [id],
        })
      )[0];

      const [
        fetchedCovers = [],
        fetchedPlatforms = [],
        fetchedGenres = [],
        fetchedVideos = [],
        fetchedGameModes = [],
        fetchedScreenshots = [],
        fetchedInvolvedCompanies = [],
        fetchedFranchises = [],
      ] = await Promise.all([
        getIGDBRecords<Cover>({
          endpoint: IGDBEndpoint.COVERS,
          ids: [fetchedGame.cover],
        }),
        getIGDBRecords<Platform>({
          endpoint: IGDBEndpoint.PLATFORMS,
          ids: fetchedGame.platforms,
        }),
        getIGDBRecords<Genre>({
          endpoint: IGDBEndpoint.GENRES,
          ids: fetchedGame.genres,
        }),
        getIGDBRecords<GameVideo>({
          endpoint: IGDBEndpoint.GAME_VIDEOS,
          ids: fetchedGame.videos,
        }),
        getIGDBRecords<GameMode>({
          endpoint: IGDBEndpoint.GAME_MODES,
          ids: fetchedGame.game_modes,
        }),
        getIGDBRecords<Screenshot>({
          endpoint: IGDBEndpoint.SCREENSHOTS,
          ids: fetchedGame.screenshots,
        }),
        getIGDBRecords<InvolvedCompany>({
          endpoint: IGDBEndpoint.INVOLVED_COMPANIES,
          ids: fetchedGame.involved_companies,
        }),
        getIGDBRecords<Franchise>({
          endpoint: IGDBEndpoint.FRANCHISES,
          ids: [fetchedGame.franchise],
        }),
      ]);

      const companyIds = fetchedInvolvedCompanies?.map(
        ({ company }) => company
      );

      const [fetchedCompanies] = await Promise.all([
        getIGDBRecords<Company>({
          endpoint: IGDBEndpoint.COMPANIES,
          ids: companyIds,
        }),
      ]);

      const fetchedCover = fetchedCovers[0];
      const hiResCover: Cover = {
        ...fetchedCover,
        url: fetchedCover.url.replace("t_thumb", "t_cover_big_2x"),
      };

      const hiResScreenshots: Screenshot[] = fetchedScreenshots.map(
        (screenshot) => ({
          ...screenshot,
          url: `//images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`,
        })
      );

      setGame(fetchedGame);
      setCover(hiResCover);
      setPlatforms(fetchedPlatforms);
      setGenres(fetchedGenres);
      setVideos(fetchedVideos);
      setGameModes(fetchedGameModes);
      setScreenshots(hiResScreenshots);
      setCompanies(fetchedCompanies);
      setFranchise(fetchedFranchises[0]);
    };

    fetchGameData();
  }, [id]);

  return {
    game,
    cover,
    platforms,
    genres,
    videos,
    gameModes,
    screenshots,
    companies,
    franchise,
  };
};
