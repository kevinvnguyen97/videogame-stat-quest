import { Card, Image, VStack, Text, Box } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { StarRating } from "@components/custom/StarRating";
import { useNavigate } from "react-router-dom";

export const GameCard = (props: {
  game: Game;
  coverUrl?: string;
  width?: number;
}) => {
  const { game, coverUrl, width } = props;
  const navigate = useNavigate();
  const {
    id,
    name,
    summary,
    first_release_date,
    total_rating = 0,
    total_rating_count = 0,
  } = game;

  return (
    <Card.Root
      key={id}
      variant="subtle"
      minWidth={width ?? "100%"}
      width={width ?? "100%"}
      flexDirection="row"
      _hover={{ cursor: "pointer" }}
      alignItems="start"
      onClick={() => navigate(`/game/${id}`)}
      animationDuration="slow"
      animationStyle="scale-fade-in"
    >
      <Image src={coverUrl} fit="contain" width={150} />
      <VStack alignItems="start">
        <Card.Header fontWeight="bold" fontSize="lg">
          {name}{" "}
          {first_release_date
            ? `(${DateTime.fromMillis(first_release_date * 1000).year})`
            : ""}
        </Card.Header>
        <Card.Body flexDirection="row" gap={5}>
          <Box>
            <StarRating rating={total_rating} />
            <Text>
              {game?.total_rating_count > 0
                ? `${Math.round(game?.total_rating ?? 0)}%`
                : "N/A"}
            </Text>
            <Text>({total_rating_count} reviews)</Text>
          </Box>
          <Text lineClamp={4}>{summary}</Text>
        </Card.Body>
      </VStack>
    </Card.Root>
  );
};
