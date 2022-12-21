import { formatIdcc } from "@socialgouv/modeles-social";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import { Text } from "@socialgouv/cdtn-ui";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import getConfig from "next/config";
import { withRouter } from "next/router";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Convention from "../../src/conventions/Convention";
import { Layout } from "../../src/layout/Layout";

const {
  publicRuntimeConfig: { API_URL },
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
    const { convention } = this.props;
    const { shortTitle, longTitle } = convention;
    return (
      <Layout>
        <Metas
          title={`Convention collective ${shortTitle}`}
          description={longTitle}
        />
        <Answer
          breadcrumbs={[
            {
              label: "Conventions collectives",
              slug: `/outils/${getRouteBySource(SOURCES.CCN)}`,
            },
          ]}
          date={
            convention.date_publi &&
            format(parseISO(convention.date_publi), "dd/MM/yyyy", {
              locale: frLocale,
            })
          }
          dateLabel="Entrée en vigueur le"
          emptyMessage="Cette convention collective n'a pas été trouvée"
          relatedItems={[
            {
              reco: "static",
              slug: "convention-collective",
              source: SOURCES.SHEET_SP,
              title: "Convention collective",
            },
            {
              reco: "static",
              slug: "comment-consulter-un-accord-dentreprise",
              source: SOURCES.SHEET_SP,
              title: "Comment consulter un accord d'entreprise ?",
            },
            {
              reco: "static",
              slug: "#hierarchie",
              source: SOURCES.LABOUR_LAW,
              title:
                "Droit du travail: Existe-t-il une hiérarchie entre les textes ?",
            },
          ]}
          source={
            convention.url && {
              name: "Légifrance",
              url: convention.url,
            }
          }
          subtitle={
            <Text fontSize="small">
              {convention.title} (IDCC {formatIdcc(convention.num)})
            </Text>
          }
          suptitle="CONVENTION COLLECTIVE"
          title={shortTitle}
        >
          <Convention convention={convention} />
        </Answer>
      </Layout>
    );
  }
}

export default withRouter(ConventionCollective);
