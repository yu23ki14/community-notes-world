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
  helpfulNotes,
  notHelpfulNotes,
  needsMoreRatingsNotes,
  allNotes,
  helpfulRatings,
  notHelpfulRatings,
  somewhatHelpfulRatings,
}: {
  topAuthors: authorArray;
  topAuthorsLastMonth: authorArray;
  topAuthorsLastWeek: authorArray;
  allNotes: notes;
  helpfulNotes: notes;
  notHelpfulNotes: notes;
  needsMoreRatingsNotes: notes;
  helpfulRatings: rating[];
  notHelpfulRatings: rating[];
  somewhatHelpfulRatings: rating[];
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
          allHelpfulNotes={helpfulNotes}
          topAuthors={topAuthors}
          topAuthorsLastMonth={topAuthorsLastMonth}
          topAuthorsLastWeek={topAuthorsLastWeek}
        />
        <NoteActivity
          allNotes={allNotes}
          allHelpfulNotes={helpfulNotes}
          allNotHelpfulNotes={notHelpfulNotes}
          allNeedsMoreRatingsNotes={needsMoreRatingsNotes}
        />
        <RatingActivity
          helpfulRatings={helpfulRatings}
          notHelpfulRatings={notHelpfulRatings}
          somewhatHelpfulRatings={somewhatHelpfulRatings}
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
  let topAuthors = await getTopAuthors();
  let topAuthorsLastMonth = await getTopAuthors("last month");
  let topAuthorsLastWeek = await getTopAuthors("last week");
  return {
    props: {
      allNotes,
      helpfulNotes,
      notHelpfulNotes,
      needsMoreRatingsNotes,
      topAuthors,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      helpfulRatings,
      notHelpfulRatings,
      somewhatHelpfulRatings,
    },
  };
}
