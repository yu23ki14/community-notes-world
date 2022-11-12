import * as Tabs from "@radix-ui/react-tabs";

import { styled } from "../utils/styles";

export const TabContent = styled(Tabs.Content, {
  display: "flex",
  width: "100%",
});

export const TabList = styled(Tabs.List, {
  display: "flex",
  padding: "0 .75rem",
});

export const TabTrigger = styled(Tabs.Trigger, {
  backgroundColor: "$slate0",
  width: "100%",
  padding: "1em",
  borderColor: "transparent",
  borderWidth: "0 0 4px 0",
  borderBottom: "4px solid transparent",
  margin: "0 4px",
  color: "$slate11",
  fontWeight: "600",
  fontSize: "small",
  '&[data-state="active"]': {
    borderColor: "$blue9",
    color: "$slate12",
  },
  "&:hover": {
    cursor: "pointer",
    background: "$slate3",
  },
});

export const TabRoot = styled(Tabs.Root, {
  width: "100%",
});
