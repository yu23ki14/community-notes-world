import { note } from "../utils/types";
export default function getTimeSeries(notes: note[]) {
  const o: any = {};
  notes.map((note: note) => {
    let date = new Date(+note.createdAtMillis);
    var month = date.getMonth() + 1;
    var formattedMonth = date.getMonth() + 1 < 10 ? "0" + month : month;
    var key = date.getFullYear() + "-" + formattedMonth;
    if (o[key] === undefined) {
      o[key] = 0;
    }
    o[key]++;
  });
  const timeSeries = Object.keys(o)
    .sort()
    .reduce((obj: typeof o, key) => {
      obj[key] = o[key];
      return obj;
    }, {});
  return timeSeries;
}
