import { rating, note } from "./types";

export default function getMostRecentRatingTimestamp(
  ratings: rating[] | undefined
) {
  if (ratings === undefined) {
    return null;
  }
  ratings.sort((a, b) => a.createdAtMillis - b.createdAtMillis);
  const timestamp = ratings[ratings.length - 1].createdAtMillis;
  const date = new Date(+timestamp);
  return date.toString();
}
