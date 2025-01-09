import "./App.css";
import { NavigationBar } from "@components/custom/NavigationBar";
import { Box } from "@chakra-ui/react";
import { Home } from "@pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { Results } from "@pages/Results";
import { GameInfo } from "@pages/GameInfo";

export const App = () => {
  return (
    <Box margin={5}>
      <NavigationBar />
      <Box marginTop={5}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/search/:searchText" element={<Results />} />
          <Route path="/game/:id" element={<GameInfo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};
