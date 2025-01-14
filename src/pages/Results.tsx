import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useLayoutEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@pages/Loading";
import { GameCard } from "@components/custom/GameCard";
import { GameResultsPagination } from "@components/custom/GameResultsPagination";
import { useGameResults, usePaginatedGameResults } from "@hooks/igdb";
import { GameResultsOptions } from "@components/custom/GameResultsOptions";

const GAMES_PER_PAGE_OPTIONS = [1, 5, 10, 20, 50, 100, 200, 500];

export const Results = () => {
  const { searchText = "" } = useParams();

  const { games, covers, isGameResultsLoading, setIsGameResultsLoading } =
    useGameResults(searchText);

  const [gamesPerPage, setGamesPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  const paginatedGames = usePaginatedGameResults({
    games,
    pageNumber,
    gamesPerPage,
  });

  const filteredGamesPerPageOptions = useMemo(
    () =>
      GAMES_PER_PAGE_OPTIONS.filter(
        (gamesPerPageOption) => gamesPerPageOption <= games.length
      ),
    [games.length]
  );

  const gamesPerPageOptionIndex =
    filteredGamesPerPageOptions.indexOf(gamesPerPage);

  const title = `${
    !isGameResultsLoading ? `${games.length} search results ` : "Searching"
  } for "${searchText}"`;
  useLayoutEffect(() => {
    window.document.title = `${title} - ${APP_NAME}`;
  }, [title, searchText]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={5}
      animationDuration="slow"
      animationStyle="scale-fade-in"
    >
      <Text textAlign="center" fontSize="4xl">
        {title}
      </Text>
      <GameSearch showLoadingScreen={() => setIsGameResultsLoading(true)} />
      <HStack alignItems="start" width="100%">
        <Box md={{ width: "1/3" }} lg={{ width: "1/4" }}>
          <GameResultsOptions
            gamesPerPageOptions={filteredGamesPerPageOptions}
            setGamesPerPage={setGamesPerPage}
            isGameResultsLoading={isGameResultsLoading}
            gamesPerPageOptionIndex={gamesPerPageOptionIndex}
          />
        </Box>
        <VStack md={{ width: "2/3" }} lg={{ width: "3/4" }} position="relative">
          {!isGameResultsLoading ? (
            <>
              <GameResultsPagination
                totalGameCount={games.length}
                gamesPerPage={gamesPerPage}
                pageNumber={pageNumber}
                onPageChange={setPageNumber}
              />
              {paginatedGames.map((game) => {
                const cover = covers.find((cover) => cover.game === game.id);
                return (
                  <GameCard key={game.id} game={game} coverUrl={cover?.url} />
                );
              })}
              <GameResultsPagination
                totalGameCount={games.length}
                gamesPerPage={gamesPerPage}
                pageNumber={pageNumber}
                onPageChange={setPageNumber}
              />
            </>
          ) : (
            <Loading />
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
