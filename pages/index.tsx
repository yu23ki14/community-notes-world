import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import TopWritersLeaderBoard from "../components/topWritersLeaderBoard";
import styles from "../styles/Home.module.css";
import { author, notes } from "../utils/types";
import getTopAuthors from "../utils/getTopAuthors";
import getAllHelpfulNotes from "../utils/getAllHelpfulNotes";
import LineChart from "../components/lineChart";

type authorArray = author[];

export default function Home({
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
  allHelpfulNotes,
}: {
  topAuthors: authorArray;
  topAuthorsLastMonth: authorArray;
  topAuthorsLastWeek: authorArray;
  allHelpfulNotes: notes;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Community Notes Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <TopWritersLeaderBoard
          allHelpfulNotes={allHelpfulNotes}
          topAuthors={topAuthors}
          topAuthorsLastMonth={topAuthorsLastMonth}
          topAuthorsLastWeek={topAuthorsLastWeek}
        />
        <LineChart allHelpfulNotes={allHelpfulNotes} />
      </main>
      <Footer />
    </div>
  );
}
export async function getStaticProps() {
  let allHelpfulNotes = await getAllHelpfulNotes();
  let topAuthors = await getTopAuthors();
  let topAuthorsLastMonth = await getTopAuthors("last month");
  let topAuthorsLastWeek = await getTopAuthors("last week");
  console.log(topAuthorsLastWeek.length);
  return {
    props: {
      topAuthors,
      topAuthorsLastMonth,
      topAuthorsLastWeek,
      allHelpfulNotes,
    },
  };
}
