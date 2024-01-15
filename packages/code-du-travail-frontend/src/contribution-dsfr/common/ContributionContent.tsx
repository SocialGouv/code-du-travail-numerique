import {
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-utils";
import React from "react";

import DisplayContentContribution from "./DisplayContentContribution";

type Props = {
  contribution:
    | ElasticSearchContributionGeneric
    | ElasticSearchContributionConventionnelle;
};

export const ContributionContent = ({ contribution }: Props) => {
  if (contribution.type === "generic-no-cdt") return <></>;

  return (
    <>
      {"raw" in contribution ? (
        <>Fiche SP not supported yet</>
      ) : (
        <DisplayContentContribution content={contribution.content} />
      )}
    </>
  );
};
