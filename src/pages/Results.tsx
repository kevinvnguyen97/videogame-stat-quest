import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@pages/Loading";
import { GameCard } from "@components/custom/GameCard";
import { GameResultsPagination } from "@components/custom/GameResultsPagination";
import { useGameResults, usePaginatedGameResults } from "@hooks/igdb";
import { Slider } from "@components/ui/slider";

const GAMES_PER_PAGE_OPTIONS = [1, 5, 10, 20, 50, 100, 200, 500];

export const Results = () => {
  const { searchText = "" } = useParams();

  const { games, covers, isGameResultsLoading } = useGameResults(searchText);

  const [gamesPerPage, setGamesPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);

  const paginatedGames = usePaginatedGameResults({
    games,
    pageNumber,
    gamesPerPage,
  });

  const filteredGamesPerPageOptions = GAMES_PER_PAGE_OPTIONS.filter(
    (gamesPerPageOption) => gamesPerPageOption <= games.length
  );

  const gamesPerPageOptionIndex =
    filteredGamesPerPageOptions.indexOf(gamesPerPage);

  const title = `${
    games.length > 0 && searchText
      ? `${games.length} search results `
      : "Searching"
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
      <GameSearch />
      <HStack alignItems="start" width="100%">
        <Card.Root
          variant="subtle"
          md={{ width: "1/3" }}
          lg={{ width: "1/4" }}
          animationDuration="slow"
          animationStyle="scale-fade-in"
        >
          <Card.Header fontWeight="bold">Options</Card.Header>
          <Card.Body>
            <Text>Games Per Page</Text>
            <Slider
              size="md"
              value={[
                (100 / (filteredGamesPerPageOptions.length - 1)) *
                  gamesPerPageOptionIndex,
              ]}
              marks={filteredGamesPerPageOptions.map(
                (gamesPerPageOption, i) => ({
                  label: gamesPerPageOption,
                  value: (100 / (filteredGamesPerPageOptions.length - 1)) * i,
                })
              )}
              step={100 / (filteredGamesPerPageOptions.length - 1)}
              thumbAlignment="center"
              thumbSize={{ width: 16, height: 16 }}
              disabled={!(games.length > 0 && searchText)}
              onValueChangeEnd={(e) => {
                const i = Math.round(
                  (e.value[0] * (filteredGamesPerPageOptions.length - 1)) / 100
                );
                setGamesPerPage(filteredGamesPerPageOptions[i]);
              }}
            />
          </Card.Body>
        </Card.Root>
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
