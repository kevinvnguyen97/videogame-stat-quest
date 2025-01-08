import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { getIGDBHiResCover } from "@utils/index";
import { useEffect, useState } from "react";

export const useGameData = (id: number) => {
  const [isGameDataLoading, setIsGameDataLoading] = useState(true);
  const [game, setGame] = useState<Game>();

  // Game info
  const [cover, setCover] = useState<Cover>();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [videos, setVideos] = useState<GameVideo[]>([]);
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [franchises, setFranchises] = useState<Franchise[]>();

  // DLCs
  const [dlcs, setDlcs] = useState<Game[]>();
  const [dlcCovers, setDlcCovers] = useState<Cover[]>();

  // Parent game
  const [parentGame, setParentGame] = useState<Game>();
  const [parentGameCover, setParentGameCover] = useState<Cover>();

  const [languageSupports, setLanguageSupports] = useState<LanguageSupport[]>();
  const [languages, setLanguages] = useState<Language[]>();

  useEffect(() => {
    setIsGameDataLoading(true);
  }, []);

  useEffect(() => {
    console.time("fetch game");
    const fetchGameData = async () => {
      setIsGameDataLoading(true);
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
        fetchedDlcs = [],
        fetchedParentGames = [],
        fetchedLanguageSupports = [],
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
          ids: fetchedGame.franchises,
        }),
        getIGDBRecords<Game>({
          endpoint: IGDBEndpoint.GAMES,
          ids: fetchedGame.dlcs,
        }),
        getIGDBRecords<Game>({
          endpoint: IGDBEndpoint.GAMES,
          ids: [fetchedGame.parent_game ?? NaN],
        }),
        getIGDBRecords<LanguageSupport>({
          endpoint: IGDBEndpoint.LANGUAGE_SUPPORTS,
          ids: fetchedGame.language_supports,
        }),
      ]);

      const companyIds = fetchedInvolvedCompanies?.map(
        ({ company }) => company
      );
      const dlcCoverIds = fetchedDlcs?.map(({ cover }) => cover);
      const parentGameCoverId = fetchedParentGames[0]?.cover;
      const languageIds = fetchedLanguageSupports?.map(
        ({ language }) => language
      );

      const [
        fetchedCompanies = [],
        fetchedDlcCovers = [],
        fetchedParentGameCovers = [],
        fetchedLanguages = [],
      ] = await Promise.all([
        getIGDBRecords<Company>({
          endpoint: IGDBEndpoint.COMPANIES,
          ids: companyIds,
        }),
        getIGDBRecords<Cover>({
          endpoint: IGDBEndpoint.COVERS,
          ids: dlcCoverIds,
        }),
        getIGDBRecords<Cover>({
          endpoint: IGDBEndpoint.COVERS,
          ids: [parentGameCoverId],
        }),
        getIGDBRecords<Language>({
          endpoint: IGDBEndpoint.LANGUAGES,
          ids: languageIds,
        }),
      ]);

      const fetchedCover = fetchedCovers[0];
      const hiResCover: Cover = {
        ...fetchedCover,
        url: getIGDBHiResCover(fetchedCover?.url),
      };
      const hiResDlcCovers: Cover[] = fetchedDlcCovers?.map((dlcCover) => ({
        ...dlcCover,
        url: getIGDBHiResCover(dlcCover?.url),
      }));
      const fetchedParentGameCover = fetchedParentGameCovers[0];
      const hiResParentGameCover: Cover = {
        ...fetchedParentGameCover,
        url: getIGDBHiResCover(fetchedParentGameCover?.url),
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
      setFranchises(fetchedFranchises);
      setDlcs(fetchedDlcs);
      setDlcCovers(hiResDlcCovers);
      setParentGame(fetchedParentGames[0]);
      setParentGameCover(hiResParentGameCover);
      setLanguageSupports(fetchedLanguageSupports);
      setLanguages(fetchedLanguages);
      setIsGameDataLoading(false);
    };

    fetchGameData();
    console.timeEnd("fetch game");
  }, [
    id,
    setGame,
    setCover,
    setPlatforms,
    setGenres,
    setVideos,
    setGameModes,
    setScreenshots,
    setCompanies,
    setFranchises,
    setDlcs,
    setDlcCovers,
    setParentGame,
    setParentGameCover,
    setLanguageSupports,
    setLanguages,
    setIsGameDataLoading,
  ]);

  return {
    game,
    cover,
    platforms,
    genres,
    videos,
    gameModes,
    screenshots,
    companies,
    franchises,
    dlcs,
    dlcCovers,
    parentGame,
    parentGameCover,
    languageSupports,
    languages,
    isGameDataLoading,
  };
};
