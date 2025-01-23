import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-types";
import React from "react";

import DisplayContentContribution, {
  ContentSP,
  numberLevel,
} from "./DisplayContentContribution";

type Props = {
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle;
  titleLevel: numberLevel;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  if (contribution.type === "generic-no-cdt") return <></>;
  const isFicheSP = "raw" in contribution;

  return (
    <section>
      {isFicheSP ? (
        <>
          <div>
            <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
          </div>
        </>
      ) : (
        <DisplayContentContribution
          content={contribution.content}
          titleLevel={titleLevel}
        />
      )}
    </section>
  );
};
