import React from "react";

import DisplayContentContribution, {
  ContentSP,
  numberLevel,
} from "./DisplayContentContribution";
import { Contribution } from "./type";

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
        <DisplayContentContribution
          content={contribution.content}
          titleLevel={titleLevel}
        />
      )}
    </section>
  );
};
