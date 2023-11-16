import {
  Alert,
  Badge,
  Heading,
  icons,
  IconStripe,
  Paragraph,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Html from "../common/Html";
import { ReferencesJuridiques } from "./References";
import { SummaryItem } from "../questionnaire/Components/Summary/SummaryItem";
import { useRouter } from "next/router";
import { ElasticSearchContributionConventionnelle } from "@socialgouv/cdtn-utils";
import { removeCCNumberFromSlug } from "./utils";
import { ContributionContent } from "./ContributionContent";
import { LinkedContent } from "./LinkedContent";

type Props = {
  contribution: ElasticSearchContributionConventionnelle;
};

const ContributionCC = ({ contribution }: Props) => {
  const router = useRouter();

  return (
    <>
      <Badge />
      <section>
        <Wrapper variant="light">
          <Title shift={spacings.xmedium} variant="primary">
            Votre situation
          </Title>

          <SummaryItem
            data={`Votre convention collective est ${contribution.ccnShortTitle} (IDCC ${contribution.idcc})`}
            onClick={() => {
              router.push(
                `/contribution/${removeCCNumberFromSlug(contribution.slug)}`
              );
            }}
          ></SummaryItem>
        </Wrapper>
      </section>
      <section>
        <Title shift={spacings.xmedium} variant="secondary" stripe="none">
          Votre réponse
        </Title>

        <Paragraph fontStyle="italic">
          Cette réponse tient compte des spécificités de la convention
          collective {contribution.ccnShortTitle}.
        </Paragraph>
        {contribution.highlight && contribution.highlight.content && (
          <StyledAlert variant="primary">
            <StyledParagraph
              variant="primary"
              fontSize="small"
              fontWeight="700"
              noMargin
            >
              {contribution.highlight.title}
            </StyledParagraph>
            <Paragraph fontSize="small" noMargin>
              <Html>{contribution.highlight.content}</Html>
            </Paragraph>
          </StyledAlert>
        )}

        <ContributionContent contribution={contribution} />
        <ReferencesJuridiques references={contribution.references} />

        <p>
          Consultez les questions-réponses fréquentes pour{" "}
          <a href={`/convention-collective/${contribution.slug}`}>
            la convention collective {contribution.ccnShortTitle}
          </a>
        </p>
      </section>

      <StyledSection>
        <Alert>
          <Heading as="p" variant="primary">
            <IconStripe icon={icons.Warning}>Attention</IconStripe>
          </Heading>
          <p>
            Les informations présentes sur cette page sont issues de l’analyse
            des règles prévues par votre convention collective de branche
            étendue et par le Code du travail. Elles s’appliqueront sauf si une
            convention ou un accord d’entreprise (ou de groupe, ou
            d’établissement) existant dans votre entreprise prévoit également
            des règles sur le même sujet. En effet, dans ce cas, cette
            convention ou accord s’appliquera, qu’il soit plus ou moins
            favorable que la convention de branche, sous réserve d’être au moins
            aussi favorable que le Code du travail. Dans tous les cas, reportez
            vous à votre contrat de travail car s’il contient des règles plus
            favorables, ce sont ces dernières qui s’appliqueront.
          </p>
          <p>
            Attention, d’autres règles non étendues peuvent potentiellement vous
            être applicables.
          </p>
        </Alert>
      </StyledSection>
      <LinkedContent linkedContent={contribution.linkedContent} />
    </>
  );
};

const { spacings } = theme;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${spacings.tiny};
`;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.base};
  background-color: ${({ theme }) => theme.bgPrimary};
`;
const StyledSection = styled(Section)`
  margin-top: ${spacings.base};
  padding-bottom: 0;

  > div {
    margin-bottom: 0;
  }
`;

export default ContributionCC;
