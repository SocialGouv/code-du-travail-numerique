import React from "react";

import Metas from "../common/Metas";
import { Layout } from "../layout/Layout";
import Answer from "../common/Answer";
import { formatIdcc } from "@socialgouv/modeles-social";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { format, parseISO } from "date-fns";
import { addPrefixAgreementTitle } from "./utils";
import frLocale from "date-fns/locale/fr";
import { Text, theme } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

type Props = {
  convention: {
    shortTitle: string;
    title: string;
    date_publi: string;
    url: string;
    num: number;
  };
};

export const ConventionNotSupported = ({ convention }: Props): JSX.Element => {
  const { shortTitle, title } = convention;
  return (
    <>
      <Layout>
        <Metas
          title={addPrefixAgreementTitle(shortTitle)}
          description={title}
        />
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
            convention.url && {
              name: "Légifrance",
              url: convention.url,
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
          <Suptitle>
            Cette convention collective n&apos;est pas traitée par nos services.
          </Suptitle>
        </Answer>
      </Layout>
    </>
  );
};
const { fonts, spacings } = theme;

const Suptitle = styled.div`
  margin-bottom: ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-size: ${fonts.sizes.headings.small};
`;
