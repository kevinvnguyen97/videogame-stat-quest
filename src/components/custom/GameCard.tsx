import { Card, Image, VStack, Text } from "@chakra-ui/react";
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
    total_rating,
    total_rating_count,
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
      <Image src={coverUrl} fit="contain" width={250} />
      <VStack alignItems="start">
        <Card.Header fontWeight="bold" fontSize="lg">
          {name}{" "}
          {first_release_date
            ? `(${DateTime.fromMillis(first_release_date * 1000).year})`
            : ""}
        </Card.Header>
        {total_rating_count > 0 && (
          <Card.Header>
            <StarRating rating={total_rating} /> {Math.round(total_rating)}% (
            {total_rating_count} reviews)
          </Card.Header>
        )}
        <Card.Body>
          <Text lineClamp={4}>{summary}</Text>
        </Card.Body>
      </VStack>
    </Card.Root>
  );
};
