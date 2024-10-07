import {
  Alert,
  Badge,
  Paragraph,
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
import { ElasticSearchContributionConventionnelle } from "@socialgouv/cdtn-types";
import { removeCCNumberFromSlug } from "./utils";
import { ContributionContent } from "./ContributionContent";
import { LinkedContent } from "./LinkedContent";
import { ContributionMessageBlock } from "./ContributionMessageBlock";

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
          <Title size="small" as="p" shift={spacings.xmedium} variant="primary">
            Votre situation
          </Title>

          <SummaryItem
            data={
              <StyledTitle variant="secondary" stripe="none" size="small">
                Votre convention collective est {contribution.ccnShortTitle}{" "}
                (IDCC {contribution.idcc})
              </StyledTitle>
            }
            onClick={() => {
              router.push(
                `/contribution/${removeCCNumberFromSlug(contribution.slug)}`,
              );
            }}
          ></SummaryItem>
        </Wrapper>
      </section>
      <section>
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
              <Html as={"span"}>{contribution.highlight.content}</Html>
            </Paragraph>
          </StyledAlert>
        )}

        <ContributionContent contribution={contribution} titleLevel={3} />
        <ReferencesJuridiques references={contribution.references} />

        <p>
          Consultez les questions-réponses fréquentes pour{" "}
          <a href={`/convention-collective/${contribution.ccnSlug}`}>
            la convention collective {contribution.ccnShortTitle}
          </a>
        </p>
      </section>

      <ContributionMessageBlock message={contribution.messageBlock} />

      <LinkedContent linkedContent={contribution.linkedContent} />
    </>
  );
};

const { spacings, fonts } = theme;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${spacings.tiny};
`;
const StyledTitle = styled(Title)`
  margin: 0;

  h2 {
    font-size: ${fonts.sizes.default};
    font-weight: ${fonts.sizes.regular};
    font-family: "Open Sans", sans-serif;
  }
`;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.base};
  background-color: ${({ theme }) => theme.bgPrimary};
`;

export default ContributionCC;
