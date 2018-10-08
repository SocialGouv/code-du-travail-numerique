import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { ExternalLink } from "react-feather";
import { BreadCrumbs } from "@socialgouv/code-du-travail-ui";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

import Answer from "../src/search/Answer";

// Article du code du travail

const fetchFiche = ({ slug }) =>
  fetch(`${process.env.API_URL}/items/code_du_travail/${slug}`)
    .then(r => r.json())
    .then(data => ({
      data
    }))
    .catch(e => {
      console.log("e", e);
      res.statusCode = 404;
      throw e;
    });

const Source = ({ name, url }) => (
  <a href={url} target="_blank">
    Voir le contenu original sur : {name}{" "}
    <ExternalLink
      style={{ verticalAlign: "middle", margin: "0 5px" }}
      size={16}
    />
  </a>
);

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

class Fiche extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetchFiche(query);
  }

  render() {
    const { data } = this.props;

    const footer = (
      <Source name="https://www.legifrance.gouv.fr" url={data._source.url} />
    );
    return (
      <Answer
        title={data._source.title}
        intro={
          <React.Fragment>
            <div
              style={{ marginTop: -20, marginBottom: 20, fontSize: "0.8em" }}
            >
              <BreadCrumbs entries={getFakeBreadCrumb(data._source.path)} />
            </div>
            <div style={{ marginBottom: 20, fontSize: "0.8em" }}>
              Article entré en vigueur le{" "}
              {format(new Date(data._source.date_debut), "D MMMM YYYY", {
                locale: frLocale
              })}
            </div>
          </React.Fragment>
        }
        emptyMessage="Article introuvable"
        html={data._source.html}
        footer={footer}
      />
    );
  }
}

export default withRouter(Fiche);
