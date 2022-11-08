import { styled } from "@stitches/react";
const Row = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  padding: "1rem",
  borderTop: "1px solid dimGray",
});
const leaderBoardRow = ({ author, numberOfHelpfulNotes, notes, index }) => {
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
        {/* <ul>
          {author.notes.map((note, index) => {
            return (
              <li key="note.noteId">
                <a
                  href={`https://www.twitter.com/i/birdwatch/n/${note.noteId}`}
                >
                  note {index}
                </a>
              </li>
            );
          })}
        </ul> */}
      </div>
      <div>{author.numberOfHelpfulNotes} helpful notes</div>
    </Row>
  );
};

export default leaderBoardRow;
