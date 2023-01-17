import * as React from "react";
import { styled } from "../utils/styles";
import { numberWithCommas } from "../utils/math";
type props = {
  number: number | string;
  label: string;
  size?: "primary" | "secondary" | undefined;
};

const StyledContent = styled("div", {
  paddingBottom: "3rem",
  marginRight: "2rem",
  marginTop: "0",
  fontWeight: "bolder",
  fontSize: "xx-large",
  variants: {
    size: {
      primary: { color: "$slate12" },
      secondary: { color: "$slate11" },
    },
  },
  defaultVariants: {
    size: "primary",
  },
});

const StyledLabel = styled("div", {
  fontWeight: "normal",
  color: "$slate10",
  fontSize: "small",
});

const StyledNumber = styled("div", {
  letterSpacing: "-0.05em",
});

export default function Number({ number, label, size }: props) {
  return (
    <StyledContent size={size}>
      <StyledNumber>{numberWithCommas(number)}</StyledNumber>
      <StyledLabel>{label}</StyledLabel>
    </StyledContent>
  );
}
