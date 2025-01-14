import { Group, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const GameSearch = (props: { showLoadingScreen?: () => void }) => {
  const { showLoadingScreen = () => {} } = props;

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <Group width="100%" maxWidth={500} attached>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for a game"
        variant="subtle"
        size="xl"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            showLoadingScreen();
            navigate(`/search/${input}`);
          }
        }}
      />
      <IconButton
        size="xl"
        colorPalette="blue"
        onClick={() => {
          showLoadingScreen();
          navigate(`/search/${input}`);
        }}
        disabled={!input}
      >
        <AiOutlineSearch />
      </IconButton>
    </Group>
  );
};
