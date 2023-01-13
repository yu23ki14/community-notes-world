import { styled } from "../utils/styles";
import Image from "next/image";
const StyledHeader = styled("nav", {
  width: "100%",
  padding: "1rem 1rem",
  borderBottom: "1px solid $slate6",
  display: "flex",
});
const StyledContent = styled("nav", {
  display: "flex",
  maxWidth: "1280px",
  width: "100%",
  margin: "0 auto",
  alignItems: "center",
  padding: "0 2.25rem",
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
      <StyledContent>
        <Icon
          src="/community-notes-icon.svg"
          alt="community notes icon"
          width={24}
          height={24}
        />
        <SiteTitle>Twitter Community Notes Dashboard</SiteTitle>
      </StyledContent>
    </StyledHeader>
  );
};

export default Header;
