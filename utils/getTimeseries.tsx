import getAllHelpfulNotes from "./getAllHelpfulNotes";
import { author, notes, note } from "../utils/types";
export default function getTimeSeries(allHelpfulNotes: note[]) {
  const o: any = {};
  allHelpfulNotes.map((note: note) => {
    let date = new Date(+note.createdAtMillis);
    var month = date.getMonth() + 1;
    var formattedMonth = date.getMonth() + 1 < 10 ? "0" + month : month;
    var key = date.getFullYear() + "-" + formattedMonth;
    if (o[key] === undefined) {
      o[key] = 0;
    }
    o[key]++;
  });
  const ordered = Object.keys(o)
    .sort()
    .reduce((obj: typeof o, key) => {
      obj[key] = o[key];
      return obj;
    }, {});
  console.log(ordered);
  const labels = Object.keys(ordered);
  const counts = Object.values(ordered);
  console.log(labels, counts);
  return { labels: labels, counts: counts };
}
