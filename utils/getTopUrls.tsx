import createFetch from "@vercel/fetch";
import { parse } from "csv-parse/sync";
import normalizeUrl from "normalize-url";
import { createImportSpecifier } from "typescript";
import { notes } from "../utils/types";
import {
  currentDayFormatted,
  currentMonthFormatted,
  currentYear,
} from "./dates";
import { note, noteText } from "./types";
const wordFrequency = require("word-freq-counter");
var stripCommon = require("strip-common-words");
const readline = require("readline");
const urlRegex = require("url-regex");

const fetch = createFetch();

const dev = process.env.NODE_ENV === "development";

export default async function getTopUrls({
  helpfulNotes,
  notHelpfulNotes,
}: {
  helpfulNotes: notes | undefined;
  notHelpfulNotes: notes | undefined;
}) {
  var startTime = Date.now();
  process.stdout.write("getAllNoteText...");
  if (helpfulNotes === undefined || notHelpfulNotes === undefined) {
    return null;
  }
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
      (helpfulNotesCompleteString =
        helpfulNotesCompleteString + " " + item.summary)
  );

  notHelpfulNotesText.forEach(
    (item: noteText) =>
      (notHelpfulNotesCompleteString =
        notHelpfulNotesCompleteString + item.summary)
  );

  let helpfulUrls = helpfulNotesCompleteString.match(urlRegex());
  let notHelpfulUrls = notHelpfulNotesCompleteString.match(urlRegex());

  const helpfulNormalizedUrls = helpfulUrls?.map((url) => {
    return normalizeUrl(url, {
      stripHash: true,
      stripProtocol: true,
      stripWWW: true,
      removeQueryParameters: true,
    }).split("/")[0];
  });

  const notHelpfulNormalizedUrls = notHelpfulUrls?.map((url) => {
    return normalizeUrl(url, {
      stripHash: true,
      stripProtocol: true,
      stripWWW: true,
      removeQueryParameters: true,
    }).split("/")[0];
  });

  let rankedHelpful: { [key: string]: number } = {};
  let rankedNotHelpful: { [key: string]: number } = {};

  helpfulNormalizedUrls?.forEach((item: string) => {
    if (Object.keys(rankedHelpful).some((key) => item === key)) {
      rankedHelpful[item]++;
    } else {
      rankedHelpful[item] = 1;
    }
  });
  notHelpfulNormalizedUrls?.forEach((item: string) => {
    if (Object.keys(rankedNotHelpful).some((key) => item === key)) {
      rankedNotHelpful[item]++;
    } else {
      rankedNotHelpful[item] = 1;
    }
  });

  rankedHelpful["youtube.com"] =
    rankedHelpful["youtube.com"] + rankedHelpful["youtu.be"];

  rankedNotHelpful["youtube.com"] =
    rankedNotHelpful["youtube.com"] + rankedNotHelpful["youtu.be"];

  rankedHelpful["en.wikipedia.org"] =
    rankedHelpful["en.wikipedia.org"] + rankedHelpful["en.m.wikipedia.org"];

  rankedNotHelpful["en.wikipedia.org"] =
    rankedNotHelpful["en.wikipedia.org"] +
    rankedNotHelpful["en.m.wikipedia.org"];

  delete rankedHelpful["youtu.be"];
  delete rankedNotHelpful["youtu.be"];
  delete rankedHelpful["en.m.wikipedia.org"];
  delete rankedNotHelpful["en.m.wikipedia.org"];

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

  let sortedHelpfulUrls = sortableHelpful
    .sort(function (a: [string, number], b: [string, number]) {
      return b[1] - a[1];
    })
    .slice(0, 9);

  let sortedNotHelpfulUrls = sortableNotHelpful
    .sort(function (a: [string, number], b: [string, number]) {
      return b[1] - a[1];
    })
    .slice(0, 9);
  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getAllNotesText...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
  return {
    topHelpfulUrls: sortedHelpfulUrls,
    topNotHelpfulUrls: sortedNotHelpfulUrls,
  };
}
