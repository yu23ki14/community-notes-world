import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "@stitches/react";
import LeaderboardRow from "../components/leaderboardRow";
import { author } from "../utils/types";

const TabContent = styled(Tabs.Content, {
  display: "flex",
  width: "100%",
});
const TabRoot = styled(Tabs.Root, {
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

type props = {
  topAuthors: author[];
  topAuthorsLastMonth: author[];
  topAuthorsLastWeek: author[];
};

const TopWritersLeaderBoard = ({
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
}: props) => {
  return (
    <Table>
      <Listheader>Top note writers</Listheader>
      <TabRoot defaultValue="tab1" orientation="vertical">
        <Tabs.List aria-label="leaderboard">
          <Tabs.Trigger value="tab1">All time</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Last Month</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Last Week</Tabs.Trigger>
        </Tabs.List>
        <TabContent value="tab1">
          <List>
            {topAuthors.map((author: author, index) => (
              <LeaderboardRow
                key={author.participantId}
                author={author}
                index={index}
              />
            ))}
          </List>
        </TabContent>
        <TabContent value="tab2">
          <List>
            {topAuthorsLastMonth.map((author: author, index) => (
              <LeaderboardRow
                key={author.participantId}
                author={author}
                index={index}
              />
            ))}
          </List>
        </TabContent>
        <TabContent value="tab3">
          <List>
            {topAuthorsLastWeek.map((author: author, index) => (
              <LeaderboardRow
                key={author.participantId}
                author={author}
                index={index}
              />
            ))}
          </List>
        </TabContent>
      </TabRoot>
    </Table>
  );
};

export default TopWritersLeaderBoard;
