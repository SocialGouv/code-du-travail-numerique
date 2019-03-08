import React from "react";
import PropTypes from "prop-types";

import { Section } from "@cdt/ui";

import ArticleIcon from "../icons/ArticleIcon";
import { Link } from "../../routes";

const ArticleLink = ({ title, slug }) => (
  <Link route="code-du-travail" params={{ slug }}>
    <a className="btn-large" style={{ display: "block" }}>
      <ArticleIcon
        width="18"
        style={{ verticalAlign: "middle", marginRight: 10 }}
      />
      {title}
    </a>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link route="kali" params={{ slug }}>
    <a className="btn-large" style={{ display: "block" }}>
      <ArticleIcon
        width="18"
        style={{ verticalAlign: "top", marginTop: 5, marginRight: 10 }}
      />
      <div style={{ display: "inline-block" }}>
        <b>Convention collective</b>
        <br />
        <span style={{ fontSize: "0.9em" }}>{title}</span>
      </div>
    </a>
  </Link>
);

const TextesConventionnels = ({ refs }) =>
  (refs && refs.length && (
    <Section light>
      <h3>Textes conventionnels</h3>
      {refs.map(
        r =>
          (r.type === "article" && (
            <ArticleLink key={r.num} title={r.title} slug={r.num} />
          )) ||
          (r.type === "convention-collective" && (
            <ConventionLink key={r.num} title={r.title} slug={r.num} />
          ))
      )}
    </Section>
  )) ||
  null;

TextesConventionnels.propTypes = {
  refs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  )
};

export default TextesConventionnels;
