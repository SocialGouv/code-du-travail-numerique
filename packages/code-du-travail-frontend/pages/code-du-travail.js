import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { BreadCrumbs } from "@cdt/ui";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import ArticleIcon from "../src/icons/ArticleIcon";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/code_du_travail/${slug}`).then(r => r.json());

const Source = ({ name, url }) => (
  <a
    href={url}
    className="external-link__after"
    target="_blank"
    rel="noopener noreferrer"
  >
    Voir le contenu original sur : {name}{" "}
  </a>
);

const getFakeBreadCrumb = path =>
  path
    .split("/")
    .map(s => s.trim())
    .filter(Boolean)
    .map((part, i, all) =>
      i === all.length - 1 ? (
        part
      ) : (
        <span className="link" key={part}>
          {part}
        </span>
      )
    );

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchFiche(query);
    if (data.status === 404) {
      return { data: { _source: { path: "" } } };
    }
    return { data };
  }

  render() {
    const { data } = this.props;

    const footer = (
      <Source name="https://www.legifrance.gouv.fr" url={data._source.url} />
    );
    return (
      <PageLayout>
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
      </PageLayout>
    );
  }
}

export default withRouter(Fiche);
