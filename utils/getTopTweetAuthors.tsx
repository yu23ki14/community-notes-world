import { note, noteText, rating } from "./types";
import { groupBy, padStart } from "lodash";
const needle = require("needle");

export default async function getTopTweetAuthors(
  noteStatuses: note[],
  noteSummaries: noteText[]
) {
  if (noteStatuses === undefined || noteSummaries === undefined) {
    return null;
  }

  const filteredItems = noteStatuses.filter((item: note) => {
    const date = new Date(+item.createdAtMillis);
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 60));
    return (
      date > thirtyDaysAgo && item.currentStatus === "CURRENTLY_RATED_HELPFUL"
    );
  });

  const filteredNoteSummaries = noteSummaries.filter(
    (noteSummary: noteText) => {
      return filteredItems.some((filteredItem: note) => {
        return filteredItem.noteId === noteSummary.noteId;
      });
    }
  );

  const filteredNoteSummariesTweetIds = filteredNoteSummaries.map(
    (noteSummary: noteText) => {
      return noteSummary.tweetId;
    }
  );

  const token = process.env.BEARER_TOKEN;

  const endpointURL = "https://api.twitter.com/2/tweets?ids=";

  async function getRequest(noteIds: string[]) {
    const noteIdsString = noteIds.join(",");

    const params = {
      ids: noteIdsString,
      expansions: "author_id",
    };

    const res = await needle("get", endpointURL, params, {
      headers: {
        "User-Agent": "v2TweetLookupJS",
        authorization: `Bearer ${token}`,
      },
    });

    if (res.body) {
      return res.body;
    } else {
      throw new Error("Unsuccessful request");
    }
  }
  type TweetObject = {
    author_id: string;
    created_at: string;
    id: string;
    edit_history_tweet_ids: string[];
    text: string;
  };
  const finalUsers = [];
  const finalTweets: TweetObject[] = [];

  for (let i = 0; i < filteredNoteSummariesTweetIds.length; i += 50) {
    try {
      const tweetIdsBatch = filteredNoteSummariesTweetIds.slice(i, i + 50);
      const response = await getRequest(tweetIdsBatch);
      const { users } = response.includes;
      const { data } = response;
      const tweets: TweetObject[] = data;
      finalUsers.push(...users);
      finalTweets.push(...data);
    } catch (e) {
      console.log(e);
      process.exit(-1);
    }

    // Console log progress after each batch is complete
    console.log(
      `Batch ${Math.ceil((i + 50) / 50)} of ${Math.ceil(
        filteredNoteSummariesTweetIds.length / 50
      )} completed.`
    );

    // Wait for 1 second before making the next request
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log("end", finalUsers.length);
  // generate a tpo 10 list of users that appear most frequently in the finalUsers list, based on the id field, and return a ranked array of users with id, name, username, and count of occurrences
  const groupedUsers = groupBy(finalUsers, "id");
  const groupedUsersArray = Object.entries(groupedUsers);
  const groupedUsersArraySorted = groupedUsersArray.sort((a, b) => {
    return b[1].length - a[1].length;
  });
  const topTenUsers = groupedUsersArraySorted.slice(0, 10);
  let finalTopTenUsers = topTenUsers.map((user) => {
    const userObject = user[1][0];
    return {
      id: userObject.id,
      name: userObject.name,
      username: userObject.username,
      count: user[1].length,
      tweets: [],
    };
  });
  // for each user in finalTopTenUsers, find the tweets in the finalTweets const that match the user's id, and add the tweets to an array in to the user object
  finalTopTenUsers.forEach((user) => {
    const userTweets = finalTweets
      .filter((tweet) => {
        return tweet.author_id === user.id;
      })
      .map((tweet) => tweet.id);
    // @ts-ignore
    user.tweets = userTweets;
  });
  return finalTopTenUsers;
}
