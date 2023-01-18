import TopWordRow from "../components/topWordRow";
import { styled } from "../utils/styles";
import Container from "./container";
import ContainerHeader from "./containerHeader";

const List = styled("ol", {
  margin: "0",
  padding: "0",
  width: "100%",
});

type props = {
  topWords: [string, number][];
  title: string;
};

const TopWritersLeaderBoard = ({ topWords, title }: props) => {
  return (
    <Container>
      <ContainerHeader text={title} />
      <List>
        {topWords.map((word: [string, number]) => (
          <TopWordRow key={word[0]} word={word[0]} count={word[1]} />
        ))}
      </List>
    </Container>
  );
};

export default TopWritersLeaderBoard;
