import getAllHelpfulNotes from "./getAllNotes";
import { author, notes, note } from "../utils/types";
let currentTime = Date.now();

export default async function getTopAuthors(range?: string): Promise<author[]> {
  let { helpfulNotes } = await getAllHelpfulNotes();
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
    noteExample: string;
  };
  const authors: leanAuthor[] = [];

  helpfulNotes.forEach((note: note) => {
    let authorIndex = authors.findIndex((author) => {
      return author.participantId === note.participantId;
    });
    if (authorIndex === -1) {
      authors.push({
        participantId: note.participantId,
        numberOfHelpfulNotes: 1,
        noteExample: note.noteId,
      });
    } else {
      authors[authorIndex].numberOfHelpfulNotes++;
    }
  });

  let topAuthors = authors
    .sort((a, b) => b.numberOfHelpfulNotes - a.numberOfHelpfulNotes)
    .slice(0, 10);

  return topAuthors;
}
