import * as React from "react";
import { styled } from "../utils/styles";
import { numberWithCommas } from "../utils/math";
import { chartColors } from "../utils/chartStyle";
type props = {
  number: number | string;
  label: string;
  color?: "gray" | "green" | "red" | "blue" | "black";
  dot?: "gray" | "green" | "red" | "blue" | "black" | "orange";
};

const StyledContent = styled("div", {
  paddingBottom: "2rem",
  marginRight: "1.5rem",
  marginTop: "0",
  fontWeight: "bolder",
  fontSize: "xx-large",
  variants: {
    color: {
      black: { color: "$slate12" },
      gray: { color: "$slate10" },
      red: { color: chartColors.red },
      orange: { color: chartColors.orange },
      blue: { color: chartColors.blue },
      green: { color: chartColors.green },
    },
  },
  defaultVariants: {
    color: "black",
  },
});
const Dot = styled("div", {
  height: "10px",
  width: "10px",
  flexShrink: "0",
  marginRight: "8px",
  borderRadius: "1rem",
  variants: {
    color: {
      black: { backgroundColor: "$slate12" },
      gray: { backgroundColor: "$slate10" },
      orange: { backgroundColor: chartColors.orange },
      red: { backgroundColor: chartColors.red },
      blue: { backgroundColor: chartColors.blue },
      green: { backgroundColor: chartColors.green },
    },
  },
  defaultVariants: {
    color: "black",
  },
});
const StyledLabel = styled("div", {
  fontWeight: "normal",
  color: "$slate10",
  fontSize: "small",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  marginTop: "4px",
});

const StyledNumber = styled("div", {
  letterSpacing: "-0.05rem",
});

export default function Number({ number, label, color, dot }: props) {
  return (
    <StyledContent color={color}>
      <StyledNumber>{numberWithCommas(number)}</StyledNumber>
      <StyledLabel>
        {dot && <Dot color={dot} />}
        {label}
      </StyledLabel>
    </StyledContent>
  );
}
