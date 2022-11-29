import { rating } from "./types";

export default function getMostRecentRatingTimestamp(ratings: rating[]) {
  const timestamp = ratings[ratings.length - 1].createdAtMillis;
  console.log(typeof ratings[ratings.length - 1].createdAtMillis, timestamp);
  const date = new Date(+timestamp);
  console.log("from function", date);
  return date.toString();
}
