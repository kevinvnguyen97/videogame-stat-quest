import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { Box, Text, Image, HStack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatIGDBDate } from "@utils/index";

export const GameInfo = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game>();
  const [cover, setCover] = useState<Cover>();
  const [platforms, setPlatforms] = useState<Platform[]>([]);

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
          const [covers, platforms] = await Promise.all([
            getIGDBRecords<Cover>({
              endpoint: IGDBEndpoint.COVERS,
              ids: [game.cover],
            }),
            getIGDBRecords<Platform>({
              endpoint: IGDBEndpoint.PLATFORMS,
              ids: game.platforms,
            }),
            getIGDBRecords<Video>({
              endpoint: IGDBEndpoint.VIDEOS,
              ids: game.videos,
            }),
          ]);
          const cover = covers[0];
          const hiResCover = {
            ...cover,
            url: cover.url.replace("t_thumb", "t_cover_big_2x"),
          };
          setGame(game);
          setCover(hiResCover);
          setPlatforms(platforms);
        }
      }
    };
    getGameInformation();
  }, [id]);

  if (!game || !cover) {
    return null;
  }

  return (
    <Box>
      <Text textAlign="center" fontSize="4xl">
        {game.name}
      </Text>
      <HStack justifyContent="center">
        <Image src={cover.url} scale={0.7} />
        <Table.Root width={500}>
          <Table.Row>
            <Table.ColumnHeader>Release Date</Table.ColumnHeader>
            <Table.Cell>{formatIGDBDate(game.first_release_date)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeader>Platforms</Table.ColumnHeader>
            <Table.Cell>
              {platforms.map(({ name }) => (
                <Box>{name}</Box>
              ))}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.ColumnHeader>Summary</Table.ColumnHeader>
            <Table.Cell>{game.summary}</Table.Cell>
          </Table.Row>
        </Table.Root>
      </HStack>
    </Box>
  );
};
