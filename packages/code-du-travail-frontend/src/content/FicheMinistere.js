import React from "react";
import { default as _fetch } from "isomorphic-unfetch";
import { ExternalLink } from "react-feather";

import Answer from "../search/Answer";

export const fetch = ({ slug }) =>
  _fetch(`${process.env.API_URL}/items/fiches_ministere_travail/${slug}`);

const Source = ({ name, url }) => (
  <a href={url} target="_blank">
    Voir le contenu original sur : {name}{" "}
    <ExternalLink
      style={{ verticalAlign: "middle", margin: "0 5px" }}
      size={16}
    />
  </a>
);

export const View = ({ title, html, url }) => (
  <Answer
    title={title}
    emptyMessage="Cette fiche n'a pas été trouvée"
    html={html}
    footer={<Source name="Ministère du travail" url={url} />}
  />
);

export default View;
