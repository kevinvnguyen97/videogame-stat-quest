import "./App.css";
import { NavigationBar } from "@components/custom/NavigationBar";
import { Box } from "@chakra-ui/react";
import { Home } from "@pages/Home";

export const App = () => {
  return (
    <Box margin={5}>
      <NavigationBar />
      <Home />
    </Box>
  );
};
