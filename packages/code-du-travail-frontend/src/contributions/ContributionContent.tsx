import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
  getLabelBySource,
} from "@socialgouv/cdtn-utils";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { A11yLink } from "../common/A11yLink";

import DisplayContentContribution, {
  ContentSP,
} from "./DisplayContentContribution";
import { Section } from "@socialgouv/cdtn-ui/lib";

type Props = {
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle;
  titleLevel: number;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  if (contribution.type === "generic-no-cdt") return <></>;

  return (
    <SectionNoPadding>
      {"raw" in contribution ? (
        <div>
          <Meta>
            {contribution.url && (
              <span>
                Source&nbsp;:{" "}
                <A11yLink
                  href={contribution.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`Fiche: ${getLabelBySource("fiches_service_public")}`}
                </A11yLink>
              </span>
            )}
            {contribution.url && contribution.date && (
              <HideOnMobile aria-hidden="true">&nbsp;-&nbsp;</HideOnMobile>
            )}
            {contribution.date && (
              <span>Mis à jour le&nbsp;: {contribution.date}</span>
            )}
          </Meta>
          <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
        </div>
      ) : (
        <DisplayContentContribution
          content={contribution.content}
          titleLevel={titleLevel}
        />
      )}
    </SectionNoPadding>
  );
};

const { breakpoints, fonts, spacings } = theme;

const Meta = styled.div`
  display: flex;
  margin-bottom: ${spacings.medium};
  font-size: ${fonts.sizes.small};
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;
const HideOnMobile = styled.span`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

const SectionNoPadding = styled(Section)`
  padding-top: 0;
`;
