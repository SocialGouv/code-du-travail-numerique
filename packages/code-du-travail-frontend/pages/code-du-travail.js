import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { ExternalLink } from "react-feather";
import { BreadCrumbs } from "@cdt/ui";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import ArticleIcon from "../src/icons/ArticleIcon";
import Answer from "../src/common/Answer";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/code_du_travail/${slug}`).then(r => r.json());

const Source = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
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
          <span className="link" key={part}>
            {part}
          </span>
        )
    );

class Fiche extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetchFiche(query)
      .then(data => ({
        data
      }))
      .catch(e => {
        console.log("e", e);
        res.statusCode = 404;
        throw e;
      });
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
          <div style={{ marginBottom: 20, fontSize: "0.8em" }}>
            <BreadCrumbs entries={getFakeBreadCrumb(data._source.path)} />
          </div>
        }
        date={format(new Date(data._source.date_debut), "D MMMM YYYY", {
          locale: frLocale
        })}
        icon={ArticleIcon}
        emptyMessage="Article introuvable"
        html={data._source.html}
        footer={footer}
        sourceType="Code du travail"
      />
    );
  }
}

export default withRouter(Fiche);
