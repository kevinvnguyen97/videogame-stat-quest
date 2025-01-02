import { useGameData } from "@api/igdb";
import { Box, Text, Image, HStack, Table, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { formatIGDBDate } from "@utils/index";
import { YouTubeIFrame } from "@components/custom/YouTubeIFrame";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@components/ui/accordion";
import { Loading } from "@pages/Loading";
import { StarRating } from "@components/custom/StarRating";

export const GameInfo = () => {
  const { id } = useParams();

  const {
    game,
    cover,
    platforms = [],
    genres = [],
    videos = [],
    gameModes = [],
    screenshots = [],
    companies = [],
    franchises = [],
    // dlcs = [],
  } = useGameData(parseInt(id ?? ""));

  if (!game || !cover) {
    return <Loading />;
  }

  return (
    <VStack gap={5} animationDuration="slow" animationStyle="scale-fade-in">
      <Text textAlign="center" fontSize="4xl">
        {game?.name}
      </Text>
      <HStack justifyContent="center" alignItems="start" gap={5}>
        <Image src={cover?.url} width={350} height="auto" />
        <Table.Root width={350}>
          <Table.Body>
            <Table.Row>
              <Table.ColumnHeader>Release Date</Table.ColumnHeader>
              <Table.Cell>
                {formatIGDBDate(game?.first_release_date ?? 0)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Rating</Table.ColumnHeader>
              <Table.Cell>
                <StarRating rating={game?.total_rating} />
                {game?.total_rating_count > 0
                  ? `${Math.round(game?.total_rating ?? 0)}%`
                  : "N/A"}{" "}
                ({game?.total_rating_count ?? 0} reviews)
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Franchise</Table.ColumnHeader>
              <Table.Cell>
                {franchises.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Companies</Table.ColumnHeader>
              <Table.Cell>
                {companies?.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Platforms</Table.ColumnHeader>
              <Table.Cell>
                {platforms?.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Genres</Table.ColumnHeader>
              <Table.Cell>
                {genres?.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.ColumnHeader>Game Modes</Table.ColumnHeader>
              <Table.Cell>
                {gameModes?.map(({ slug, name }) => (
                  <Box key={slug}>{name}</Box>
                ))}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
        <Text maxWidth={500}>{game?.summary}</Text>
      </HStack>
      <AccordionRoot collapsible size="lg">
        <AccordionItem value="0">
          <AccordionItemTrigger>Videos</AccordionItemTrigger>
          <AccordionItemContent>
            <HStack gap={5} overflowX="scroll">
              {videos?.map(({ video_id }) => (
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
              {screenshots?.map(({ image_id, url }) => (
                <Image key={image_id} src={url} width="auto" height={250} />
              ))}
            </HStack>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionItemTrigger>DLCs</AccordionItemTrigger>
          <AccordionItemContent></AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </VStack>
  );
};
