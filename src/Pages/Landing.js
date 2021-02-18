import React from "react";
import { Header } from "../Components/Header";
import { Content } from "../Components/Content";
import { Footer } from "../Components/Footer";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="md" component="main" className={classes.main}>
        <Content />
      </Container>
      <Footer />
    </div>
  );
};
