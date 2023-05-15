import createFetch from "@vercel/fetch";
import { parse } from "csv-parse/sync";
import {
  currentDayFormatted,
  currentMonthFormatted,
  currentYear,
} from "./dates";
import { noteText } from "./types";
import { startLogging, endLogging } from "./logging";

const fetch = createFetch();

const dev = process.env.NODE_ENV === "development";

export default async function getAllNoteSummaries() {
  var startTime = Date.now();
  startLogging("getAllNoteSummaries");

  const notesUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/notes/notes-00000.tsv`;

  const res = await fetch(notesUrl);
  if (!res.ok) {
    return null;
  }
  const text = await res.text();

  const allNotes = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
    to: dev ? 150000 : undefined,
  }).map((note: noteText) => {
    return {
      createdAtMillis: note.createdAtMillis,
      summary: note.summary,
      noteId: note.noteId,
      tweetId: note.tweetId,
    };
  });
  endLogging("getAllNoteSummaries", startTime);
  return allNotes;
}
