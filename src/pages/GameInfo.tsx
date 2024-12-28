import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GameInfo = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game>();
  const [cover, setCover] = useState<Cover>();

  useEffect(() => {
    const getGameInformation = async () => {
      if (id) {
        const game = (
          await getIGDBRecords<Game>({
            endpoint: IGDBEndpoint.GAMES,
            ids: [parseInt(id)],
          })
        )[0];
        if (game) {
          const cover = (
            await getIGDBRecords<Cover>({
              endpoint: IGDBEndpoint.COVERS,
              ids: [game.cover],
            })
          )[0];
          const hiResCover = {
            ...cover,
            url: cover.url.replace("t_thumb", "t_cover_big"),
          };
          setGame(game);
          setCover(hiResCover);
        }
      }
    };
    getGameInformation();
  }, [id]);

  return (
    <Box>
      <Text textAlign="center" fontSize="4xl">
        {game?.name ?? "Loading"}
      </Text>
      <HStack alignItems="top">
        <Text>{game?.summary}</Text>
        <Image src={cover?.url} />
      </HStack>
    </Box>
  );
};
