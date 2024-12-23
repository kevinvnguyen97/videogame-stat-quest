import { Image, Text, Box } from "@chakra-ui/react";
import { GameSearch } from "@components/custom/GameSearch";
import { APP_NAME } from "@constants/appName";
import { useLayoutEffect } from "react";

export const Home = () => {
  useLayoutEffect(() => {
    window.document.title = `Home - ${APP_NAME}`;
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Text textAlign="center" fontSize="4xl">
        {APP_NAME}
      </Text>
      <Image src="/src/assets/video_game_controller.gif" marginX="auto" />
      <GameSearch />
    </Box>
  );
};
