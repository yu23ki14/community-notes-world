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
  topHelpfulWords: [string, number][];
};

const TopWritersLeaderBoard = ({ topHelpfulWords }: props) => {
  console.log("from component", topHelpfulWords);
  return (
    <Container>
      <ContainerHeader text="Most frequent words" />
      <List>
        {topHelpfulWords.map((word: [string, number]) => (
          <TopWordRow key={word[0]} word={word[0]} count={word[1]} />
        ))}
      </List>
    </Container>
  );
};

export default TopWritersLeaderBoard;
