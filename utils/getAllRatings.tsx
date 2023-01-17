import { parse } from "csv-parse/sync";
import { rating } from "./types";
import {
  currentYear,
  currentMonthFormatted,
  currentDayFormatted,
} from "./dates";
const readline = require("readline");

const dev = process.env.NODE_ENV === "development";

export default async function getAllRatings() {
  var startTime = Date.now();
  process.stdout.write("getAllRatings...");

  const ratingsUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/noteRatings/ratings-00000.tsv`;

  const res = await fetch(ratingsUrl);
  const text = await res.text();

  const allRatings = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
    to: dev ? 150000 : undefined,
  }).map((rating: rating) => {
    return {
      createdAtMillis: rating.createdAtMillis,
      helpfulnessLevel: rating.helpfulnessLevel,
      raterParticipantId: rating.raterParticipantId,
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
    allRatings: allRatings,
    helpfulRatings: helpfulRatings,
    notHelpfulRatings: notHelpfulRatings,
    somewhatHelpfulRatings: somewhatHelpfulRatings,
  };
  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getAllRatings...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
  return ratings;
}
