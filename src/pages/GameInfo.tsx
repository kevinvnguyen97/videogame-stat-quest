import { getGameInfo } from "@api/igdb";
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
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [franchise, setFranchise] = useState<Franchise>();

  useEffect(() => {
    const getGameInformation = async () => {
      if (id) {
        const {
          game,
          cover,
          platforms,
          genres,
          videos,
          gameModes,
          screenshots,
          companies,
          franchise,
        } = await getGameInfo(parseInt(id));

        setGame(game);
        setCover(cover);
        setPlatforms(platforms);
        setGenres(genres);
        setVideos(videos);
        setGameModes(gameModes);
        setScreenshots(screenshots);
        setCompanies(companies);
        setFranchise(franchise);
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
      <HStack justifyContent="center" alignItems="start" gap={5}>
        <Image src={cover.url} width={350} height="auto" />
        <Table.Root width={350}>
          <Table.Body>
            <Table.Row>
              <Table.ColumnHeader>Release Date</Table.ColumnHeader>
              <Table.Cell>{formatIGDBDate(game.first_release_date)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Rating</Table.ColumnHeader>
              <Table.Cell>
                {Math.round(game.total_rating)}% ({game.total_rating_count}{" "}
                reviews)
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Franchise</Table.ColumnHeader>
              <Table.Cell>{franchise?.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Companies</Table.ColumnHeader>
              <Table.Cell>
                {companies.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Platforms</Table.ColumnHeader>
              <Table.Cell>
                {platforms.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Genres</Table.ColumnHeader>
              <Table.Cell>
                {genres.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Game Modes</Table.ColumnHeader>
              <Table.Cell>
                {gameModes.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
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
        <AccordionItem value="1">
          <AccordionItemTrigger>Screenshots</AccordionItemTrigger>
          <AccordionItemContent>
            <HStack gap={5} overflowX="scroll">
              {screenshots.map(({ image_id, url }) => (
                <Image key={image_id} src={url} width="auto" height={250} />
              ))}
            </HStack>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};
