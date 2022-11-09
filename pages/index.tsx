import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import TopWritersLeaderBoard from "../components/topWritersLeaderBoard";
import styles from "../styles/Home.module.css";
import { author } from "../utils/types";
import getTopAuthors from "../utils/getTopAuthors";

type authorArray = author[];

export default function Home({
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
}: {
  topAuthors: authorArray;
  topAuthorsLastMonth: authorArray;
  topAuthorsLastWeek: authorArray;
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
          topAuthors={topAuthors}
          topAuthorsLastMonth={topAuthorsLastMonth}
          topAuthorsLastWeek={topAuthorsLastWeek}
        />
      </main>
      <Footer />
    </div>
  );
}
export async function getStaticProps() {
  let topAuthors = await getTopAuthors();
  let topAuthorsLastMonth = await getTopAuthors("last month");
  let topAuthorsLastWeek = await getTopAuthors("last week");
  console.log(topAuthorsLastWeek.length);
  return {
    props: { topAuthors, topAuthorsLastMonth, topAuthorsLastWeek },
  };
}
