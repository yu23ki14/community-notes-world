import { styled } from "@stitches/react";
import Image from "next/image";
const StyledHeader = styled("nav", {
  width: "100%",
  padding: ".5rem 1rem",
  borderBottom: "1px solid dimGray",
  display: "flex",
  alignItems: "center",
});
const SiteTitle = styled("h1", {
  fontSize: "1rem",
});
const Icon = styled(Image, {
  marginRight: "16px",
});
const Header = () => {
  return (
    <StyledHeader>
      <Icon
        src="/community-notes-icon.svg"
        alt="community notes icon"
        width={24}
        height={24}
      />
      <SiteTitle>Twitter Community Notes Dashboard</SiteTitle>
    </StyledHeader>
  );
};

export default Header;
