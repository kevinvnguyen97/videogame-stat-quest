import { Card, Text } from "@chakra-ui/react";
import { Slider } from "@components/ui/slider";

type GameResultsOptionsProps = {
  gamesPerPageOptions: number[];
  isGameResultsLoading: boolean;
  setGamesPerPage: (gamesPerPage: number) => void;
  gamesPerPageOptionIndex: number;
};

export const GameResultsOptions = (props: GameResultsOptionsProps) => {
  const {
    gamesPerPageOptions,
    isGameResultsLoading,
    setGamesPerPage,
    gamesPerPageOptionIndex,
  } = props;

  return (
    <Card.Root variant="subtle">
      <Card.Header fontWeight="bold">Options</Card.Header>
      <Card.Body>
        <Text>Games Per Page</Text>
        <Slider
          size="md"
          value={[
            (100 / (gamesPerPageOptions.length - 1)) * gamesPerPageOptionIndex,
          ]}
          marks={gamesPerPageOptions.map((gamesPerPageOption, i) => ({
            label: gamesPerPageOption,
            value: (100 / (gamesPerPageOptions.length - 1)) * i,
          }))}
          step={100 / (gamesPerPageOptions.length - 1)}
          thumbAlignment="center"
          thumbSize={{ width: 16, height: 16 }}
          disabled={isGameResultsLoading}
          onValueChangeEnd={(e) => {
            const i = Math.round(
              (e.value[0] * (gamesPerPageOptions.length - 1)) / 100
            );
            setGamesPerPage(gamesPerPageOptions[i]);
          }}
        />
      </Card.Body>
    </Card.Root>
  );
};
