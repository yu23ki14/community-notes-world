import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "@stitches/react";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import LeaderboardRow from "../components/leaderboardRow";
import styles from "../styles/Home.module.css";
import getTopAuthors from "../utils/getTopAuthors";
import { author } from "../utils/types";

const TabContent = styled(Tabs.Content, {
  display: "flex",
  width: "100%",
});
const TabWrapper = styled(Tabs.Root, {
  width: "100%",
});
const List = styled("ol", {
  margin: "0",
  padding: "0",
  width: "100%",
});
const Listheader = styled("h2", {
  width: "100%",
  borderBottom: "1px solid dimGray",
  textAlign: "left",
  padding: "1rem",
  marginBottom: "0",
  fontSize: "1rem",
  marginTop: "0",
});
const Table = styled("div", {
  maxWidth: "900px",
  margin: "3rem",
  width: "100%",
  border: "1px solid dimGray",
  borderRadius: "5px",
});

type topAuthors = author[];

export default function Home(props: { topAuthors: topAuthors }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Community Notes Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Table>
          <Listheader>Top note writers</Listheader>
          <TabWrapper defaultValue="tab1" orientation="vertical">
            <Tabs.List aria-label="tabs example"></Tabs.List>
            <TabContent value="tab1">
              <List>
                {props.topAuthors.map((author: author, index) => (
                  <LeaderboardRow
                    key={author.participantId}
                    author={author}
                    index={index}
                  />
                ))}
              </List>
            </TabContent>
            <TabContent value="tab2">Tab two content</TabContent>
            <TabContent value="tab3">Tab three content</TabContent>
          </TabWrapper>
        </Table>
      </main>
      <Footer />
    </div>
  );
}
export async function getStaticProps() {
  let topAuthors = await getTopAuthors();
  // getUserAlias(topAuthors);
  return {
    props: { topAuthors }, // will be passed to the page component as props
  };
}
