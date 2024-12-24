import "./App.css";
import { NavigationBar } from "@components/custom/NavigationBar";
import { Box } from "@chakra-ui/react";
import { Home } from "@pages/Home";
import { Route, Routes } from "react-router-dom";
import { Results } from "@pages/Results";

export const App = () => {
  return (
    <Box margin={5}>
      <NavigationBar />
      <Box marginTop={5}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/search/:searchText" element={<Results />} />
        </Routes>
      </Box>
    </Box>
  );
};
