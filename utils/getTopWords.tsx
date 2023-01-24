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
import createFetch from "@vercel/fetch";
const fetch = createFetch();

const dev = process.env.NODE_ENV === "development";

export default async function getTopWords({
  helpfulNotes,
  notHelpfulNotes,
  allNoteSummaries,
}: {
  helpfulNotes: notes | undefined;
  notHelpfulNotes: notes | undefined;
  allNoteSummaries: any;
}) {
  var startTime = Date.now();
  process.stdout.write("getAllNoteText...");
  if (helpfulNotes === undefined || notHelpfulNotes === undefined) {
    return null;
  }

  const allNotes = allNoteSummaries;

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
      (helpfulNotesCompleteString =
        helpfulNotesCompleteString + " " + item.summary)
  );

  notHelpfulNotesText.forEach(
    (item: noteText) =>
      (notHelpfulNotesCompleteString =
        notHelpfulNotesCompleteString + " " + item.summary)
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
    "’s",
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
