import { styled } from "../utils/styles";
import React from "react";

const StyledContainer = styled("div", {
  maxWidth: "900px",
  display: "flex",
  flexDirection: "column",
  margin: "0 0 3rem 0",
  width: "100%",
  border: "1px solid $gray6",
  borderRadius: "5px",
});

type props = {
  children: React.ReactNode;
};

const Container = ({ children }: props) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
