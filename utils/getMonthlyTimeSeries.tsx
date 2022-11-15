import { note, rating } from "./types";
export default function getMonthlyTimeSeries(items: note[] | rating[]) {
  const o: any = {};
  items.map((item: note | rating) => {
    let date = new Date(+item.createdAtMillis);
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
