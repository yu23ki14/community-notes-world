import { styled } from "@stitches/react";
import { author, note } from "../utils/types";
const Row = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "1rem",
  borderTop: "1px solid dimGray",
});
type props = {
  author: author;
  index: number;
};
const leaderBoardRow = ({ author, index }: props) => {
  const medal =
    index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "⚫️";
  return (
    <Row key={author.participantId}>
      <div>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/i/birdwatch/n/${author.notes[1].noteId}`}
        >
          {medal} Top writer nº{index + 1}
        </a>
      </div>
      <div>{author.numberOfHelpfulNotes} helpful notes</div>
    </Row>
  );
};

export default leaderBoardRow;
