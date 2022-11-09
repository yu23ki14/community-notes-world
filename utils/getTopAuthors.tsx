import getAllHelpfulNotes from "./getAllHelpfulNotes";
import { author, notes, note } from "../utils/types";
let currentTime = Date.now();

export default async function getTopAuthors(range?: string): Promise<author[]> {
  let allHelpfulNotes = await getAllHelpfulNotes();
  if (range === "last month") {
    allHelpfulNotes = allHelpfulNotes.filter((note: note) => {
      let noteDate = note.createdAtMillis;
      return currentTime - noteDate < 2629800000;
    });
  } else if (range === "last week") {
    allHelpfulNotes = allHelpfulNotes.filter((note: note) => {
      let noteDate = note.createdAtMillis;
      return currentTime - noteDate < 604800000;
    });
  }
  const authors: author[] = [];

  allHelpfulNotes.forEach((note: note) => {
    let authorIndex = authors.findIndex((author) => {
      return author.participantId === note.participantId;
    });
    if (authorIndex === -1) {
      authors.push({
        participantId: note.participantId,
        numberOfHelpfulNotes: 1,
        notes: [
          {
            noteId: note.noteId,
            createdAtMillis: note.createdAtMillis,
            participantId: note.participantId,
            currentStatus: note.currentStatus,
          },
        ],
      });
    } else {
      authors[authorIndex].numberOfHelpfulNotes++;
      authors[authorIndex].notes.push({
        noteId: note.noteId,
        createdAtMillis: note.createdAtMillis,
        participantId: note.participantId,
        currentStatus: note.currentStatus,
      });
    }
  });

  let topAuthors = authors
    .sort((a, b) => b.numberOfHelpfulNotes - a.numberOfHelpfulNotes)
    .slice(0, 10);

  return topAuthors;
}
