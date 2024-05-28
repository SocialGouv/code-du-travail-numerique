import { formatIdcc } from "@socialgouv/modeles-social";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { Text, theme } from "@socialgouv/cdtn-ui";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Convention from "../../src/conventions/Convention";
import { Layout } from "../../src/layout/Layout";
import { SITE_URL } from "../../src/config";
import { apiIdcc } from "../../src/conventions/Search/api/agreement.service";
import { addPrefixAgreementTitle } from "../../src/conventions/utils";
import styled from "styled-components";
import Head from "next/head";

interface Props {
  convention;
}

function ConventionCollective(props: Props): JSX.Element {
  const { convention } = props;
  const { shortTitle, title, url } = convention;

  return (
    <Layout>
      {!url && (
        <Head>
          <meta key="robots" name="robots" content="noindex, nofollow" />
        </Head>
      )}
      <Metas title={addPrefixAgreementTitle(shortTitle)} description={title} />
      <Answer
        breadcrumbs={[
          {
            label: "Conventions collectives",
            slug: `/outils/${getRouteBySource(SOURCES.CCN)}`,
            position: 0,
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
          url && {
            name: "Légifrance",
            url,
          }
        }
        subtitle={
          <Text fontSize="small">
            {title} (IDCC {formatIdcc(convention.num)})
          </Text>
        }
        suptitle="CONVENTION COLLECTIVE"
        title={shortTitle}
      >
        {url ? (
          <Convention convention={convention} />
        ) : (
          <Suptitle>
            Cette convention collective n&apos;est pas traitée par nos services.
          </Suptitle>
        )}
      </Answer>
    </Layout>
  );
}

const IDCC_ONLY = /^\d{2,4}$/;
export const getServerSideProps = async ({ query }) => {
  if (IDCC_ONLY.test(query.slug)) {
    const conventions = await apiIdcc(query.slug.padStart(4, "0"));
    if (!conventions.length) {
      return {
        notFound: true,
      };
    }
    return { redirect: { destination: conventions[0].slug, permanent: true } };
  }
  const res = await fetch(`${SITE_URL}/api/agreements/${query.slug}`);
  console.log("res", res.ok);
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const convention = await res.json();
  return { props: { convention } };
};

export default ConventionCollective;

const { fonts, spacings } = theme;
const Suptitle = styled.div`
  margin-bottom: ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-size: ${fonts.sizes.headings.small};
`;
