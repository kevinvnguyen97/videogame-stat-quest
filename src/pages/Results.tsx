import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { Loading } from "@pages/Loading";
import { GameCard } from "@components/custom/GameCard";
import { getIGDBHiResCover } from "@utils/index";
import { GameResultsPagination } from "@components/custom/GameResultsPagination";
import { usePaginatedGameResults } from "@hooks/igdb";
import { Slider } from "@components/ui/slider";

const GAMES_PER_PAGE_OPTIONS = [1, 5, 10, 20, 50, 100, 200, 500];

export const Results = () => {
  const { searchText } = useParams();

  const [games, setGames] = useState<Game[]>([]);
  const [covers, setCovers] = useState<Cover[]>([]);

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

  const title = `${
    games.length > 0 && searchText
      ? `${games.length} search results `
      : "Searching"
  } for "${searchText}"`;
  useLayoutEffect(() => {
    window.document.title = `${title} - ${APP_NAME}`;
  }, [title, searchText]);
  useEffect(() => {
    const searchForGame = async (gameName: string) => {
      const games = await getIGDBRecords<Game>({
        endpoint: IGDBEndpoint.GAMES,
        search: gameName,
      });
      const coverIds = games.map(({ cover }) => cover);
      const coversForGame = await getIGDBRecords<Cover>({
        endpoint: IGDBEndpoint.COVERS,
        ids: coverIds,
      });
      const hiResCovers: Cover[] = coversForGame.map((cover) => ({
        ...cover,
        url: getIGDBHiResCover(cover?.url),
      }));

      setGames(games);
      setCovers(hiResCovers);
    };
    if (searchText) {
      setGames([]);
      setCovers([]);
      searchForGame(searchText);
    }
  }, [searchText]);

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
              defaultValue={[gamesPerPage]}
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
                const i =
                  (e.value[0] * (filteredGamesPerPageOptions.length - 1)) / 100;
                setGamesPerPage(filteredGamesPerPageOptions[i]);
              }}
            />
          </Card.Body>
        </Card.Root>
        <VStack md={{ width: "2/3" }} lg={{ width: "3/4" }} position="relative">
          {games.length > 0 && searchText ? (
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
