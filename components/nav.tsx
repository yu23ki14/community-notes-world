import NavLink from "next/link";
import * as React from "react";
import { styled } from "../utils/styles";

const StyledNav = styled("nav", {
  backgroundColor: "$slate1",
  minHeight: "100%",
  width: "15rem",
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
  border: "1px solid $slate6",
  borderRadius: "13px",
  ul: {
    listStyle: "none",
  },
  marginRight: "2rem",
});

const StyledMenuItem = styled("li", {
  padding: ".5rem 0",
});

const MenuItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <StyledMenuItem>
      <NavLink href={href}>{label}</NavLink>
    </StyledMenuItem>
  );
};

const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <MenuItem href="/" label="Home" />
        <MenuItem href="/writers" label="Writers" />
        <MenuItem href="/raters" label="Raters" />
      </ul>
    </StyledNav>
  );
};

export default Nav;
