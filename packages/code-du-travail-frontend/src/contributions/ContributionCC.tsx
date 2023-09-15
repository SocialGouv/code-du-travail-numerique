import {
  Alert,
  Badge,
  Grid,
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

import Mdx from "../../src/common/Mdx";
import Html from "../common/Html";
import rehypeToReact from "./rehypeToReact";
import ReferencesJuridiques from "./References";
import { SummaryItem } from "../questionnaire/Components/Summary/SummaryItem";
import { useRouter } from "next/router";
import { ListLink } from "../search/SearchResults/Results";

const removeCCNumberFromSlug = (slug: string): string =>
  slug.split("-").slice(1).join("-");

const ContributionCC = ({ answers, slug, relatedItems }) => {
  const conventionAnswer = answers.conventionAnswer;
  const router = useRouter();
  console.log(relatedItems);
  return (
    <>
      <Badge />
      <section>
        <Wrapper variant="light">
          <Title shift={spacings.xmedium} variant="primary">
            Votre situation
          </Title>

          <SummaryItem
            data={`Votre convention collective est ${conventionAnswer.shortName} (IDCC ${conventionAnswer.idcc})`}
            onClick={() => {
              router.push(`/contribution/${removeCCNumberFromSlug(slug)}`);
            }}
          ></SummaryItem>
        </Wrapper>
      </section>
      <section>
        <Title shift={spacings.xmedium} variant="secondary" stripe="none">
          Votre réponse
        </Title>

        {conventionAnswer.highlight && conventionAnswer.highlight.content && (
          <StyledAlert variant="primary">
            <StyledParagraph
              variant="primary"
              fontSize="small"
              fontWeight="700"
              noMargin
            >
              {conventionAnswer.highlight.title}
            </StyledParagraph>
            <Paragraph fontSize="small" noMargin>
              <Html>{conventionAnswer.highlight.content}</Html>
            </Paragraph>
          </StyledAlert>
        )}
        <MdxWrapper>
          <Mdx
            markdown={conventionAnswer.markdown}
            components={rehypeToReact}
          />
        </MdxWrapper>

        <ReferencesJuridiques references={conventionAnswer.references} />
        <p>
          Consultez les questions-réponses fréquentes pour{" "}
          <a href={`/convention-collective/${conventionAnswer.slug}`}>
            la convention collective {conventionAnswer.shortName}
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
      <StyledSection>
        <Title shift={spacings.xmedium} variant="secondary">
          Pour aller plus loins
        </Title>
        <Grid columns={2}>
          {relatedItems &&
            relatedItems.map((item) => {
              return (
                <ListLink
                  item={item}
                  key={item.slug}
                  titleTagType="h3"
                  hideAction
                />
              );
            })}
        </Grid>
      </StyledSection>
    </>
  );
};

const { spacings } = theme;

const MdxWrapper = styled.div`
  margin-bottom: ${spacings.medium};
`;

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
