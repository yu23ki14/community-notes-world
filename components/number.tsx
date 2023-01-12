import * as React from "react";
import { styled } from "../utils/styles";

type props = {
  number: number;
  label: string;
};

const StyledContent = styled("div", {
  paddingBottom: "3rem",
  marginRight: "2rem",
  marginTop: "0",
  fontWeight: "bolder",
  fontSize: "xx-large",
});

const StyledLabel = styled("div", {
  fontWeight: "normal",
  color: "$slate10",
  fontSize: "small",
});

export default function Number({ number, label }: props) {
  return (
    <StyledContent>
      {number}
      <StyledLabel>{label}</StyledLabel>
    </StyledContent>
  );
}
