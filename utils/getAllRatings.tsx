import { parse } from "csv-parse/sync";
import { rating } from "./types";
import {
  currentYear,
  currentMonthFormatted,
  currentDayFormatted,
} from "./dates";
import { stringify } from "querystring";
export default async function getAllRatings() {
  const ratingsUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/noteRatings/ratings-00000.tsv`;

  const res = await fetch(ratingsUrl);
  const text = await res.text();

  const allRatings = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
  }).map((rating: rating) => {
    return {
      createdAtMillis: rating.createdAtMillis,
      helpfulnessLevel: rating.helpfulnessLevel,
      helpful: rating.helpful,
      notHelpful: rating.notHelpful,
    };
  });

  const helpfulRatings = allRatings.filter(
    (item: rating) =>
      item.helpfulnessLevel === "HELPFUL" || item.helpful === "1"
  );

  const notHelpfulRatings = allRatings.filter(
    (item: rating) =>
      item.helpfulnessLevel === "NOT_HELPFUL" || item.notHelpful === "1"
  );

  const somewhatHelpfulRatings = allRatings.filter(
    (item: rating) => item.helpfulnessLevel === "SOMEWHAT_HELPFUL"
  );

  const ratings = {
    helpfulRatings: helpfulRatings,
    notHelpfulRatings: notHelpfulRatings,
    somewhatHelpfulRatings: somewhatHelpfulRatings,
  };

  return ratings;
}
