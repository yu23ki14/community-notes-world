import { styled } from "../utils/styles";
import LeaderboardRow from "../components/leaderboardRow";
import { tweetAuthor } from "../utils/types";
import Container from "./container";
import ContainerHeader from "./containerHeader";
import { TabContent, TabList, TabTrigger, TabRoot } from "./tabs";

const List = styled("ol", {
  margin: "0",
  marginTop: "1rem",
  padding: "0",
  width: "100%",
});

const Subtitle = styled("p", {
  fontSize: "small",
  color: "$slate11",
  padding: "0rem 2rem 0.9rem",
});

type props = {
  topTweetAuthors: tweetAuthor[];
};

const TopTweetAuthorsLeaderBoard = ({ topTweetAuthors }: props) => {
  return (
    <Container>
      <ContainerHeader text="Top note receivers" />
      <Subtitle>
        Twitter accounts with most helpful notes received in 60 days
      </Subtitle>
      <List>
        {topTweetAuthors.map((author: tweetAuthor, index) => (
          <LeaderboardRow
            key={author.id}
            tweetAuthor={author}
            index={index}
            items={author.tweets}
          />
        ))}
      </List>
    </Container>
  );
};

export default TopTweetAuthorsLeaderBoard;
