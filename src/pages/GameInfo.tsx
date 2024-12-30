import { getIGDBRecords, IGDBEndpoint } from "@api/igdb";
import { Box, Text, Image, HStack, Table, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatIGDBDate } from "@utils/index";
import { YouTubeIFrame } from "@components/custom/YouTubeIFrame";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@components/ui/accordion";

export const GameInfo = () => {
  const { id } = useParams();

  const [game, setGame] = useState<Game>();
  const [cover, setCover] = useState<Cover>();
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [videos, setVideos] = useState<GameVideo[]>([]);
  const [gameModes, setGameModes] = useState<GameMode[]>([]);

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
          const [covers, platforms, genres, videos, gameModes] =
            await Promise.all([
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
              getIGDBRecords<GameVideo>({
                endpoint: IGDBEndpoint.GAME_VIDEOS,
                ids: game.videos,
              }),
              getIGDBRecords<GameMode>({
                endpoint: IGDBEndpoint.GAME_MODES,
                ids: game.game_modes,
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
          setVideos(videos);
          setGameModes(gameModes);
        }
      }
    };
    getGameInformation();
  }, [id]);

  if (!game || !cover) {
    return null;
  }

  return (
    <VStack gap={5}>
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
          <Table.Row>
            <Table.ColumnHeader>Game Modes</Table.ColumnHeader>
            <Table.Cell>
              {gameModes.map(({ name }) => (
                <Box>{name}</Box>
              ))}
            </Table.Cell>
          </Table.Row>
        </Table.Root>
        <Text maxWidth={500}>{game.summary}</Text>
      </HStack>
      <AccordionRoot collapsible size="lg">
        <AccordionItem value="0">
          <AccordionItemTrigger>Videos</AccordionItemTrigger>
          <AccordionItemContent>
            <HStack gap={5} overflowX="scroll">
              {videos.map(({ video_id }) => (
                <YouTubeIFrame
                  key={video_id}
                  videoId={video_id}
                  width={400}
                  height={225}
                />
              ))}
            </HStack>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};
