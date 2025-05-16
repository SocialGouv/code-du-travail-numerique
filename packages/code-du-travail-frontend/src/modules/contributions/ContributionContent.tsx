import React from "react";

import { Contribution } from "./type";
import DisplayContent, { numberLevel } from "../common/DisplayContent";
import { ContentSP } from "./ContentSP";

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
        <DisplayContent
          content={contribution.content}
          titleLevel={titleLevel}
        />
      )}
    </section>
  );
};
