import React from "react";
import { default as _fetch } from "isomorphic-unfetch";
import { ExternalLink } from "react-feather";
import { BreadCrumbs } from "@socialgouv/code-du-travail-ui";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

import Answer from "../search/Answer";

// Article du code du travail

export const fetch = ({ slug }) =>
  _fetch(`${process.env.API_URL}/items/code_du_travail/${slug}`);

// todo : build fake breadcrumb
const getFakeBreadCrumb = path =>
  path
    .split("/")
    .map(s => s.trim())
    .filter(Boolean)
    .map(
      (part, i, all) =>
        i === all.length - 1 ? (
          part
        ) : (
          <a key={part} href="#">
            {part}
          </a>
        )
    );

const Source = ({ name, url }) => (
  <a href={url} target="_blank">
    Voir le contenu original sur : {name}{" "}
    <ExternalLink
      style={{ verticalAlign: "middle", margin: "0 5px" }}
      size={16}
    />
  </a>
);

export const View = ({ title, html, url, path, date_debut }) => (
  <Answer
    title={title}
    intro={
      <React.Fragment>
        <div style={{ marginTop: -20, marginBottom: 20, fontSize: "0.8em" }}>
          <BreadCrumbs entries={getFakeBreadCrumb(path)} />
        </div>
        <div style={{ marginBottom: 20, fontSize: "0.8em" }}>
          Article entré en vigueur le{" "}
          {format(new Date(date_debut), "D MMMM YYYY", {
            locale: frLocale
          })}
        </div>
      </React.Fragment>
    }
    emptyMessage="Article introuvable"
    html={html}
    footer={<Source name="https://www.legifrance.gouv.fr" url={url} />}
  />
);

export default View;
