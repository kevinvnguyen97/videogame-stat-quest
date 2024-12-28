import { Box, Card, HStack, Text, VStack, Image } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCoversById, getGamesByName } from "@api/igdb";

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
      const searchResults = await getGamesByName(gameName);
      const coverIds = searchResults.map((game) => game.cover);
      const coversForGame = await getCoversById(coverIds);
      setGames(searchResults.filter((game) => !game.parent_game));
      setCovers(coversForGame);
    };
    if (searchText) {
      searchForGame(searchText);
    }
  }, [searchText]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={5}>
      <Text textAlign="center" fontSize="4xl">
        Search Results for "{searchText}"
      </Text>
      <GameSearch />
      <HStack alignItems="start">
        <Card.Root variant="subtle" mdTo2xl={{ width: "1/3" }}>
          <Card.Header fontWeight="bold">Options</Card.Header>
        </Card.Root>
        <VStack mdTo2xl={{ width: "2/3" }}>
          {games.map((game) => {
            const cover = covers.find((cover) => cover.game === game.id);
            return (
              <Card.Root
                variant="subtle"
                width="100%"
                flexDirection="row"
                _hover={{ cursor: "pointer" }}
                alignItems="start"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                <Image src={cover?.url} fit="contain" />
                <VStack alignItems="start">
                  <Card.Header fontWeight="bold">{game.name}</Card.Header>
                  <Card.Body>{game.summary}</Card.Body>
                </VStack>
              </Card.Root>
            );
          })}
        </VStack>
      </HStack>
    </Box>
  );
};
