import * as React from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Footer from "../components/footer";
import Header from "../components/header";
import Nav from "../components/nav";
import { styled } from "../utils/styles";
const StyledMain = styled("main", {
  backgroundColor: "$slate3",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
});

const Layout = ({
  children,
  lastUpdated,
}: {
  children: React.ReactNode;
  lastUpdated: string;
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Community Notes Dashboard</title>
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <Header />
      <Nav></Nav>
      <StyledMain>{children}</StyledMain>
      <Footer lastUpdated={lastUpdated} />
    </div>
  );
};

export default Layout;
