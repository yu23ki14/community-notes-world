import { parse } from "csv-parse/sync";
const wordFrequency = require("word-freq-counter");
var stripCommon = require("strip-common-words");
import {
  currentDayFormatted,
  currentMonthFormatted,
  currentYear,
} from "./dates";
import { noteText } from "./types";
const readline = require("readline");
//@ts-ignore

const dev = process.env.NODE_ENV === "development";

export default async function getTopWords({
  helpfulNotes,
  notHelpfulNotes,
}: {
  helpfulNotes: any;
  notHelpfulNotes: any;
}) {
  var startTime = Date.now();
  process.stdout.write("getAllNoteText...");

  const notesUrl = `https://ton.twimg.com/birdwatch-public-data/${currentYear}/${currentMonthFormatted}/${currentDayFormatted}/notes/notes-00000.tsv`;

  const res = await fetch(notesUrl);
  const text = await res.text();

  const allNotes = parse(text, {
    columns: true,
    skip_empty_lines: true,
    delimiter: "\t",
    to: dev ? 150000 : undefined,
  }).map((note: noteText) => {
    return {
      createdAtMillis: note.createdAtMillis,
      text: note.summary,
      noteId: note.noteId,
    };
  });

  const helpfulNotesText = allNotes.filter((item: noteText) => {
    return helpfulNotes.some(
      (helpfulNote: any) => helpfulNote.noteId === item.noteId
    );
  });

  let helpfulNotesCompleteString = "";

  helpfulNotesText.forEach(
    (item: any) =>
      (helpfulNotesCompleteString = helpfulNotesCompleteString + item.text)
  );
  let stripped = stripCommon(helpfulNotesCompleteString);
  let rankedWords = wordFrequency(stripped, false);
  let sortable = [];
  for (var item in rankedWords) {
    sortable.push([item, rankedWords[item]]);
  }

  const removedWords = [
    "this",
    "be",
    "",
    "of",
    "to",
    "were",
    "did",
    "is",
    "the",
    "a",
    "was",
    "has",
    "have",
    "are",
    "Tweet",
    "Twitter",
    "been",
    "an",
    "had",
    "does",
    "not",
    "being",
    "it",
    "&quot;",
    "his",
    "&amp;",
    "before",
    "made",
    "tweet",
    ",",
  ];

  let filteredHelpfulWords = sortable
    .sort(function (a, b) {
      return b[1] - a[1];
    })
    .filter((item) => !removedWords.some((word: string) => item[0] === word))
    .slice(0, 9);

  let topNotHelpfulWords;

  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getAllNotesText...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
  console.log("from get", filteredHelpfulWords);
  return {
    topHelpfulWords: filteredHelpfulWords,
  };
}

//TODO: #22 Rename this file and function to getAllNotesStatus
