import ActiveAuthors from "../components/activeAuthors";
import ActiveRaters from "../components/activeRaters";
import HelpfulNoteActivity from "../components/helpfulNoteActivity";
import NoteActivity from "../components/noteActivity";
import AllNotes from "../components/allNotes";
import AllRatings from "../components/allRatings";
import Layout from "../components/layout";
import TopWords from "../components/topWords";
import TopWritersLeaderBoard from "../components/topWritersLeaderBoard";
import getActiveAuthors from "../utils/getActiveAuthors";
import getActiveRaters from "../utils/getActiveRaters";
import HelpfulNotePercentage from "../components/helpfulNotePercentage";
import getAllNotes from "../utils/getAllNotes";
import getTopWords from "../utils/getTopWords";
import getAllRatings from "../utils/getAllRatings";
import getMonthlyTimeSeries from "../utils/getMonthlyTimeSeries";
import getMostRecentRatingTimestamp from "../utils/getMostRecentRatingTimestamp";
import getTopAuthors from "../utils/getTopAuthors";
import { styled } from "../utils/styles";
import {
  author,
  notes,
  noteTimeSeries,
  ratingTimeSeries,
} from "../utils/types";
import RatingActivity from "../components/ratingActivity";
import getUserEnrollmentData from "../utils/getUserEnrollmentData";
import UserEnrollmentState from "../components/userEnrollmentState";
import EmptyState from "../components/emptyState";
import React from "react";
import { endLogging, startLogging } from "../utils/logging";

type authorArray = author[];
const StyledTitle = styled("h1", {
  gridColumn: "span 2",
  letterSpacing: "-0.04rem",
  margin: "2rem .25rem 2rem",
});
export default function Home({
  activeAuthors,
  activeRaters,
  allNotesTimeSeries,
  allRatingsTimeSeries,
  helpfulNotes,
  helpfulNotesTimeSeries,
  helpfulRatingsTimeSeries,
  lastUpdated,
  needsMoreRatingsNotesTimeSeries,
  notHelpfulNotesTimeSeries,
  notHelpfulRatingsTimeSeries,
  somewhatHelpfulRatingsTimeSeries,
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
  topWords,
  userStates,
}: {
  activeAuthors?: { [key: string]: number };
  activeRaters?: { [key: string]: number };
  allNotesTimeSeries?: noteTimeSeries;
  allRatingsTimeSeries?: ratingTimeSeries;
  helpfulNotes?: notes;
  helpfulNotesTimeSeries?: noteTimeSeries;
  helpfulRatingsTimeSeries?: ratingTimeSeries;
  lastUpdated?: string;
  needsMoreRatingsNotes?: notes;
  needsMoreRatingsNotesTimeSeries?: noteTimeSeries;
  notHelpfulNotes?: notes;
  notHelpfulNotesTimeSeries?: noteTimeSeries;
  notHelpfulRatingsTimeSeries?: ratingTimeSeries;
  somewhatHelpfulRatingsTimeSeries?: ratingTimeSeries;
  topAuthors?: authorArray;
  topAuthorsLastMonth?: authorArray;
  topAuthorsLastWeek?: authorArray;
  topWords?: any;
  userStates?: {
    earned_in: number;
    earned_out: number;
    new_user: number;
    at_risk: number;
  };
}) {
  return (
    <Layout lastUpdated={lastUpdated}>
      <StyledTitle>Notes</StyledTitle>
      {allNotesTimeSeries ? (
        <AllNotes allNotesTimeSeries={allNotesTimeSeries} />
      ) : (
        <EmptyState />
      )}
      {allNotesTimeSeries &&
      helpfulNotesTimeSeries &&
      notHelpfulNotesTimeSeries &&
      needsMoreRatingsNotesTimeSeries ? (
        <React.Fragment>
          <NoteActivity
            allNotesTimeSeries={allNotesTimeSeries}
            helpfulNotesTimeSeries={helpfulNotesTimeSeries}
            notHelpfulNotesTimeSeries={notHelpfulNotesTimeSeries}
            needsMoreRatingsNotesTimeSeries={needsMoreRatingsNotesTimeSeries}
          />
          <HelpfulNoteActivity
            allNotesTimeSeries={allNotesTimeSeries}
            helpfulNotesTimeSeries={helpfulNotesTimeSeries}
            notHelpfulNotesTimeSeries={notHelpfulNotesTimeSeries}
            needsMoreRatingsNotesTimeSeries={needsMoreRatingsNotesTimeSeries}
          />
          <HelpfulNotePercentage
            allNotesTimeSeries={allNotesTimeSeries}
            helpfulNotesTimeSeries={helpfulNotesTimeSeries}
            notHelpfulNotesTimeSeries={notHelpfulNotesTimeSeries}
            needsMoreRatingsNotesTimeSeries={needsMoreRatingsNotesTimeSeries}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <EmptyState />
          <EmptyState />
          <EmptyState />
        </React.Fragment>
      )}
      {topWords ? (
        <React.Fragment>
          <TopWords
            title="Frequent words in notes with status of Helpful"
            topWords={topWords.topHelpfulWords}
          />
          <TopWords
            title="Frequent words in notes with status of Not Helpful"
            topWords={topWords.topNotHelpfulWords}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <EmptyState />
          <EmptyState />
        </React.Fragment>
      )}
      <StyledTitle>Writers</StyledTitle>
      {topAuthors && topAuthorsLastMonth && topAuthorsLastWeek ? (
        <TopWritersLeaderBoard
          topAuthors={topAuthors}
          topAuthorsLastMonth={topAuthorsLastMonth}
          topAuthorsLastWeek={topAuthorsLastWeek}
        />
      ) : (
        <EmptyState />
      )}
      {activeAuthors ? (
        <ActiveAuthors activeAuthorsTimeSeries={activeAuthors} />
      ) : (
        <EmptyState />
      )}
      <StyledTitle>Ratings</StyledTitle>
      {allRatingsTimeSeries ? (
        <AllRatings allRatingsTimeSeries={allRatingsTimeSeries} />
      ) : (
        <EmptyState />
      )}
      {helpfulRatingsTimeSeries &&
      notHelpfulRatingsTimeSeries &&
      somewhatHelpfulRatingsTimeSeries ? (
        <RatingActivity
          helpfulRatingsTimeSeries={helpfulRatingsTimeSeries}
          notHelpfulRatingsTimeSeries={notHelpfulRatingsTimeSeries}
          somewhatHelpfulRatingsTimeSeries={somewhatHelpfulRatingsTimeSeries}
        />
      ) : (
        <EmptyState />
      )}
      {activeRaters ? (
        <ActiveRaters activeRatersTimeSeries={activeRaters} />
      ) : (
        <EmptyState />
      )}
      <StyledTitle>Contributor states</StyledTitle>
      {userStates ? (
        <UserEnrollmentState userStates={userStates} />
      ) : (
        <EmptyState />
      )}
    </Layout>
  );
}
export async function getStaticProps() {
  startLogging("Starting site build...");
  const startTime = Date.now();
  let { allNotes, helpfulNotes, notHelpfulNotes, needsMoreRatingsNotes } =
    await getAllNotes();
  let {
    allRatings,
    helpfulRatings,
    notHelpfulRatings,
    somewhatHelpfulRatings,
  } = await getAllRatings();
  const helpfulNotesTimeSeries = getMonthlyTimeSeries(helpfulNotes);
  const notHelpfulNotesTimeSeries = getMonthlyTimeSeries(notHelpfulNotes);
  const allNotesTimeSeries = getMonthlyTimeSeries(allNotes);
  const needsMoreRatingsNotesTimeSeries = getMonthlyTimeSeries(
    needsMoreRatingsNotes
  );
  const allRatingsTimeSeries = getMonthlyTimeSeries(allRatings);
  const helpfulRatingsTimeSeries = getMonthlyTimeSeries(helpfulRatings);
  const notHelpfulRatingsTimeSeries = getMonthlyTimeSeries(notHelpfulRatings);
  const somewhatHelpfulRatingsTimeSeries = getMonthlyTimeSeries(
    somewhatHelpfulRatings
  );
  let topWords = await getTopWords({
    helpfulNotes: helpfulNotes,
    notHelpfulNotes: notHelpfulNotes,
  });
  let topAuthors = await getTopAuthors({ helpfulNotes: helpfulNotes });
  let activeAuthors = await getActiveAuthors(allNotes);
  let activeRaters = await getActiveRaters({ allRatings });
  let topAuthorsLastMonth = await getTopAuthors({
    helpfulNotes: helpfulNotes,
    range: "last month",
  });
  let topAuthorsLastWeek = await getTopAuthors({
    helpfulNotes: helpfulNotes,
    range: "last week",
  });
  let lastUpdated = getMostRecentRatingTimestamp(helpfulRatings);
  let userStates = await getUserEnrollmentData();
  endLogging("Finished building site in", startTime);
  return {
    props: {
      activeAuthors,
      activeRaters,
      topWords,
      allNotesTimeSeries,
      allRatingsTimeSeries,
      helpfulNotesTimeSeries,
      helpfulRatingsTimeSeries,
      lastUpdated,
      needsMoreRatingsNotesTimeSeries,
      notHelpfulNotesTimeSeries,
      notHelpfulRatingsTimeSeries,
      somewhatHelpfulRatingsTimeSeries,
      topAuthors,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      userStates,
    },
  };
}
