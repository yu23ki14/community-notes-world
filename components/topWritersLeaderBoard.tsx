import { styled } from "../utils/styles";
import LeaderboardRow from "../components/leaderboardRow";
import { author, note } from "../utils/types";
import Container from "./container";
import ContainerHeader from "./containerHeader";
import { TabContent, TabList, TabTrigger, TabRoot } from "./tabs";

const List = styled("ol", {
  margin: "0",
  padding: "0",
  width: "100%",
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
      <ContainerHeader text="Top note writers" />
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
