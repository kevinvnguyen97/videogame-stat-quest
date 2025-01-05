import { HStack, Image } from "@chakra-ui/react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
} from "@components/ui/accordion";
import { getIGDBHiResCover } from "@utils/index";
import { GameCard } from "@components/custom/GameCard";
import { YouTubeIFrame } from "@components/custom/YouTubeIFrame";

type GameContentAccordionProps = {
  videos: GameVideo[];
  screenshots: Screenshot[];
  dlcs: Game[];
  dlcCovers: Cover[];
  parentGame?: Game;
  parentGameCover?: Cover;
};
export const GameContentAccordion = (props: GameContentAccordionProps) => {
  const {
    videos = [],
    screenshots = [],
    dlcs = [],
    dlcCovers = [],
    parentGame,
    parentGameCover,
  } = props;
  return (
    <AccordionRoot collapsible size="lg">
      {videos.length > 0 && (
        <AccordionItem value="videos">
          <AccordionItemTrigger>Videos ({videos.length})</AccordionItemTrigger>
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
      )}
      {screenshots.length > 0 && (
        <AccordionItem value="screenshots">
          <AccordionItemTrigger>
            Screenshots ({screenshots.length})
          </AccordionItemTrigger>
          <AccordionItemContent>
            <HStack gap={5} overflowX="auto">
              {screenshots?.map(({ id, url }) => (
                <Image key={id} src={url} width="auto" height={250} />
              ))}
            </HStack>
          </AccordionItemContent>
        </AccordionItem>
      )}
      {dlcs.length > 0 && (
        <AccordionItem value="dlcs">
          <AccordionItemTrigger>DLCs ({dlcs.length})</AccordionItemTrigger>
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
        <AccordionItem value="parent">
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
  );
};
