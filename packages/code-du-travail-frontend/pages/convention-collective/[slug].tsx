import { formatIdcc } from "@socialgouv/modeles-social";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Text } from "@socialgouv/cdtn-ui";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Convention from "../../src/conventions/Convention";
import { Layout } from "../../src/layout/Layout";
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import { apiIdcc } from "../../src/conventions/Search/api/agreement.service";

interface Props {
  convention;
}

function ConventionCollective(props: Props): JSX.Element {
  const { convention } = props;
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

const IDCC_ONLY = /^\d{4}$/;
export const getServerSideProps = async ({ query }) => {
  if (IDCC_ONLY.test(query.slug)) {
    const conventions = await apiIdcc(query.slug);
    if (!conventions.length) {
      return { notFound: true };
    }
    return { redirect: { destination: conventions[0].slug } };
  }
  const res = await fetch(`${SITE_URL}/api/agreements/${query.slug}`);
  if (!res.ok) {
    return handleError(res);
  }
  const convention = await res.json();
  return { props: { convention } };
};

export default ConventionCollective;
