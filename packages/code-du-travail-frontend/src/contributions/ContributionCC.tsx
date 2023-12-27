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
import { ElasticSearchContributionConventionnelle } from "@socialgouv/cdtn-utils";
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
        <Title variant="secondary" stripe="none" size="small">
          Votre réponse pour la convention collective{" "}
          {contribution.ccnShortTitle}
        </Title>

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

        <ContributionContent contribution={contribution} />
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

const { spacings } = theme;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${spacings.tiny};
`;

const StyledAlert = styled(Alert)`
  margin-top: ${spacings.base};
  background-color: ${({ theme }) => theme.bgPrimary};
`;

export default ContributionCC;
