import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-utils";
import styled from "styled-components";
import React from "react";

import DisplayContentContribution from "./DisplayContentContribution";
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
      <DisplayContentContribution
        content={contribution.content}
        titleLevel={titleLevel}
      />
    </SectionNoPadding>
  );
};

const SectionNoPadding = styled(Section)`
  padding-top: 0;
`;
