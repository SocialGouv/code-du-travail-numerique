import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";

import { Section } from "@cdt/ui";
// import { theme } from "@cdt/ui";

import { Link } from "../../../routes";
import ArticleIcon from "../../icons/ArticleIcon";
import TYPE_TEXTE from "../typeTexte";
// const { box, colors, fonts, spacing } = theme;

const CodeDuTravailLink = ({ title, slug }) => (
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

const DecretLink = ({ title, url }) => (
  <a
    className="btn-large"
    style={{ display: "block" }}
    href={url}
    rel="noopener noreferrer"
    target="_blank"
  >
    {title}
  </a>
);

const TextesConventionnels = ({ data }) => (
  <Section light>
    <h3>Références Juridiques</h3>
    {data.map(
      texteConventionnel =>
        (texteConventionnel.type === TYPE_TEXTE.codeDuTravail && (
          <CodeDuTravailLink
            key={texteConventionnel.num}
            title={texteConventionnel.title}
            slug={texteConventionnel.num}
          />
        )) ||
        (texteConventionnel.type === TYPE_TEXTE.conventionCollective && (
          <ConventionLink
            key={texteConventionnel.num}
            title={texteConventionnel.title}
            slug={texteConventionnel.num}
          />
        )) ||
        (texteConventionnel.type === TYPE_TEXTE.decret && (
          <DecretLink
            key={texteConventionnel.id}
            title={texteConventionnel.title}
            url={texteConventionnel.url}
          />
        ))
    )}
  </Section>
);

TextesConventionnels.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_TEXTE)).isRequired,
      num: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default TextesConventionnels;
