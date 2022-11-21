import { styled, css } from "../utils/styles";
import { author, note } from "../utils/types";
import Trophy from "../public/icons/trophy.svg";
const Row = styled("div", {
  display: "flex",
  width: "100%",
  padding: "1rem",
  borderTop: "1px solid $slate6",
  justifyContent: "space-between",
  fontSize: "small",
  color: "$slate11",
});
const AuthorWrapper = styled("div", {
  display: "flex",
});
const StyledTrophy = styled(Trophy, {
  variants: {
    color: {
      gold: {
        color: "orange",
      },
      silver: {
        color: "gray",
      },
      bronze: {
        color: "brown",
      },
      neutral: {
        color: "$slate6",
      },
    },
  },
});
type props = {
  author: author;
  index: number;
};
const leaderBoardRow = ({ author, index }: props) => {
  const color =
    index === 0
      ? "gold"
      : index === 1
      ? "silver"
      : index === 2
      ? "bronze"
      : "neutral";

  return (
    <Row key={author.participantId}>
      <AuthorWrapper>
        <StyledTrophy
          width={"24px"}
          height={"24px"}
          viewBox="0 0 48 48"
          color={color}
          style={{ marginRight: "12px" }}
        />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/i/birdwatch/n/${author.noteExampleId}`}
        >
          Top writer nº
          {index + 1}
        </a>
      </AuthorWrapper>
      <div>{author.numberOfHelpfulNotes} helpful notes</div>
    </Row>
  );
};

export default leaderBoardRow;
