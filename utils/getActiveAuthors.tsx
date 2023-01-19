import getAllNotes from "./getAllNotes";
import { author, note } from "../utils/types";
const readline = require("readline");

function getMonthlyActiveAuthors(items: note[] | undefined) {
  var startTime = Date.now();
  process.stdout.write("getActiveAuthors...");

  if (items === undefined) {
    return null;
  }

  const o: { [key: string]: { notes: note[]; count: number } } = {};
  const finalObject: { [key: string]: any } = {};
  items.map((item: note) => {
    //create keys for all dates for which there are notes
    let noteDate = new Date(+item.createdAtMillis);
    var noteMonth = noteDate.getMonth() + 1;
    var formattedNoteMonth =
      noteDate.getMonth() + 1 < 10 ? "0" + noteMonth : noteMonth;
    var key = noteDate.getFullYear() + "-" + formattedNoteMonth;

    // add keys to object and assign them an empty array
    if (o[key] === undefined) {
      o[key] = { count: 0, notes: [] };
      finalObject[key] = 0;
    }

    //if key has note with author id, do nothing
    if (
      o[key].notes.some((note: note) => {
        return note.noteAuthorParticipantId === item.noteAuthorParticipantId;
      })
    ) {
      return;
      // else, add note to key
    } else {
      o[key].notes.push(item);
      o[key].count++;
      finalObject[key] = o[key].count;
    }
  });
  const timeSeries = Object.keys(finalObject)
    .sort()
    .reduce((obj: typeof o, key) => {
      obj[key] = finalObject[key];
      return obj;
    }, {});

  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getActiveAuthors...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");

  return timeSeries;
}

export default async function getActiveAuthors(
  allNotes: any
): Promise<{} | null> {
  const activeAuthors = await getMonthlyActiveAuthors(allNotes);
  return activeAuthors;
}
