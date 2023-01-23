import { parse } from "csv-parse/sync";
import {
  currentDayFormatted,
  currentMonthFormatted,
  currentYear,
} from "./dates";
import { note } from "./types";
const readline = require("readline");
import createFetch from "@vercel/fetch";
const fetch = createFetch();

const dev = process.env.NODE_ENV === "development";

export default async function getAllNotes() {
  var startTime = Date.now();
  process.stdout.write("getAllNotes...");
  process.stdout.write(
    `${currentYear}/${currentMonthFormatted}/${currentDayFormatted}`
  );
  const noteStatusHistoryUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/noteStatusHistory/noteStatusHistory-00000.tsv`;

  const res = await fetch(noteStatusHistoryUrl);
  if (!res.ok) {
    return {
      allNotes: undefined,
      helpfulNotes: undefined,
      notHelpfulNotes: undefined,
      needsMoreRatingsNotes: undefined,
    };
  }
  const text = await res.text();

  const allNotes = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
    to: dev ? 150000 : undefined,
  }).map((note: note) => {
    return {
      currentStatus: note.currentStatus,
      createdAtMillis: note.createdAtMillis,
      noteAuthorParticipantId: note.noteAuthorParticipantId,
      noteId: note.noteId,
    };
  });

  const helpfulNotes = allNotes.filter(
    (item: note) => item.currentStatus === "CURRENTLY_RATED_HELPFUL"
  );

  const notHelpfulNotes = allNotes.filter(
    (item: note) => item.currentStatus === "CURRENTLY_RATED_NOT_HELPFUL"
  );

  const needsMoreRatingsNotes = allNotes.filter(
    (item: note) =>
      item.currentStatus !== "CURRENTLY_RATED_HELPFUL" &&
      item.currentStatus !== "CURRENTLY_RATED_NOT_HELPFUL"
  );

  const notes = {
    allNotes: allNotes,
    helpfulNotes: helpfulNotes,
    notHelpfulNotes: notHelpfulNotes,
    needsMoreRatingsNotes: needsMoreRatingsNotes,
  };
  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`getAllNotes...Done ✅ ${(elapsed / 1000).toFixed(3)}s`);
  process.stdout.write("\n");

  return notes;
}

//TODO: #22 Rename this file and function to getAllNotesStatus
