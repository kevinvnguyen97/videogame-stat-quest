import { useGameData } from "@api/igdb";
import { Text, Image, HStack, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Loading } from "@pages/Loading";
import { GameInfoTable } from "@components/custom/GameInfoTable";
import { GameContentAccordion } from "@components/custom/GameContentAccordion";

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
      <GameContentAccordion
        videos={videos}
        screenshots={screenshots}
        dlcs={dlcs}
        dlcCovers={dlcCovers}
        parentGame={parentGame}
        parentGameCover={parentGameCover}
      />
    </VStack>
  );
};
