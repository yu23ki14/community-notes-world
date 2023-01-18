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

type authorArray = author[];
const StyledTitle = styled("h1", {
  gridColumn: "span 2",
  letterSpacing: "-0.04em",
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
  topHelpfulWords,
}: {
  activeAuthors: { [key: string]: number };
  activeRaters: { [key: string]: number };
  allNotesTimeSeries: noteTimeSeries;
  allRatingsTimeSeries: ratingTimeSeries;
  helpfulNotes: notes;
  helpfulNotesTimeSeries: noteTimeSeries;
  helpfulRatingsTimeSeries: ratingTimeSeries;
  lastUpdated: string;
  needsMoreRatingsNotes: notes;
  needsMoreRatingsNotesTimeSeries: noteTimeSeries;
  notHelpfulNotes: notes;
  notHelpfulNotesTimeSeries: noteTimeSeries;
  notHelpfulRatingsTimeSeries: ratingTimeSeries;
  somewhatHelpfulRatingsTimeSeries: ratingTimeSeries;
  topAuthors: authorArray;
  topAuthorsLastMonth: authorArray;
  topAuthorsLastWeek: authorArray;
  topHelpfulWords: any;
}) {
  return (
    <Layout lastUpdated={lastUpdated}>
      <StyledTitle>Notes</StyledTitle>
      <AllNotes allNotesTimeSeries={allNotesTimeSeries} />
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
      <TopWords topHelpfulWords={topHelpfulWords.topHelpfulWords} />
      <StyledTitle>Writers</StyledTitle>
      <TopWritersLeaderBoard
        topAuthors={topAuthors}
        topAuthorsLastMonth={topAuthorsLastMonth}
        topAuthorsLastWeek={topAuthorsLastWeek}
      />
      <ActiveAuthors activeAuthorsTimeSeries={activeAuthors} />
      <StyledTitle>Ratings</StyledTitle>
      <AllRatings allRatingsTimeSeries={allRatingsTimeSeries} />
      <RatingActivity
        helpfulRatingsTimeSeries={helpfulRatingsTimeSeries}
        notHelpfulRatingsTimeSeries={notHelpfulRatingsTimeSeries}
        somewhatHelpfulRatingsTimeSeries={somewhatHelpfulRatingsTimeSeries}
      />
      <ActiveRaters activeRatersTimeSeries={activeRaters} />
    </Layout>
  );
}
export async function getStaticProps() {
  console.log("getting static props");
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
  let topHelpfulWords = await getTopWords({
    helpfulNotes: helpfulNotes,
    notHelpfulNotes: notHelpfulNotes,
  });
  console.log("from index", topHelpfulWords);
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

  return {
    props: {
      activeAuthors,
      activeRaters,
      topHelpfulWords,
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
    },
  };
}
