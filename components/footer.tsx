import {
  currentYear,
  currentMonthFormatted,
  currentDayFormatted,
} from "../utils/dates";
import { styled } from "@stitches/react";
import Link from "next/link";
const StyledFooter = styled("footer", {
  padding: "2rem",
  fontSize: "x-small",
  background: "#ffffff10",
});
const Footer = () => {
  return (
    <StyledFooter>
      Built using{" "}
      <Link href="https://twitter.github.io/birdwatch/download-data/">
        Twitter Community Notes public data
      </Link>
      . Last updated on {currentMonthFormatted}/{currentDayFormatted}/
      {currentYear}, and data has a 48h delay.
    </StyledFooter>
  );
};

export default Footer;
