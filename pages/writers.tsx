import React from "react";
import ActiveAuthors from "../components/activeAuthors";
import Layout from "../components/layout";
import NoteActivity from "../components/noteActivity";
import TopWritersLeaderBoard from "../components/topWritersLeaderBoard";
import getActiveAuthors from "../utils/getActiveAuthors";
import getAllNotes from "../utils/getAllNotes";
import getAllRatings from "../utils/getAllRatings";
import getMonthlyTimeSeries from "../utils/getMonthlyTimeSeries";
import getMostRecentRatingTimestamp from "../utils/getMostRecentRatingTimestamp";
import getTopAuthors from "../utils/getTopAuthors";

import {
  author,
  notes,
  noteTimeSeries,
  ratingTimeSeries,
} from "../utils/types";

type authorArray = author[];

export default function Home({
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
  allNotesTimeSeries,
  helpfulNotesTimeSeries,
  notHelpfulNotesTimeSeries,
  needsMoreRatingsNotesTimeSeries,
  activeAuthors,
  lastUpdated,
}: {
  topAuthors: authorArray;
  topAuthorsLastMonth: authorArray;
  topAuthorsLastWeek: authorArray;
  activeAuthors: { [key: string]: number };
  activeRaters: { [key: string]: number };
  allNotesTimeSeries: noteTimeSeries;
  helpfulNotes: notes;
  notHelpfulNotes: notes;
  needsMoreRatingsNotes: notes;
  helpfulNotesTimeSeries: noteTimeSeries;
  notHelpfulNotesTimeSeries: noteTimeSeries;
  needsMoreRatingsNotesTimeSeries: noteTimeSeries;
  helpfulRatingsTimeSeries: ratingTimeSeries;
  notHelpfulRatingsTimeSeries: ratingTimeSeries;
  somewhatHelpfulRatingsTimeSeries: ratingTimeSeries;
  lastUpdated: string;
}) {
  return (
    <Layout lastUpdated={lastUpdated}>
      <ActiveAuthors activeAuthorsTimeSeries={activeAuthors} />
      <TopWritersLeaderBoard
        topAuthors={topAuthors}
        topAuthorsLastMonth={topAuthorsLastMonth}
        topAuthorsLastWeek={topAuthorsLastWeek}
      />
      <NoteActivity
        allNotesTimeSeries={allNotesTimeSeries}
        helpfulNotesTimeSeries={helpfulNotesTimeSeries}
        notHelpfulNotesTimeSeries={notHelpfulNotesTimeSeries}
        needsMoreRatingsNotesTimeSeries={needsMoreRatingsNotesTimeSeries}
      />
    </Layout>
  );
}
export async function getStaticProps() {
  let { allNotes, helpfulNotes, notHelpfulNotes, needsMoreRatingsNotes } =
    await getAllNotes();
  let { helpfulRatings, notHelpfulRatings, somewhatHelpfulRatings } =
    await getAllRatings();
  const helpfulNotesTimeSeries = getMonthlyTimeSeries(helpfulNotes);
  const notHelpfulNotesTimeSeries = getMonthlyTimeSeries(notHelpfulNotes);
  const allNotesTimeSeries = getMonthlyTimeSeries(allNotes);
  const needsMoreRatingsNotesTimeSeries = getMonthlyTimeSeries(
    needsMoreRatingsNotes
  );
  let topAuthors = await getTopAuthors();
  let activeAuthors = await getActiveAuthors();
  let topAuthorsLastMonth = await getTopAuthors("last month");
  let topAuthorsLastWeek = await getTopAuthors("last week");
  let lastUpdated = getMostRecentRatingTimestamp(helpfulRatings);

  return {
    props: {
      allNotesTimeSeries,
      helpfulNotesTimeSeries,
      notHelpfulNotesTimeSeries,
      needsMoreRatingsNotesTimeSeries,
      topAuthors,
      activeAuthors,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      lastUpdated,
    },
  };
}
