import { styled } from "../utils/styles";
const Row = styled("div", {
  display: "flex",
  width: "100%",
  padding: "1.25rem 2rem",
  borderTop: "1px solid $slate6",
  justifyContent: "space-between",
  fontSize: "small",
  color: "$slate11",
  alignItems: "center",
});
const AuthorWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
});
type props = {
  word: string;
  count: number;
};
const leaderBoardRow = ({ word, count }: props) => {
  return (
    <Row key={word}>
      <AuthorWrapper>{word}</AuthorWrapper>
      <div>{count}</div>
    </Row>
  );
};

export default leaderBoardRow;
