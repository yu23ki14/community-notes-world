import type { AppProps } from "next/app";
import { globalCss } from "@stitches/react";

const globalStyles = globalCss({
  body: {
    fontFamily: "system-ui",
  },
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  a: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return <Component {...pageProps} />;
}
