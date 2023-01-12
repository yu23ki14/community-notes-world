import getAllRatings from "./getAllRatings";
import { author, note, rating } from "./types";

function getMonthlyActiveRaters(items: rating[]) {
  const o: { [key: string]: { ratings: rating[]; count: number } } = {};
  const finalObject: { [key: string]: any } = {};
  items.map((item: rating) => {
    //create keys for all dates for which there are notes
    let ratingDate = new Date(+item.createdAtMillis);
    var ratingMonth = ratingDate.getMonth() + 1;
    var formattedNoteMonth =
      ratingDate.getMonth() + 1 < 10 ? "0" + ratingMonth : ratingMonth;
    var key = ratingDate.getFullYear() + "-" + formattedNoteMonth;

    // add keys to object and assign them an empty array
    if (o[key] === undefined) {
      o[key] = { count: 0, ratings: [] };
      finalObject[key] = 0;
    }

    //if key has note with author id, do nothing
    if (
      o[key].ratings.some((rating: rating) => {
        return rating.raterParticipantId === item.raterParticipantId;
      })
    ) {
      return;
      // else, add note to key
    } else {
      o[key].ratings.push(item);
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
  return timeSeries;
}

export default async function getActiveAuthors(range?: string): Promise<{}> {
  let { allRatings } = await getAllRatings();
  const activeRaters = getMonthlyActiveRaters(allRatings);
  return activeRaters;
}
