import React from "react";
import Head from "next/head";
import { Container, Alert, Article } from "@socialgouv/code-du-travail-ui";
import { withRouter } from "next/router";

import Disclaimer from "../common/Disclaimer";
import SeeAlso from "../common/SeeAlso";
import FeedbackForm from "../common/FeedbackForm";
import Html from "../common/Html";
import Search from "./Search";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const Answer = ({
  router,
  title,
  intro,
  html,
  children,
  footer,
  emptyMessage = "Aucun résultat"
}) => (
  <React.Fragment>
    <Head>
      <title>{title}</title>
    </Head>
    <Search />
    {!html && !children && <BigError>{emptyMessage}</BigError>}
    {(html || children) && (
      <React.Fragment>
        <Disclaimer />
        <Article title={title}>
          {intro}
          <Html>{html}</Html>
          {children}
          <div
            style={{
              background: "var(--color-light-background)",
              padding: 10,
              marginTop: 50
            }}
          >
            {footer}
          </div>
        </Article>
      </React.Fragment>
    )}
    <SeeAlso />
    <FeedbackForm query={router.query.q} />
  </React.Fragment>
);

export default withRouter(Answer);
