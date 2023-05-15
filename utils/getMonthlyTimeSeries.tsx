import { note, rating } from "./types";
import { groupBy, padStart } from "lodash";

export default function getMonthlyTimeSeries(
  items: note[] | rating[] | undefined
) {
  if (items === undefined) {
    return null;
  }
  const readline = require("readline");
  var startTime = Date.now();
  process.stdout.write("getMonthlyTimeSeries...");

  const groupedItems = groupBy(items, (item: note | rating) => {
    const date = new Date(+item.createdAtMillis);
    const formattedMonth = padStart(String(date.getMonth() + 1), 2, "0");
    return `${date.getFullYear()}-${formattedMonth}`;
  });

  const timeSeries = Object.keys(groupedItems)
    .sort()
    .reduce((obj: { [key: string]: number }, key) => {
      obj[key] = groupedItems[key].length;
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
