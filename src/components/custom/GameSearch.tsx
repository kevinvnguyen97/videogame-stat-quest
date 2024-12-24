import { getGamesByName } from "@api/igdb";
import { Group, Input, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const GameSearch = () => {
  const [input, setInput] = useState("");

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
            getGamesByName(input);
          }
        }}
      />
      <IconButton
        size="xl"
        colorPalette="blue"
        onClick={() => getGamesByName(input)}
      >
        <AiOutlineSearch />
      </IconButton>
    </Group>
  );
};
