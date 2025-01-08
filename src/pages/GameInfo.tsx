import { useGameData } from "@hooks/igdb";
import { Text, Image, HStack, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Loading } from "@pages/Loading";
import { GameInfoTable } from "@components/custom/GameInfoTable";
import { GameContentAccordion } from "@components/custom/GameContentAccordion";
import { useEffect } from "react";
import { APP_NAME } from "@constants/appName";

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
    languages = [],
    similarGames = [],
    similarGameCovers = [],
    isGameDataLoading,
  } = useGameData(parseInt(id ?? ""));

  useEffect(() => {
    window.document.title = `${
      isGameDataLoading && !game ? "Loading" : game?.name
    } - ${APP_NAME}`;
  }, [game, isGameDataLoading]);

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
          languages={languages}
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
        similarGames={similarGames}
        similarGameCovers={similarGameCovers}
      />
    </VStack>
  );
};
