import { parse } from "csv-parse/sync";
import { note } from "./types";
export default async function getAllHelpfulNotes() {
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth() + 1;
  var currentMonthFormatted =
    currentMonth < 10 ? "0" + currentMonth : currentMonth;
  var currentDay = new Date().getDate();
  var currentDayFormatted = currentDay < 10 ? "0" + currentDay : currentDay;
  const noteStatusHistoryUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/noteStatusHistory/noteStatusHistory-00000.tsv`;
  const notesUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/notes/notes-00000.tsv`;

  const res = await fetch(noteStatusHistoryUrl);
  const text = await res.text();

  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
  }).filter((item: note) => item.currentStatus === "CURRENTLY_RATED_HELPFUL");
  return records;
}
