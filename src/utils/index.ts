import { DateTime } from "luxon";

export const formatIGDBDate = (unixTimeStamp: number) => {
  return DateTime.fromMillis(unixTimeStamp * 1000).toFormat("LLLL d, yyyy");
};

export const convertRatingPercentageToStars = (ratingPercentage: number) => {
  const numberOfStars = (ratingPercentage / 100) * 5;
  let numberOfFullStars = Math.trunc(numberOfStars);
  const remainingStarSegment = numberOfStars - numberOfFullStars;
  if (remainingStarSegment >= 0.7) {
    numberOfFullStars++;
  }
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

export const getIGDBHiResCover = (url: string) => {
  return url?.replace("t_thumb", "t_cover_big_2x");
};
