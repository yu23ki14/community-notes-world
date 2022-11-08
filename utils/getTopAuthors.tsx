import getAllHelpfulNotes from "./getAllHelpfulNotes";
import { author, notes, note } from "../utils/types";

export default async function getTopAuthors(): Promise<author[]> {
  let allHelpfulNotes = await getAllHelpfulNotes();

  const authors: author[] = [];

  allHelpfulNotes.forEach((note: note) => {
    let authorIndex = authors.findIndex((author) => {
      return author.participantId === note.participantId;
    });
    if (authorIndex === -1) {
      authors.push({
        participantId: note.participantId,
        numberOfHelpfulNotes: 1,
        notes: [],
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
