import { parse } from "csv-parse/sync";
import { createImportSpecifier } from "typescript";
import { notes } from "../utils/types";
import {
  currentDayFormatted,
  currentMonthFormatted,
  currentYear,
} from "./dates";
import { noteText, note } from "./types";
const wordFrequency = require("word-freq-counter");
var stripCommon = require("strip-common-words");
const readline = require("readline");

const dev = process.env.NODE_ENV === "development";

export default async function getTopWords({
  helpfulNotes,
  notHelpfulNotes,
}: {
  helpfulNotes: notes;
  notHelpfulNotes: notes;
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
      summary: note.summary,
      noteId: note.noteId,
    };
  });

  const helpfulNotesText = allNotes.filter((item: noteText) => {
    return helpfulNotes.some(
      (helpfulNote: note) => helpfulNote.noteId === item.noteId
    );
  });

  const notHelpfulNotesText = allNotes.filter((item: noteText) => {
    return notHelpfulNotes.some(
      (notHelpfulNote: note) => notHelpfulNote.noteId === item.noteId
    );
  });

  let helpfulNotesCompleteString = "";
  let notHelpfulNotesCompleteString = "";

  helpfulNotesText.forEach(
    (item: noteText) =>
      (helpfulNotesCompleteString = helpfulNotesCompleteString + item.summary)
  );

  notHelpfulNotesText.forEach(
    (item: noteText) =>
      (notHelpfulNotesCompleteString =
        notHelpfulNotesCompleteString + item.summary)
  );

  let strippedHelpful = stripCommon(helpfulNotesCompleteString);
  let strippedNotHelpful = stripCommon(notHelpfulNotesCompleteString);

  let rankedHelpful: { [key: string]: number } = wordFrequency(
    strippedHelpful,
    false
  );
  let rankedNotHelpful: { [key: string]: number } = wordFrequency(
    strippedNotHelpful,
    false
  );

  let sortableHelpful: any = [];
  let sortableNotHelpful: any = [];

  for (var item in rankedHelpful) {
    let newItem = [item, rankedHelpful[item]];
    sortableHelpful.push(newItem);
  }
  for (var item in rankedNotHelpful) {
    let newItem = [item, rankedNotHelpful[item]];
    sortableNotHelpful.push(newItem);
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
    "he",
    "'s",
  ];

  let filteredHelpfulWords = sortableHelpful
    .sort(function (a: [string, number], b: [string, number]) {
      return b[1] - a[1];
    })
    .filter(
      (item: [string, number]) =>
        !removedWords.some((word: string) => item[0] === word)
    )
    .slice(0, 9);

  let filteredNotHelpfulWords = sortableNotHelpful
    .sort(function (a: [string, number], b: [string, number]) {
      return b[1] - a[1];
    })
    .filter(
      (item: [string, number]) =>
        !removedWords.some((word: string) => item[0] === word)
    )
    .slice(0, 9);

  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getAllNotesText...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
  return {
    topHelpfulWords: filteredHelpfulWords,
    topNotHelpfulWords: filteredNotHelpfulWords,
  };
}

//TODO: #22 Rename this file and function to getAllNotesStatus
