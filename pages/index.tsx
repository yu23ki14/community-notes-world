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
import getAllNotesStatus from "../utils/getAllNotesStatus";
import getTopWords from "../utils/getTopWords";
import getTopUrls from "../utils/getTopUrls";
import getAllRatings from "../utils/getAllRatings";
import getMonthlyTimeSeries from "../utils/getMonthlyTimeSeries";
import getTopTweetAuthors from "../utils/getTopTweetAuthors";
import getMostRecentRatingTimestamp from "../utils/getMostRecentRatingTimestamp";
import getTopAuthors from "../utils/getTopAuthors";
import { styled } from "../utils/styles";
import {
  author,
  notes,
  noteTimeSeries,
  ratingTimeSeries,
  tweetAuthor,
} from "../utils/types";
import RatingActivity from "../components/ratingActivity";
import getUserEnrollmentData from "../utils/getUserEnrollmentData";
import UserEnrollmentState from "../components/userEnrollmentState";
import EmptyState from "../components/emptyState";
import React from "react";
import { endLogging, startLogging } from "../utils/logging";
import getAllNoteSummaries from "../utils/getAllNoteSummaries";
import TopTweetAuthorsLeaderBoard from "../components/topTweetAuthorsLeaderboard";

type authorArray = author[];
const StyledTitle = styled("h1", {
  gridColumn: "span 2",
  letterSpacing: "-0.029375rem",
  margin: "1rem 0 0",
  padding: "3rem 0 1.5rem 0",
  borderTop: "1px solid $slate6",
  fontSize: "1.5rem",
  fontWeight: "600",
  variants: {
    noBorderTop: {
      true: {
        borderTop: "none",
      },
    },
  },
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
  topTweetAuthors,
  topAuthorsLastWeek,
  topAuthorsLastMonth,
  topWords,
  topUrls,
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
  topTweetAuthors?: tweetAuthor[];
  topAuthorsLastWeek?: authorArray;
  topAuthorsLastMonth?: authorArray;
  topWords?: any;
  topUrls?: any;
  userStates?: {
    earned_in: number;
    earned_out: number;
    new_user: number;
    at_risk: number;
  };
}) {
  return (
    <Layout lastUpdated={lastUpdated}>
      <StyledTitle noBorderTop>Leaderboards</StyledTitle>
      {topAuthors && topAuthorsLastMonth && topAuthorsLastWeek ? (
        <TopWritersLeaderBoard
          topAuthors={topAuthors}
          topAuthorsLastMonth={topAuthorsLastMonth}
          topAuthorsLastWeek={topAuthorsLastWeek}
        />
      ) : (
        <EmptyState />
      )}
      {topTweetAuthors ? (
        <TopTweetAuthorsLeaderBoard topTweetAuthors={topTweetAuthors} />
      ) : (
        <EmptyState />
      )}
      <StyledTitle>Activity</StyledTitle>
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
      {userStates ? (
        <UserEnrollmentState userStates={userStates} />
      ) : (
        <EmptyState />
      )}
      {activeAuthors ? (
        <ActiveAuthors activeAuthorsTimeSeries={activeAuthors} />
      ) : (
        <EmptyState />
      )}
      {/* <StyledTitle>Ratings</StyledTitle>
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
      )} */}
      <StyledTitle>Frequent words and urls</StyledTitle>
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
      {topUrls ? (
        <React.Fragment>
          <TopWords
            title="Frequent URLs in notes with status of Helpful"
            topWords={topUrls.topHelpfulUrls}
          />
          <TopWords
            title="Frequent URLs in notes with status of Not Helpful"
            topWords={topUrls.topNotHelpfulUrls}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <EmptyState />
          <EmptyState />
        </React.Fragment>
      )}
    </Layout>
  );
}
export async function getStaticProps() {
  startLogging("Starting site build...");
  const startTime = Date.now();
  let { allNotes, helpfulNotes, notHelpfulNotes, needsMoreRatingsNotes } =
    await getAllNotesStatus();
  //   let {
  //     allRatings,
  //     helpfulRatings,
  //     notHelpfulRatings,
  //     somewhatHelpfulRatings,
  //   } = await getAllRatings();
  const helpfulNotesTimeSeries = getMonthlyTimeSeries(helpfulNotes);
  const notHelpfulNotesTimeSeries = getMonthlyTimeSeries(notHelpfulNotes);
  const allNotesTimeSeries = getMonthlyTimeSeries(allNotes);
  const needsMoreRatingsNotesTimeSeries = getMonthlyTimeSeries(
    needsMoreRatingsNotes
  );
  //   const allRatingsTimeSeries = getMonthlyTimeSeries(allRatings);
  //   const helpfulRatingsTimeSeries = getMonthlyTimeSeries(helpfulRatings);
  //   const notHelpfulRatingsTimeSeries = getMonthlyTimeSeries(notHelpfulRatings);
  //   const somewhatHelpfulRatingsTimeSeries = getMonthlyTimeSeries(
  //     somewhatHelpfulRatings
  //   );
  let allNoteSummaries = await getAllNoteSummaries();
  let topWords = await getTopWords({
    allNoteSummaries: allNoteSummaries,
    helpfulNotes: helpfulNotes,
    notHelpfulNotes: notHelpfulNotes,
  });
  let topUrls = await getTopUrls({
    allNoteSummaries: allNoteSummaries,
    helpfulNotes: helpfulNotes,
    notHelpfulNotes: notHelpfulNotes,
  });
  let topAuthors = await getTopAuthors({ helpfulNotes: helpfulNotes });
  let activeAuthors = await getActiveAuthors(allNotes);
  //   let activeRaters = await getActiveRaters({ allRatings });
  let topAuthorsLastMonth = await getTopAuthors({
    helpfulNotes: helpfulNotes,
    range: "last month",
  });
  let topAuthorsLastWeek = await getTopAuthors({
    helpfulNotes: helpfulNotes,
    range: "last week",
  });
  let topTweetAuthors = await getTopTweetAuthors(allNotes, allNoteSummaries);
  //   let lastUpdated = getMostRecentRatingTimestamp(allRatings);
  let userStates = await getUserEnrollmentData();
  endLogging("Finished building site in", startTime);
  return {
    props: {
      activeAuthors,
      //   activeRaters,
      topTweetAuthors,
      topWords,
      topUrls,
      allNotesTimeSeries,
      //   allRatingsTimeSeries,
      helpfulNotesTimeSeries,
      //   helpfulRatingsTimeSeries,
      //   lastUpdated,
      needsMoreRatingsNotesTimeSeries,
      notHelpfulNotesTimeSeries,
      //   notHelpfulRatingsTimeSeries,
      //   somewhatHelpfulRatingsTimeSeries,
      topAuthors,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      userStates,
    },
  };
}
