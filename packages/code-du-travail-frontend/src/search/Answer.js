import React from "react";
import { Article } from "@socialgouv/code-du-travail-ui";
import { withRouter } from "next/router";

import Disclaimer from "../common/Disclaimer";
import SeeAlso from "../common/SeeAlso";
import FeedbackForm from "../common/FeedbackForm";
import Html from "../common/Html";

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
    <Disclaimer />
    <Article title={title}>
      <React.Fragment>
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
      </React.Fragment>
    </Article>
    <SeeAlso />
    <FeedbackForm query={router.query.q} />
  </React.Fragment>
);

export default withRouter(Answer);
