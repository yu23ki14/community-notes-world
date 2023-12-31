import * as React from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import { styled } from "../utils/styles";

const StyledBackground = styled("div", {
  backgroundColor: "$slate3",
  display: "flex",
  width: "100%",
});

const StyledWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  "@bp2": {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    padding: "1rem 2rem 2rem",
    gridGap: "1rem",
  },
  maxWidth: "1280px",
  width: "100%",
  margin: "0 auto 3rem",
  padding: ".5rem .5rem 2rem",
  gridGap: ".5rem",
});

const Layout = ({
  children,
  lastUpdated,
}: {
  children: React.ReactNode;
  lastUpdated?: string;
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Community Notes Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <StyledBackground>
        <StyledWrapper>{children}</StyledWrapper>
      </StyledBackground>
      <Footer lastUpdated={lastUpdated} />
    </div>
  );
};

export default Layout;
