import React from "react";
import { default as _fetch } from "isomorphic-unfetch";

import Answer from "../search/Answer";

// a Faq content
export const fetch = ({ slug }) =>
  _fetch(`${process.env.API_URL}/items/faq/${slug}`);

export const View = ({ title, html, ...props }) => (
  <Answer
    title={title}
    emptyMessage="Cette question n'a pas été trouvée"
    html={html}
    footer="Informations fournies par vos services de renseignements des DIRECCTE en région"
  />
);

export default View;
