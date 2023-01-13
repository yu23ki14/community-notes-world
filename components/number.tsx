import * as React from "react";
import { styled } from "../utils/styles";

type props = {
  number: number;
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

export default function Number({ number, label, size }: props) {
  return (
    <StyledContent size={size}>
      {number}
      <StyledLabel>{label}</StyledLabel>
    </StyledContent>
  );
}
