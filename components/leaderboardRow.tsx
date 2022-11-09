import { styled } from "@stitches/react";
import { author, note } from "../utils/types";
import Trophy from "../public/icons/trophy.svg";
import { copyFile } from "fs";
const Row = styled("div", {
  display: "flex",
  width: "100%",
  padding: "1rem",
  borderTop: "1px solid dimGray",
  justifyContent: "space-between",
});
const AuthorWrapper = styled("div", {
  display: "flex",
});

type props = {
  author: author;
  index: number;
};
const leaderBoardRow = ({ author, index }: props) => {
  const color =
    index === 0
      ? "orange"
      : index === 1
      ? "gray"
      : index === 2
      ? "brown"
      : "#333";
  return (
    <Row key={author.participantId}>
      <AuthorWrapper>
        <Trophy
          width={"24px"}
          height={"24px"}
          viewBox="0 0 48 48"
          color={color}
          style={{ marginRight: "12px" }}
        />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://twitter.com/i/birdwatch/n/${author.notes[0].noteId}`}
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
