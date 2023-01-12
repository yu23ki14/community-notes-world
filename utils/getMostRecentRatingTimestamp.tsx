import { rating } from "./types";

export default function getMostRecentRatingTimestamp(ratings: rating[]) {
  const timestamp = ratings[ratings.length - 1].createdAtMillis;
  const date = new Date(+timestamp);
  return date.toString();
}
