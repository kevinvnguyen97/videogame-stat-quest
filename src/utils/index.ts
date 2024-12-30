import { DateTime } from "luxon";

export const formatIGDBDate = (unixTimeStamp: number) => {
  return DateTime.fromMillis(unixTimeStamp * 1000).toFormat("LLLL d, yyyy");
};
