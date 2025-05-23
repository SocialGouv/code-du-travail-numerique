import React from "react";

import { Contribution } from "./type";
import TipTapContent, { ContentSP, numberLevel } from "../common/TipTapContent";

type Props = {
  contribution: Contribution;
  titleLevel: numberLevel;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  return (
    <section>
      {contribution.isFicheSP ? (
        <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
      ) : (
        <TipTapContent content={contribution.content} titleLevel={titleLevel} />
      )}
    </section>
  );
};
