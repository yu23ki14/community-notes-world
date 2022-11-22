import {
  currentYear,
  currentMonthFormatted,
  currentDayFormatted,
} from "../utils/dates";
import { styled } from "@stitches/react";
import Link from "next/link";
import TwitterIcon from "../public/icons/twitter.svg";
import GithubIcon from "../public/icons/github.svg";
const StyledTwitterIcon = styled(TwitterIcon, {
  color: "$slate1",
  marginRight: "12px",
  flexShrink: "0",
});
const StyledGithubIcon = styled(GithubIcon, {
  color: "$slate1",
  marginRight: "12px",
  flexShrink: "0",
});
const StyledFooter = styled("footer", {
  padding: "2rem",
  fontSize: "small",
  background: "$slate12",
  color: "$slate10",
  display: "flex",
  flexDirection: "column",
});
const FooterItemWrapper = styled("div", {
  display: "flex",
  alignContent: "center",
  alignItems: "center",
  marginBottom: "12px",
});
const StyledLink = styled("a", {
  textDecoration: "underline",
});
type props = {
  lastUpdated: string;
};
const Footer = ({ lastUpdated }: props) => {
  return (
    <StyledFooter>
      <FooterItemWrapper>
        <StyledTwitterIcon width={"24px"} height={"24px"} viewBox="0 0 24 24" />
        <p>
          Built using Twitter’s Community Notes{" "}
          <StyledLink href="https://twitter.github.io/birdwatch/download-data/">
            public data
          </StyledLink>
          . Not officially maintained by Twitter Inc.
        </p>
      </FooterItemWrapper>
      <FooterItemWrapper>
        <StyledGithubIcon width={"24px"} height={"24px"} viewBox="0 0 24 24" />
        <p>
          This dashboard is open-source,{" "}
          <StyledLink href="https://github.com/lucasnantonio/community-notes-world">
            contribute in Github.
          </StyledLink>
        </p>
      </FooterItemWrapper>
      <FooterItemWrapper>Last updated {lastUpdated}</FooterItemWrapper>
    </StyledFooter>
  );
};

export default Footer;
