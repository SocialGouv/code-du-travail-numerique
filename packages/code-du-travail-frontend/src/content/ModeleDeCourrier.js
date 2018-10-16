import React from "react";
import { default as _fetch } from "isomorphic-unfetch";

import Answer from "../search/Answer";

export const fetch = ({ slug }) =>
  _fetch(`${process.env.API_URL}/items/modeles_de_courriers/${slug}`);

const Footer = ({ filename }) => (
  <React.Fragment>
    <div>
      Modèles de courrier fournis par vos services de renseignements des
      DIRECCTE en région
    </div>
    <br />
    <a
      className="btn"
      title="Télécharger le courrier type"
      href={`${process.env.API_URL}/docs/${filename}`}
    >
      Télécharger le document
    </a>
  </React.Fragment>
);

export const View = ({ title, html, filename }) => (
  <Answer
    title={title}
    emptyMessage="Modèle de courrier introuvable"
    html={html}
    footer={<Footer filename={filename} />}
  />
);

export default View;
