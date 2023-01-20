import { note, rating } from "./types";
export default function getMonthlyTimeSeries(
  items: note[] | rating[] | undefined
) {
  if (items === undefined) {
    return null;
  }
  const readline = require("readline");
  var startTime = Date.now();
  process.stdout.write("getMonthlyTimeSeries...");
  const o: { [key: string]: number } = {};
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
  let elapsed = Date.now() - startTime;
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `getMonthlyTimeSeries...Done ✅ ${(elapsed / 1000).toFixed(3)}s`
  );
  process.stdout.write("\n");
  return timeSeries;
}
