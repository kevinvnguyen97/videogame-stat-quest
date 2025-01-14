import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { getIGDBHiResCover } from "@utils/index";
import { useEffect, useMemo, useState } from "react";

export const usePaginatedGameResults = (args: {
  games: Game[];
  pageNumber: number;
  gamesPerPage: number;
}) => {
  const { games, pageNumber, gamesPerPage } = args;

  const gamesInPage = useMemo(
    () =>
      games.slice((pageNumber - 1) * gamesPerPage, pageNumber * gamesPerPage),
    [games, pageNumber, gamesPerPage]
  );

  return gamesInPage;
};

export const useGameResults = (gameName: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [covers, setCovers] = useState<Cover[]>([]);
  const [isGameResultsLoading, setIsGameResultsLoading] = useState(true);

  useEffect(() => {
    setIsGameResultsLoading(true);
  }, []);
  useEffect(() => {
    console.time("fetch game results");
    const searchForGame = async (gameName: string) => {
      const fetchedGames = await getIGDBRecords<Game>({
        endpoint: IGDBEndpoint.GAMES,
        search: gameName,
      });
      const coverIds = fetchedGames.map(({ cover }) => cover);
      const coversForGame = await getIGDBRecords<Cover>({
        endpoint: IGDBEndpoint.COVERS,
        ids: coverIds,
      });
      const hiResCovers: Cover[] = coversForGame.map((cover) => ({
        ...cover,
        url: getIGDBHiResCover(cover?.url),
      }));

      setGames(fetchedGames);
      setCovers(hiResCovers);
      setIsGameResultsLoading(false);
    };
    searchForGame(gameName);
    console.timeEnd("fetch game results");
  }, [gameName, setGames, setCovers, setIsGameResultsLoading]);

  return { games, covers, isGameResultsLoading, setIsGameResultsLoading };
};

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
  const [franchises, setFranchises] = useState<Franchise[]>([]);

  // DLCs
  const [dlcs, setDlcs] = useState<Game[]>([]);
  const [dlcCovers, setDlcCovers] = useState<Cover[]>([]);

  // Parent game
  const [parentGame, setParentGame] = useState<Game>();
  const [parentGameCover, setParentGameCover] = useState<Cover>();

  // Languages
  const [languageSupports, setLanguageSupports] = useState<LanguageSupport[]>(
    []
  );
  const [languages, setLanguages] = useState<Language[]>([]);

  // Similar games
  const [similarGames, setSimilarGames] = useState<Game[]>([]);
  const [similarGameCovers, setSimilarGameCovers] = useState<Cover[]>([]);

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

      if (!fetchedGame) {
        setIsGameDataLoading(false);
        return;
      }

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
        fetchedSimilarGames = [],
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
        getIGDBRecords<Game>({
          endpoint: IGDBEndpoint.GAMES,
          ids: fetchedGame.similar_games,
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
      const similarGameCoverIds = fetchedSimilarGames?.map(
        ({ cover }) => cover
      );

      const [
        fetchedCompanies = [],
        fetchedDlcCovers = [],
        fetchedParentGameCovers = [],
        fetchedLanguages = [],
        fetchedSimilarGameCovers = [],
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
        getIGDBRecords<Cover>({
          endpoint: IGDBEndpoint.COVERS,
          ids: similarGameCoverIds,
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

      const hiResSimilarGameCovers: Cover[] = fetchedSimilarGameCovers?.map(
        (similarGameCover) => ({
          ...similarGameCover,
          url: getIGDBHiResCover(similarGameCover.url),
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
      setSimilarGames(fetchedSimilarGames);
      setSimilarGameCovers(hiResSimilarGameCovers);
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
    setSimilarGames,
    setSimilarGameCovers,
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
    similarGames,
    similarGameCovers,
    isGameDataLoading,
  };
};
