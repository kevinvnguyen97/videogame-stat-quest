import { useGameData } from "@api/igdb";
import { Text, Image, HStack, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getIGDBHiResCover } from "@utils/index";
import { YouTubeIFrame } from "@components/custom/YouTubeIFrame";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@components/ui/accordion";
import { Loading } from "@pages/Loading";
import { GameCard } from "@components/custom/GameCard";
import { GameInfoTable } from "@components/custom/GameInfoTable";

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
    dlcs = [],
    dlcCovers = [],
    parentGame,
    parentGameCover,
    isGameDataLoading,
  } = useGameData(parseInt(id ?? ""));

  if (isGameDataLoading) {
    return <Loading />;
  }

  return (
    <VStack gap={5} animationDuration="slow" animationStyle="scale-fade-in">
      <Text textAlign="center" fontSize="4xl">
        {game?.name}
      </Text>
      <HStack justifyContent="center" alignItems="start" gap={5}>
        <Image src={cover?.url} width={350} height="auto" />
        <GameInfoTable
          game={game}
          franchises={franchises}
          companies={companies}
          platforms={platforms}
          genres={genres}
          gameModes={gameModes}
        />
        <Text maxWidth={500}>{game?.summary}</Text>
      </HStack>
      <AccordionRoot collapsible size="lg">
        <AccordionItem value="0">
          <AccordionItemTrigger>Videos</AccordionItemTrigger>
          <AccordionItemContent>
            <HStack gap={5} overflowX="auto">
              {videos?.map(({ id, video_id }) => (
                <YouTubeIFrame
                  key={id}
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
            <HStack gap={5} overflowX="auto">
              {screenshots?.map(({ id, url }) => (
                <Image key={id} src={url} width="auto" height={250} />
              ))}
            </HStack>
          </AccordionItemContent>
        </AccordionItem>
        {dlcs.length > 0 && (
          <AccordionItem value="2">
            <AccordionItemTrigger>DLCs</AccordionItemTrigger>
            <AccordionItemContent>
              <HStack gap={5} overflowX="auto">
                {dlcs?.map((dlc) => {
                  const cover = dlcCovers.find(
                    (dlcCover) => dlcCover.game === dlc.id
                  );
                  if (!cover) {
                    return undefined;
                  }
                  const hiResCoverUrl = getIGDBHiResCover(cover?.url);
                  return (
                    <GameCard
                      key={dlc.id}
                      game={dlc}
                      coverUrl={hiResCoverUrl}
                      width={600}
                    />
                  );
                })}
              </HStack>
            </AccordionItemContent>
          </AccordionItem>
        )}
        {parentGame && (
          <AccordionItem value="3">
            <AccordionItemTrigger>Parent Game</AccordionItemTrigger>
            <AccordionItemContent>
              <GameCard
                game={parentGame}
                coverUrl={parentGameCover?.url}
                width={600}
              />
            </AccordionItemContent>
          </AccordionItem>
        )}
      </AccordionRoot>
    </VStack>
  );
};
