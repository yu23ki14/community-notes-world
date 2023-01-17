import ActiveAuthors from "../components/activeAuthors";
import ActiveRaters from "../components/activeRaters";
import HelpfulNoteActivity from "../components/helpfulNoteActivity";
import NoteActivity from "../components/noteActivity";
import AllNotes from "../components/allNotes";
import Layout from "../components/layout";
import TopWritersLeaderBoard from "../components/topWritersLeaderBoard";
import getActiveAuthors from "../utils/getActiveAuthors";
import getActiveRaters from "../utils/getActiveRaters";
import HelpfulNotePercentage from "../components/helpfulNotePercentage";
import getAllNotes from "../utils/getAllNotes";
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
  margin: "1rem .25rem 2rem",
});
export default function Home({
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
  allNotesTimeSeries,
  helpfulNotesTimeSeries,
  notHelpfulNotesTimeSeries,
  needsMoreRatingsNotesTimeSeries,
  helpfulNotes,
  activeAuthors,
  activeRaters,
  helpfulRatingsTimeSeries,
  notHelpfulRatingsTimeSeries,
  somewhatHelpfulRatingsTimeSeries,
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
      <StyledTitle>Notes</StyledTitle>
      <AllNotes allNotesTimeSeries={allNotesTimeSeries} />
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
      <NoteActivity
        allNotesTimeSeries={allNotesTimeSeries}
        helpfulNotesTimeSeries={helpfulNotesTimeSeries}
        notHelpfulNotesTimeSeries={notHelpfulNotesTimeSeries}
        needsMoreRatingsNotesTimeSeries={needsMoreRatingsNotesTimeSeries}
      />
      <StyledTitle>Writers</StyledTitle>
      <TopWritersLeaderBoard
        topAuthors={topAuthors}
        topAuthorsLastMonth={topAuthorsLastMonth}
        topAuthorsLastWeek={topAuthorsLastWeek}
      />
      <ActiveAuthors activeAuthorsTimeSeries={activeAuthors} />
      <StyledTitle>Ratings</StyledTitle>
      <ActiveRaters activeRatersTimeSeries={activeRaters} />
      <RatingActivity
        helpfulRatingsTimeSeries={helpfulRatingsTimeSeries}
        notHelpfulRatingsTimeSeries={notHelpfulRatingsTimeSeries}
        somewhatHelpfulRatingsTimeSeries={somewhatHelpfulRatingsTimeSeries}
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
  const helpfulRatingsTimeSeries = getMonthlyTimeSeries(helpfulRatings);
  const notHelpfulRatingsTimeSeries = getMonthlyTimeSeries(notHelpfulRatings);
  const somewhatHelpfulRatingsTimeSeries = getMonthlyTimeSeries(
    somewhatHelpfulRatings
  );
  let topAuthors = await getTopAuthors();
  let activeAuthors = await getActiveAuthors();
  let activeRaters = await getActiveRaters();
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
      activeRaters,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      helpfulRatingsTimeSeries,
      notHelpfulRatingsTimeSeries,
      somewhatHelpfulRatingsTimeSeries,
      lastUpdated,
    },
  };
}
