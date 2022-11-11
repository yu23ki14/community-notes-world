import * as Tabs from "@radix-ui/react-tabs";

import { styled } from "../utils/styles";

export const TabContent = styled(Tabs.Content, {
  display: "flex",
  width: "100%",
});

export const TabList = styled(Tabs.List, {
  display: "flex",
});

export const TabTrigger = styled(Tabs.Trigger, {
  backgroundColor: "$gray0",
  width: "100%",
  padding: "1em",
  borderColor: "transparent",
  borderWidth: "0 0 4px 0",
  borderBottom: "4px solid transparent",
  color: "$gray11",
  fontWeight: "bolder",
  '&[data-state="active"]': {
    borderColor: "$blue11",
    color: "$gray12",
  },
  "&:hover": {
    cursor: "pointer",
    background: "$gray3",
  },
});

export const TabRoot = styled(Tabs.Root, {
  width: "100%",
});
