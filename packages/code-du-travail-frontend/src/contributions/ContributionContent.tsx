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

type Props = {
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle;
};

export const ContributionContent = ({ contribution }: Props) => {
  return (
    <>
      {contribution.type === "fiche-sp" ? (
        <>
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
          <ContentSP raw={contribution.raw} />
        </>
      ) : (
        <DisplayContentContribution content={contribution.content} />
      )}
    </>
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
