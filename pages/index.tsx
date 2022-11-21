import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import TopWritersLeaderBoard from "../components/topWritersLeaderBoard";
import styles from "../styles/Home.module.css";
import { author, notes, rating } from "../utils/types";
import getTopAuthors from "../utils/getTopAuthors";
import getAllNotes from "../utils/getAllNotes";
import getAllRatings from "../utils/getAllRatings";
import NoteActivity from "../components/noteActivity";
import { styled } from "../utils/styles";
import RatingActivity from "../components/ratingActivity";
import getMonthlyTimeSeries from "../utils/getMonthlyTimeSeries";

type authorArray = author[];
const StyledMain = styled("main", {
  backgroundColor: "$slate3",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
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
  helpfulRatingsTimeSeries,
  notHelpfulRatingsTimeSeries,
  somewhatHelpfulRatingsTimeSeries,
}: {
  topAuthors: authorArray;
  topAuthorsLastMonth: authorArray;
  topAuthorsLastWeek: authorArray;
  allNotesTimeSeries: any;
  helpfulNotes: notes;
  notHelpfulNotes: notes;
  needsMoreRatingsNotes: notes;
  helpfulNotesTimeSeries: any;
  notHelpfulNotesTimeSeries: any;
  needsMoreRatingsNotesTimeSeries: any;
  helpfulRatingsTimeSeries: any;
  notHelpfulRatingsTimeSeries: any;
  somewhatHelpfulRatingsTimeSeries: any;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Community Notes Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <StyledMain>
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
        <RatingActivity
          helpfulRatingsTimeSeries={helpfulRatingsTimeSeries}
          notHelpfulRatingsTimeSeries={notHelpfulRatingsTimeSeries}
          somewhatHelpfulRatingsTimeSeries={somewhatHelpfulRatingsTimeSeries}
        />
      </StyledMain>
      <Footer />
    </div>
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
  let topAuthorsLastMonth = await getTopAuthors("last month");
  let topAuthorsLastWeek = await getTopAuthors("last week");
  return {
    props: {
      allNotesTimeSeries,
      helpfulNotesTimeSeries,
      notHelpfulNotesTimeSeries,
      needsMoreRatingsNotesTimeSeries,
      topAuthors,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      helpfulRatingsTimeSeries,
      notHelpfulRatingsTimeSeries,
      somewhatHelpfulRatingsTimeSeries,
    },
  };
}
