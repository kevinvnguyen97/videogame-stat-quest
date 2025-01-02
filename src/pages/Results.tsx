import { Box, Card, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { DateTime } from "luxon";
import { Loading } from "@pages/Loading";

export const Results = () => {
  const { searchText } = useParams();
  const navigate = useNavigate();

  const [games, setGames] = useState<Game[]>([]);
  const [covers, setCovers] = useState<Cover[]>([]);

  useLayoutEffect(() => {
    window.document.title = `Search Results for "${searchText}" - ${APP_NAME}`;
  }, [searchText]);
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
        url: cover.url.replace("t_thumb", "t_cover_big"),
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
        Search Results for "{searchText}"
      </Text>
      <GameSearch />
      {games.length > 0 && searchText ? (
        <HStack
          alignItems="start"
          animationDuration="slow"
          animationStyle="scale-fade-in"
        >
          <Card.Root variant="subtle" mdTo2xl={{ width: "1/3" }}>
            <Card.Header fontWeight="bold">Options</Card.Header>
          </Card.Root>
          <VStack mdTo2xl={{ width: "2/3" }}>
            {games.map(({ id, name, summary, first_release_date }) => {
              const cover = covers.find(({ game }) => game === id);
              return (
                <Card.Root
                  key={id}
                  variant="subtle"
                  width="100%"
                  flexDirection="row"
                  _hover={{ cursor: "pointer" }}
                  alignItems="start"
                  onClick={() => navigate(`/game/${id}`)}
                >
                  <Image src={cover?.url} fit="contain" />
                  <VStack alignItems="start">
                    <Card.Header fontWeight="bold">
                      {name} (
                      {DateTime.fromMillis(first_release_date * 1000).year})
                    </Card.Header>
                    <Card.Body>{summary}</Card.Body>
                  </VStack>
                </Card.Root>
              );
            })}
          </VStack>
        </HStack>
      ) : (
        <Loading />
      )}
    </Box>
  );
};
