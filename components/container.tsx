import { styled } from "../utils/styles";
import React from "react";

const StyledContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "0 0 1rem 0",
  width: "100%",
  border: "1px solid $slate6",
  borderRadius: "13px",
  backgroundColor: "$slate1",
});

type props = {
  children: React.ReactNode;
};

const Container = ({ children }: props) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
