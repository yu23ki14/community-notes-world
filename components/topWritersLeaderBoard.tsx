import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "../utils/styles";
import LeaderboardRow from "../components/leaderboardRow";
import { author, note } from "../utils/types";
import Container from "./container";

const TabContent = styled(Tabs.Content, {
  display: "flex",
  width: "100%",
});

const TabList = styled(Tabs.List, {
  display: "flex",
});

const TabTrigger = styled(Tabs.Trigger, {
  backgroundColor: "$gray0",
  width: "100%",
  padding: "1em",
  borderColor: "transparent",
  borderWidth: "0 0 4px 0",
  borderBottom: "4px solid transparent",
  color: "$gray11",
  fontWeight: "bolder",
  '&[data-state="active"]': {
    borderColor: "$blue11",
    color: "$gray12",
  },
  "&:hover": {
    cursor: "pointer",
    background: "$gray3",
  },
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
  textAlign: "left",
  padding: "1rem",
  marginBottom: "0",
  fontSize: "1rem",
  marginTop: "0",
});

type props = {
  topAuthors: author[];
  topAuthorsLastMonth: author[];
  topAuthorsLastWeek: author[];
  allHelpfulNotes: note[];
};

const TopWritersLeaderBoard = ({
  topAuthors,
  topAuthorsLastMonth,
  topAuthorsLastWeek,
  allHelpfulNotes,
}: props) => {
  return (
    <Container>
      <Listheader>Top note writers</Listheader>
      <TabRoot defaultValue="tab1" orientation="vertical">
        <TabList aria-label="leaderboard">
          <TabTrigger value="tab1">All time</TabTrigger>
          <TabTrigger value="tab2">Last Month</TabTrigger>
          <TabTrigger value="tab3">Last Week</TabTrigger>
        </TabList>
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
    </Container>
  );
};

export default TopWritersLeaderBoard;
