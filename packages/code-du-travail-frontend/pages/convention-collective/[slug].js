import React from "react";
import styled from "styled-components";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { formatIdcc } from "@cdt/data/lib";
import { getRouteBySource, SOURCES } from "@cdt/sources";
import { theme } from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Convention from "../../src/conventions/Convention";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class ConventionCollective extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const responseContainer = await fetch(`${API_URL}/conventions/${slug}`);
    if (!responseContainer.ok) {
      return { statusCode: responseContainer.status };
    }
    const convention = await responseContainer.json();
    return { convention };
  }

  render() {
    if (!this.props.convention) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    const { pageUrl, ogImage, convention } = this.props;
    const { shortTitle, title } = convention;
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={`Convention collective ${shortTitle}`}
          description={title}
          image={ogImage}
        />
        <Answer
          breadcrumbs={[
            {
              label: "Recherche",
              slug: getRouteBySource(SOURCES.CCN)
            }
          ]}
          date={
            convention.date_publi &&
            format(parseISO(convention.date_publi), "dd/MM/yyyy", {
              locale: frLocale
            })
          }
          dateLabel="Entrée en vigueur le"
          emptyMessage="Cette convention collective n'a pas été trouvée"
          relatedItems={[
            {
              slug: "convention-collective",
              source: SOURCES.SHEET_SP,
              title: "Convention collective"
            },
            {
              slug: "comment-consulter-un-accord-dentreprise",
              source: SOURCES.SHEET_SP,
              title: "Comment consulter un accord d'entreprise ?"
            },
            {
              slug: "#hierarchie",
              source: SOURCES.LABOUR_LAW,
              title:
                "Droit du travail: Existe-t-il une hiérarchie entre les textes ?"
            }
          ]}
          source={{
            name: "Légifrance",
            url: convention.url
          }}
          subtitle={
            <SmallText>
              {convention.title} (IDCC {formatIdcc(convention.num)})
            </SmallText>
          }
          suptitle="CONVENTION COLLECTIVE"
          title={shortTitle}
        >
          <Convention {...convention} />
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(ConventionCollective);

const { fonts } = theme;

const SmallText = styled.span`
  font-size: ${fonts.sizes.small};
`;
