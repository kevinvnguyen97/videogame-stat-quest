import { DateTime } from "luxon";

export const formatIGDBDate = (unixTimeStamp: number) => {
  return DateTime.fromMillis(unixTimeStamp * 1000).toFormat("LLLL d, yyyy");
};

export const convertRatingPercentageToStars = (ratingPercentage: number) => {
  const numberOfStars = (ratingPercentage / 100) * 5;
  const numberOfFullStars = Math.round(numberOfStars);
  const remainingStarSegment = numberOfStars - numberOfFullStars;
  const isHalfStarPresent =
    remainingStarSegment > 0.3 && remainingStarSegment < 0.7;
  const numberOfEmptyStars =
    5 - numberOfFullStars - (isHalfStarPresent ? 1 : 0);
  const starInfo = {
    numberOfStars,
    numberOfFullStars,
    isHalfStarPresent,
    numberOfEmptyStars,
  };
  return starInfo;
};
