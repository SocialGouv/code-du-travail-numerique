import React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import { theme } from "@cdt/ui";

import ArticleIcon from "../src/icons/ArticleIcon";
import Answer from "../src/common/Answer";
import { PageLayout } from "../src/layout/PageLayout";
import Metas from "../src/common/Metas";
import withError from "../src/lib/withError";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/code_du_travail/${slug}`);

const BreadCrumbs = ({ entry }) => {
  if (entries && !(entries.length > 0)) return null;
  const entries = entry
    .split("/")
    .map(s => s.trim())
    .filter(Boolean);
  return (
    <Nav aria-label="breadcrumb">
      <Ol>
        {entries.map((entry, i) => (
          <Li key={i}>{entry}</Li>
        ))}
      </Ol>
    </Nav>
  );
};
const Source = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    Voir le contenu original sur : {name}{" "}
  </a>
);

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchFiche(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const data = await response.json();
    return { data };
  }

  render() {
    const { data = { _source: {} }, pageUrl, ogImage } = this.props;

    const footer = (
      <Source name="https://www.legifrance.gouv.fr" url={data._source.url} />
    );
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={data._source.title}
          description={data._source.description}
          image={ogImage}
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

export default withRouter(withError(Fiche));

const { spacing } = theme;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Ol = styled.ol`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  & + & {
    padding-left: ${spacing.small};
    &:before {
      content: "/";
      display: inline-block;
      padding-right: ${spacing.small};
    }
  }
`;
