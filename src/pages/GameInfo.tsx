import { getCoversById, getGamesById } from "@api/igdb";
import { Box, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const GameInfo = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game>();
  const [cover, setCover] = useState<Cover>();

  useEffect(() => {
    const getGameInformation = async () => {
      const game = (await getGamesById([parseInt(id)]))[0];
      const cover = (await getCoversById([game.cover]))[0];

      setGame(game);
      setCover(cover);
    };
    getGameInformation();
  }, [id]);

  return (
    <Box>
      <Text textAlign="center" fontSize="4xl">
        {game?.name ?? "Loading"}
      </Text>
      <Image src={cover?.url} />
    </Box>
  );
};
