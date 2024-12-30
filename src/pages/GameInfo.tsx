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
  const [genres, setGenres] = useState<Genre[]>([]);

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
          const [covers, platforms, genres] = await Promise.all([
            getIGDBRecords<Cover>({
              endpoint: IGDBEndpoint.COVERS,
              ids: [game.cover],
            }),
            getIGDBRecords<Platform>({
              endpoint: IGDBEndpoint.PLATFORMS,
              ids: game.platforms,
            }),
            getIGDBRecords<Genre>({
              endpoint: IGDBEndpoint.GENRES,
              ids: game.genres,
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
          setGenres(genres);
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
      <HStack justifyContent="center" gap={5}>
        <Image src={cover.url} width={350} height="auto" />
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
            <Table.ColumnHeader>Genres</Table.ColumnHeader>
            <Table.Cell>
              {genres.map(({ name }) => (
                <Box>{name}</Box>
              ))}
            </Table.Cell>
          </Table.Row>
        </Table.Root>
        <Text maxWidth={500}>{game.summary}</Text>
      </HStack>
    </Box>
  );
};
