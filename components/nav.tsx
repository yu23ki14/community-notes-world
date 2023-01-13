import * as React from "react";
import { styled } from "../utils/styles";

const StyledNav = styled("nav", {
  backgroundColor: "$slate1",
  minHeight: "100%",
  width: "15rem",
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
});

const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <li>Home</li>
      </ul>
      <ul>
        <li>Writers</li>
      </ul>
      <ul>
        <li>Raters</li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
