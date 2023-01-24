import getAllNotes from "./getAllNotesStatus";
import { author, notes, note } from "../utils/types";
let currentTime = Date.now();
const readline = require("readline");

type props = {
  range?: string;
  helpfulNotes: any | undefined;
};

export default async function getTopAuthors({
  range,
  helpfulNotes,
}: props): Promise<author[] | null> {
  var startTime = Date.now();
  process.stdout.write("getTopAuthor...");

  if (helpfulNotes === undefined) {
    return null;
  }

  if (range === "last month") {
    helpfulNotes = helpfulNotes.filter((note: note) => {
      let noteDate = note.createdAtMillis;
      return currentTime - noteDate < 2629800000;
    });
  } else if (range === "last week") {
    helpfulNotes = helpfulNotes.filter((note: note) => {
      let noteDate = note.createdAtMillis;
      return currentTime - noteDate < 604800000;
    });
  }
  type leanAuthor = {
    participantId: string;
    numberOfHelpfulNotes: number;
    noteExampleId: string;
  };
  const authors: leanAuthor[] = [];

  helpfulNotes.forEach((note: note) => {
    let authorIndex = authors.findIndex((author) => {
      return author.participantId === note.noteAuthorParticipantId;
    });
    if (authorIndex === -1) {
      authors.push({
        participantId: note.noteAuthorParticipantId,
        numberOfHelpfulNotes: 1,
        noteExampleId: note.noteId,
      });
    } else {
      authors[authorIndex].numberOfHelpfulNotes++;
    }
  });

  let topAuthors = authors
    .sort((a, b) => b.numberOfHelpfulNotes - a.numberOfHelpfulNotes)
    .slice(0, 6);
  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getTopAuthors...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
  return topAuthors;
}
