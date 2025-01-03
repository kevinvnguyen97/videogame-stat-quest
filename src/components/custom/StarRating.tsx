import { HStack } from "@chakra-ui/react";
import { convertRatingPercentageToStars } from "@utils/index";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export const StarRating = (props: { rating: number }) => {
  const { rating } = props;

  const { numberOfFullStars, isHalfStarPresent, numberOfEmptyStars } =
    convertRatingPercentageToStars(rating);

  return (
    <HStack>
      {numberOfFullStars > 0
        ? [...Array(numberOfFullStars)].map((_, i) => <BsStarFill key={i} />)
        : undefined}
      {isHalfStarPresent ? <BsStarHalf /> : undefined}
      {numberOfEmptyStars > 0
        ? [...Array(numberOfEmptyStars)].map((_, i) => <BsStar key={i} />)
        : undefined}
    </HStack>
  );
};
