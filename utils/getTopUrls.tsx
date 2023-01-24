import normalizeUrl from "normalize-url";
import { notes } from "../utils/types";
import { note, noteText } from "./types";
const readline = require("readline");
const urlRegex = require("url-regex");
import { startLogging, endLogging } from "./logging";

export default async function getTopUrls({
  helpfulNotes,
  notHelpfulNotes,
  allNoteSummaries,
}: {
  helpfulNotes: notes | undefined;
  notHelpfulNotes: notes | undefined;
  allNoteSummaries: any;
}) {
  var startTime = Date.now();
  startLogging("getTopUrls");

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
  endLogging("getTopUrls", startTime);
  return {
    topHelpfulUrls: sortedHelpfulUrls,
    topNotHelpfulUrls: sortedNotHelpfulUrls,
  };
}
