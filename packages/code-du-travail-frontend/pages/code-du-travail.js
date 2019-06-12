import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import ArticleIcon from "../src/icons/ArticleIcon";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";
import { Metas } from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/code_du_travail/${slug}`).then(r => r.json());

const BreadCrumbs = ({ entry }) => {
  if (entries && !entries.length) return null;
  const entries = entry
    .split("/")
    .map(s => s.trim())
    .filter(Boolean);
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <ol className="breadcrumb">
        {entries.map((entry, i) => (
          <li key={i} className="breadcrumb-item">
            {entry}
          </li>
        ))}
      </ol>
    </nav>
  );
};
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

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchFiche(query);
    if (data.status === 404) {
      return { data: { _source: { path: "" } } };
    }
    return { data };
  }

  render() {
    const { data, pageUrl } = this.props;

    const footer = (
      <Source name="https://www.legifrance.gouv.fr" url={data._source.url} />
    );
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={data._source.title}
          description={data._source.description}
        />
        <Answer
          title={data._source.title}
          intro={<BreadCrumbs entry={data._source.path} />}
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
