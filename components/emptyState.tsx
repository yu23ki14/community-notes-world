import { styled } from "../utils/styles";
import React from "react";

const StyledContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "0",
  width: "100%",
  border: "1px solid $slate6",
  borderRadius: "13px",
  padding: "2rem",
  color: "$slate9",
  backgroundColor: "$slate1",
});

const EmptyState = () => {
  return <StyledContainer>Could not load data</StyledContainer>;
};

export default EmptyState;
