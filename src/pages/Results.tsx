import { Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { Loading } from "@pages/Loading";
import { GameCard } from "@components/custom/GameCard";
import { getIGDBHiResCover } from "@utils/index";

export const Results = () => {
  const { searchText } = useParams();

  const [games, setGames] = useState<Game[]>([]);
  const [covers, setCovers] = useState<Cover[]>([]);

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
      const uniqueGames = games.filter(({ parent_game }) => !parent_game);
      const coverIds = uniqueGames.map(({ cover }) => cover);
      const coversForGame = await getIGDBRecords<Cover>({
        endpoint: IGDBEndpoint.COVERS,
        ids: coverIds,
      });
      const hiResCovers = coversForGame.map((cover) => ({
        ...cover,
        url: getIGDBHiResCover(cover?.url),
      }));

      setGames(uniqueGames);
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
          mdTo2xl={{ width: "1/3" }}
          animationDuration="slow"
          animationStyle="scale-fade-in"
        >
          <Card.Header fontWeight="bold">Options</Card.Header>
        </Card.Root>
        <VStack mdTo2xl={{ width: "2/3" }} position="relative">
          {games.length > 0 && searchText ? (
            <>
              {games.map((game) => {
                const cover = covers.find((cover) => cover.game === game.id);
                return (
                  <GameCard key={game.id} game={game} coverUrl={cover?.url} />
                );
              })}
            </>
          ) : (
            <Loading />
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
