import { styled, css } from "../utils/styles";
import { author, note, tweetAuthor } from "../utils/types";
import Star from "../public/icons/star.svg";
import Edit from "../public/icons/edit.svg";
import { useState } from "react";
import React from "react";
const Row = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "1.25rem 2rem",
  borderTop: "1px solid $slate6",
  justifyContent: "space-between",
  fontSize: "small",
  color: "$slate11",
  alignItems: "center",
  backgroundColor: "$slate1",
  variants: {
    rowHovered: {
      true: {
        backgroundColor: "$slate2",
        cursor: "pointer",
      },
    },
  },
});
const TopWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
});
const StyledEdit = styled(Edit, {});
const StyledStar = styled(Star, {});
const BottomWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const ItemWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  marginTop: "1rem",
});

const AuthorWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
});
type props = {
  author?: author;
  tweetAuthor?: tweetAuthor;
  index: number;
  items?: string[];
};
const LeaderBoardRow = ({ author, tweetAuthor, index, items }: props) => {
  const [showBottom, setShowBottom] = useState(false);
  const [rowHovered, setRowHovered] = useState(false);

  const rowLabel = author
    ? `Top writer nº
${index + 1}`
    : `${tweetAuthor?.name} @${tweetAuthor?.username}`;

  const rowLink = author
    ? `https://twitter.com/i/birdwatch/n/${author.noteExampleId}`
    : `https://twitter.com/${tweetAuthor?.username}`;

  const rowCount = author?.numberOfHelpfulNotes || tweetAuthor?.count;

  const TopAuthorsBottom = ({ exampleNote }: { exampleNote?: string }) => {
    return (
      <>
        <p
          style={{
            marginTop: "1rem",
            borderTop: "1px solid #eee",
            paddingTop: "1rem",
          }}
        >
          Community Notes accounts are annonymous. Here&apos;s an example note
          from this account:
        </p>
        <ItemWrapper>
          <a
            style={{ color: "hsl(206, 100%, 50.0%)" }}
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/i/birdwatch/n/${exampleNote}`}
          >
            twitter.com/i/birdwatch/n/{exampleNote}
          </a>
        </ItemWrapper>
      </>
    );
  };

  const TopTweetAuthorBottom = ({
    items,
    id,
  }: {
    items?: string[];
    id?: string;
    exampleNote?: string;
  }) => {
    return (
      <>
        <p
          style={{
            marginTop: "1rem",
            borderTop: "1px solid #eee",
            paddingTop: "1rem",
          }}
        >
          Tweets from this account that have received a note rated helpful by
          contributors:
        </p>
        {items?.map((item, index) => (
          <ItemWrapper key={index}>
            <a
              style={{ color: "hsl(206, 100%, 50.0%)" }}
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${id}/status/${item}`}
            >
              twitter.com/{id}/status/{item}
            </a>
          </ItemWrapper>
        ))}
      </>
    );
  };

  return (
    <Row
      key={author?.participantId || tweetAuthor?.id}
      onMouseEnter={() => setRowHovered(true)}
      onMouseLeave={() => setRowHovered(false)}
      onClick={() => setShowBottom(!showBottom)}
      rowHovered={rowHovered}
    >
      <TopWrapper>
        <AuthorWrapper>
          {tweetAuthor ? (
            <StyledEdit
              width={"30px"}
              height={"30px"}
              viewBox="0 0 30 30"
              style={{ marginRight: "12px", opacity: 1 - index / 10 }}
            />
          ) : (
            <StyledStar
              width={"30px"}
              height={"30px"}
              viewBox="0 0 30 30"
              style={{ marginRight: "12px", opacity: 1 - index / 10 }}
            />
          )}

          <div>{rowLabel}</div>
        </AuthorWrapper>
        <div>{rowCount}</div>
      </TopWrapper>
      <BottomWrapper>
        {items && showBottom && (
          <TopTweetAuthorBottom items={items} id={tweetAuthor?.id} />
        )}
        {author && showBottom && (
          <TopAuthorsBottom exampleNote={author.noteExampleId} />
        )}
      </BottomWrapper>
    </Row>
  );
};

export default LeaderBoardRow;
